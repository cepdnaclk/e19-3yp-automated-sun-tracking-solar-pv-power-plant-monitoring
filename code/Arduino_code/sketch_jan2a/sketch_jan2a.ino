#include <WiFi.h>
#include <WiFiClient.h>
#include <WiFiAP.h>
#include <WebServer.h>
#include <SPIFFS.h>
#include <ArduinoJson.h>
#include <ESP32Servo.h>
#include <Preferences.h>
#include <WebSocketsServer.h>
#include <ESPmDNS.h>
#include <Wire.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include "secret.h"

// Task handles
TaskHandle_t Task1;
TaskHandle_t Task2;

#define AP_MODE 0
#define CONNECTED 1
#define CALIBRATE 2

#define AWS_IOT_PUBLISH_TOPIC "mount/data"
#define AWS_IOT_SUBSCRIBE_TOPIC "mount/control"

const char *ssid = "HelioEyeMount";
const char *password = "12345678";

String wifi = "";
String pass = "";

WebServer server(80);

Preferences preferences;

WebSocketsServer webSocket = WebSocketsServer(81);

WiFiClientSecure net = WiFiClientSecure();
PubSubClient client(net);

Servo myservo1;
Servo myservo2;

int state = AP_MODE;

int maxX = 80;
int minX = 0;
int posX = minX;

int maxZ = 180;
int minZ = 1;
int posZ = minZ;

unsigned long previousRotation = 0;
unsigned long previousDatasend = 0;
const long interval = 15000;

int trigger_value[4];

bool logedin = false;

void startAP()
{
  WiFi.disconnect();
  WiFi.softAPdisconnect(true);

  WiFi.mode(WIFI_MODE_AP);
  while (!WiFi.softAP(ssid, password))
  {
    Serial.println("Soft AP creation failed.");
    delay(2000);
  }
  Serial.print("AP IP address: ");
  Serial.println(WiFi.softAPIP());
  state = AP_MODE;
}

void handleScan()
{
  int n = WiFi.scanNetworks();
  DynamicJsonDocument doc(1024);
  JsonArray array = doc.to<JsonArray>();
  Serial.println("Scan done");
  if (n == 0)
  {
    Serial.println("no networks found");
  }
  else
  {
    Serial.print(n);
    Serial.println(" networks found");
    Serial.println("Nr | SSID                             | RSSI | CH | Encryption");
    for (int i = 0; i < n; ++i)
    {
      // Print SSID and RSSI for each network found
      Serial.printf("%2d", i + 1);
      Serial.print(" | ");
      Serial.printf("%-32.32s", WiFi.SSID(i).c_str());
      Serial.print(" | ");
      Serial.printf("%4d", WiFi.RSSI(i));
      Serial.print(" | ");
      Serial.printf("%2d", WiFi.channel(i));
      Serial.print(" | ");
      switch (WiFi.encryptionType(i))
      {
      case WIFI_AUTH_OPEN:
        Serial.print("open");
        break;
      case WIFI_AUTH_WEP:
        Serial.print("WEP");
        break;
      case WIFI_AUTH_WPA_PSK:
        Serial.print("WPA");
        break;
      case WIFI_AUTH_WPA2_PSK:
        Serial.print("WPA2");
        break;
      case WIFI_AUTH_WPA_WPA2_PSK:
        Serial.print("WPA+WPA2");
        break;
      case WIFI_AUTH_WPA2_ENTERPRISE:
        Serial.print("WPA2-EAP");
        break;
      case WIFI_AUTH_WPA3_PSK:
        Serial.print("WPA3");
        break;
      case WIFI_AUTH_WPA2_WPA3_PSK:
        Serial.print("WPA2+WPA3");
        break;
      case WIFI_AUTH_WAPI_PSK:
        Serial.print("WAPI");
        break;
      default:
        Serial.print("unknown");
      }
      Serial.println();
      delay(10);
      array.add(WiFi.SSID(i));
    }
  }
  Serial.println("");

  String response;
  serializeJson(doc, response);
  server.send(200, "application/json", response);

  // Delete the scan result to free memory for code below.
  WiFi.scanDelete();

  // Wait a bit before scanning again.
  delay(5000);
}

void handleSetWifi()
{
  String wifi = server.arg("wifi");
  String pass = server.arg("pass");

f  String ip = setWifi(wifi.c_str(), pass.c_str());

  server.send(200, "application/json", "{\"status\":\"connected\", \"newip\":\"" + ip + "\"}");
  delay(10000);
  preferences.putString("wifi", wifi);
  preferences.putString("pass", pass);
  WiFi.softAPdisconnect(true);
}

String setWifi(String ssid, String password)
{
  WiFi.disconnect();
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  if (WiFi.waitForConnectResult() != WL_CONNECTED)
  {
    Serial.println("Failed to connect to WiFi network");
    return "";
  }
  else
  {
    state = CONNECTED;
    Serial.println("Connected to WiFi network");
    String ip = WiFi.localIP().toString();
    Serial.println(ip);
    connectAWS();

    if (!MDNS.begin("esp32"))
    {
      Serial.println("Error setting up MDNS responder!");
      while (1)
      {
        delay(1000);
      }
    }
    Serial.println("mDNS responder started");
    MDNS.addService("http", "tcp", 80);

    return ip;
  }
}

void connectAWS()
{
  // Configure WiFiClientSecure to use the AWS IoT device credentials
  net.setCACert(AWS_CERT_CA);
  net.setCertificate(AWS_CERT_CRT);
  net.setPrivateKey(AWS_CERT_PRIVATE);

  // Connect to the MQTT broker on the AWS endpoint we defined earlier
  client.setServer(AWS_IOT_ENDPOINT, 8883);

  // Create a message handler
  client.setCallback(messageHandler);

  Serial.println("Connecting to AWS IOT");

  while (!client.connect(THINGNAME))
  {
    Serial.print(".");
    delay(100);
    if (!client.connected())
    {
      Serial.print("Connection failed with error code: ");
      Serial.println(client.state());
    }
  }

  if (!client.connected())
  {
    Serial.println("AWS IoT Timeout!");
    return;
  }

  // Subscribe to a topic
  client.subscribe(AWS_IOT_SUBSCRIBE_TOPIC);

  Serial.println("AWS IoT Connected!");
}

void messageHandler(char *topic, byte *payload, unsigned int length)
{
  Serial.print("incoming: ");
  Serial.println(topic);

  StaticJsonDocument<200> doc;
  deserializeJson(doc, payload);
  if (doc["message"])
  {
    const char *message = doc["message"];
    Serial.println(message);
  }
  if (doc["control"])
  {
    const char *control = doc["control"];
    Serial.println(control);
    if (strcmp(control, "left") == 0)
    {
      setServoPosition(1, posX - 10);
    }
    else if (strcmp(control, "right") == 0)
    {
      setServoPosition(1, posX + 10);
    }
    else if (strcmp(control, "up") == 0)
    {
      setServoPosition(2, posZ + 10);
    }
    else if (strcmp(control, "down") == 0)
    {
      setServoPosition(2, posZ - 10);
    }
    else if (strcmp(control, "calibrate") == 0)
    {
      calibrate_sensors();
    }
    else if (strcmp(control, "reset") == 0)
    {
      preferences.clear();
      setServoPosition(1, minX);
      setServoPosition(2, minZ);
      // reboot
      ESP.restart();
    }
    else if (strcmp(control, "set") == 0)
    {
      int incomingPosX = doc["posX"];
      int incomingPosZ = doc["posZ"];
      setServoPosition(1, incomingPosX * (maxX - minX) / 100 + minX);
      setServoPosition(2, incomingPosZ * (maxZ - minZ) / 100 + minZ);
    }
  }
}

void publishMessage(int posX, int posZ, float voltage, float current, float power)
{
  StaticJsonDocument<200> doc;
  doc["posX"] = posX;
  doc["posZ"] = posZ;
  doc["voltage"] = voltage;
  doc["current"] = current;
  doc["power"] = power;
  char jsonBuffer[512];
  serializeJson(doc, jsonBuffer); // print to client

  client.publish(AWS_IOT_PUBLISH_TOPIC, jsonBuffer);
}

void handleCalibrate()
{
  calibrate_sensors();
  server.send(200, "application/json", "{\"status\":\"calibrated\"}");
}

int max_array(int arr[])
{
  int result = 0;
  for (int i = 0; i < 100; i++)
  {
    result = max(result, arr[i]);
  }
  return result;
}

int min_array(int arr[])
{
  int result = 4096;
  for (int i = 0; i < 100; i++)
  {
    result = min(result, arr[i]);
  }
  return result;
}

void calibrate_sensors()
{
  digitalWrite(19, HIGH);

  int beforeState = state;
  state = CALIBRATE;

  const int numPositions = 3;   // Set this to the desired number of positions
  const float thresholdX = 0.9; // Set this to the desired threshold
  const float thresholdZ = 0.9; // Set this to the desired threshold

  int xplus_max = 0, xminus_max = 0, zplus_max = 0, zminus_max = 0;

  for (int posZ = 0; posZ < numPositions; posZ++)
  {
    // Calculate the angle for the Z motor based on the current position and the motor limits
    float angleZ = map(posZ, 0, numPositions - 1, minZ, maxZ);

    for (int posX = 0; posX < numPositions; posX++)
    {
      // Calculate the angle for the X motor based on the current position and the motor limits
      float angleX = map(posX, 0, numPositions - 1, minX, maxX);

      // Rotate the servos to the current position
      setServoPosition(1, angleX);
      setServoPosition(2, angleZ);
      delay(1000); // Wait for the servos to reach the position

      // Read the raw LDR values
      digitalWrite(23, HIGH);
      delay(10);
      int xplus_raw = analogRead(33);
      int xminus_raw = analogRead(35);
      int zplus_raw = analogRead(34);
      int zminus_raw = analogRead(32);
      delay(10);
      digitalWrite(23, LOW);

      // Update the maximum values
      xplus_max = max(xplus_max, xplus_raw);
      xminus_max = max(xminus_max, xminus_raw);
      zplus_max = max(zplus_max, zplus_raw);
      zminus_max = max(zminus_max, zminus_raw);
    }
    Serial.println("Position " + String(posZ + 1) + " of " + String(numPositions) + " done.");
    Serial.println("xplus_max: " + String(xplus_max));
    Serial.println("xminus_max: " + String(xminus_max));
    Serial.println("zplus_max: " + String(zplus_max));
    Serial.println("zminus_max: " + String(zminus_max));
  }

  // Set the trigger values to be the average of the maximum values
  trigger_value[0] = xplus_max * thresholdX;
  trigger_value[1] = xminus_max * thresholdX;
  trigger_value[2] = zplus_max * thresholdZ;
  trigger_value[3] = zminus_max * thresholdZ;

  preferences.begin("preferences", false);
  preferences.putInt("trigger_value0", trigger_value[0]);
  preferences.putInt("trigger_value1", trigger_value[1]);
  preferences.putInt("trigger_value2", trigger_value[2]);
  preferences.putInt("trigger_value3", trigger_value[3]);

  Serial.println("Trigger values:");
  Serial.println(trigger_value[0]);
  Serial.println(trigger_value[1]);
  Serial.println(trigger_value[2]);
  Serial.println(trigger_value[3]);

  state = beforeState;

  digitalWrite(19, LOW);
}

void setServoPosition(int servo, int position)
{
  if (servo == 1)
  {
    if (position > posX)
    {
      while (posX < position)
      {
        posX++;
        myservo1.write(posX);
        delay(30);
      }
    }
    else
    {
      while (posX > position)
      {
        posX--;
        myservo1.write(posX);
        delay(30);
      }
    }
  }
  else if (servo == 2)
  {
    if (position > posZ)
    {
      while (posZ < position)
      {
        posZ++;
        myservo2.write(posZ);
        delay(30);
      }
    }
    else
    {
      while (posZ > position)
      {
        posZ--;
        myservo2.write(posZ);
        delay(30);
      }
    }
  }
  preferences.putInt("posX", posX);
  preferences.putInt("posZ", posZ);
}

void readAndControlServos()
{
  while (true)
  {
    digitalWrite(23, HIGH);
    delay(10);
    int xplus = analogRead(33);
    int xminus = analogRead(35);
    int zplus = analogRead(34);
    int zminus = analogRead(32);
    delay(10);
    digitalWrite(23, LOW);

    int changed = 0;
    if (xplus > trigger_value[0] && posX < maxX)
    {
      setServoPosition(1, posX + 10);
      Serial.println("xplus : " + String(xplus) + " : " + String(trigger_value[0]) + " : " + String(posX));
      changed = 1;
    }
    if (xminus > trigger_value[1] && posX > minX)
    {
      setServoPosition(1, posX - 10);
      Serial.println("xminus : " + String(xminus) + " : " + String(trigger_value[1]) + " : " + String(posX));
      changed = 1;
    }
    if (zplus > trigger_value[2] && posZ < maxZ)
    {
      setServoPosition(2, posZ + 10);
      Serial.println("zplus : " + String(zplus) + " : " + String(trigger_value[2]) + " : " + String(posZ));
      changed = 1;
    }
    if (zminus > trigger_value[3] && posZ > minZ)
    {
      setServoPosition(2, posZ - 10);
      Serial.println("zminus : " + String(zminus) + " : " + String(trigger_value[3]) + " : " + String(posZ));
      changed = 1;
    }
    if (!changed)
    {
      break;
    }
  }
}

void loadPreferences()
{
  preferences.begin("preferences", false);
  wifi = preferences.getString("wifi", "");
  pass = preferences.getString("pass", "");
  posX = preferences.getInt("posX", minX);
  posZ = preferences.getInt("posZ", minZ);

  trigger_value[0] = preferences.getInt("trigger_value0", 0);
  trigger_value[1] = preferences.getInt("trigger_value1", 0);
  trigger_value[2] = preferences.getInt("trigger_value2", 0);
  trigger_value[3] = preferences.getInt("trigger_value3", 0);

  Serial.println("Loaded preferences:");
  Serial.println("wifi: " + wifi);
  Serial.println("pass: " + pass);
  Serial.println("posX: " + String(posX));
  Serial.println("posZ: " + String(posZ));
  Serial.println("trigger_value0: " + String(trigger_value[0]));
  Serial.println("trigger_value1: " + String(trigger_value[1]));
  Serial.println("trigger_value2: " + String(trigger_value[2]));
  Serial.println("trigger_value3: " + String(trigger_value[3]));
}

void handleReset()
{
  preferences.clear();
  server.send(200, "application/json", "{\"status\":\"reset\"}");
  setServoPosition(1, minX);
  setServoPosition(2, minZ);
  // reboot
  ESP.restart();
}

void handleFileServe(String path, String type = "text/html")
{
  File file = SPIFFS.open(path.c_str(), "r");
  if (!file)
  {
    Serial.println("Failed to open file for reading");
    return;
  }
  server.streamFile(file, type);
  file.close();
}

String read_voltage_current()
{
  float current_mA = 0;
  float loadvoltage = 0;
  float power = 0;

  float voltageSensorReading = analogRead(36);
  loadvoltage = voltageSensorReading * (3.3 / 4096.0) * 3.3 / 0.56;
  current_mA = loadvoltage / 1000;
  power = loadvoltage * current_mA;

  Serial.print("Load Voltage:  ");
  Serial.print(loadvoltage);
  Serial.println(" V");
  Serial.print("Current:       ");
  Serial.print(current_mA);
  Serial.println(" mA");
  Serial.print("Power:         ");
  Serial.print(power);
  Serial.println(" mW");
  Serial.println("");

  return String(loadvoltage) + "," + String(current_mA) + "," + String(power);
}

void setup()
{
  Serial.begin(9600);

  delay(1000);

  pinMode(21, OUTPUT);
  digitalWrite(21, HIGH);

  loadPreferences();

  if (wifi == "" || pass == "")
  {
    startAP();
  }
  else
  {
    String ip = setWifi(wifi, pass);
    if (ip == "")
    {
      startAP();
    }
  }

  if (!SPIFFS.begin(true))
  {
    Serial.println("An Error has occurred while mounting SPIFFS");
    return;
  }
  Serial.println("SPIFFS mounted successfully");

  server.on("/scan", handleScan);
  server.on("/set-wifi", handleSetWifi);
  server.on("/calibrate", handleCalibrate);
  server.on("/reset", handleReset);
  server.on("/loginin", []()
            {
    String user = server.arg("username");
    String pass = server.arg("password");
    if (user == "admin" && pass == "admin")
    {
      logedin = true;
      server.send(200, "application/json", "{\"status\": \"success\"}");
    } });
  server.on("/style.css", []()
            { handleFileServe("/style.css", "text/css"); });
  server.on("/logo", []()
            { handleFileServe("/logo.png", "image/png"); });
  server.on("/", []()
            {
    if (!logedin)
    {
      server.sendHeader("Location", "/login");
      server.send(302, "text/plain", "");
      return;
    }
    if(state == AP_MODE){
      server.sendHeader("Location", "/wifisettings");
      server.send(302, "text/plain", "");
      return;
    }
    handleFileServe("/index.html"); });

  server.on("/login", []()
            { handleFileServe("/login.html"); });
  server.on("/wifisettings", []()
            {
              if(!logedin){
                server.sendHeader("Location", "/login");
                server.send(302, "text/plain", "");
                return;
              }
              handleFileServe("/wifisettings.html"); });
  server.begin();

  pinMode(23, OUTPUT);
  pinMode(18, OUTPUT);
  pinMode(19, OUTPUT);
  myservo1.attach(26);
  myservo2.attach(27);

  Serial.println("servos attached");

  if (posX > maxX || posX < minX)
    posX = minX;
  if (posZ > maxZ || posZ < minZ)
    posZ = minZ;

  delay(1000);

  setServoPosition(1, minX);
  setServoPosition(2, minZ);
  setServoPosition(1, maxX);
  setServoPosition(2, maxZ);
  setServoPosition(1, minX);
  setServoPosition(2, minZ);

  webSocket.begin();
  webSocket.onEvent([](uint8_t num, WStype_t type, uint8_t *payload, size_t length)
                    {
  if (type == WStype_TEXT) {
    // Handle text message from client
  } });

  Serial.println("Websocket started");

  if (trigger_value[0] == 0 || trigger_value[1] == 0 || trigger_value[2] == 0 || trigger_value[3] == 0)
    calibrate_sensors();

  switch (state)
  {
  case AP_MODE:
    // Code to run in AP mode
    break;
  case CONNECTED:
    // Code to run when connected
    break;
  }

  // Create tasks
  xTaskCreatePinnedToCore(
      rotationTask,   /* Task function. */
      "RotationTask", /* name of task. */
      10000,          /* Stack size of task */
      NULL,           /* parameter of the task */
      1,              /* priority of the task */
      &Task1,         /* Task handle to keep track of created task */
      0);             /* pin task to core 0 */

  xTaskCreatePinnedToCore(
      dataSendingTask,
      "DataSendingTask",
      10000,
      NULL,
      1,
      &Task2,
      1); /* pin task to core 1 */

  delay(1000);
  Serial.println("Setup done");
  digitalWrite(21, LOW);
}

void loop()
{
}

void rotationTask(void *parameter)
{
  for (;;)
  {
    if (state == AP_MODE)
    {
      digitalWrite(18, HIGH);
      digitalWrite(19, LOW);
      delay(1000);
      continue;
    }
    else if (state == CALIBRATE)
    {
      digitalWrite(19, HIGH);
      digitalWrite(18, LOW);
    }
    else
    {
      digitalWrite(18, LOW);
      digitalWrite(19, LOW);
    }

    unsigned long uptime = millis();
    if (uptime - previousRotation > 10000 && state == CONNECTED)
    {
      readAndControlServos();
      previousRotation = uptime;
    }
    delay(1); // Allow other tasks to run
  }
}

void dataSendingTask(void *parameter)
{
  for (;;)
  {
    server.handleClient();
    webSocket.loop();
    if (state == CONNECTED)
    {
      if (!client.connected())
      {
        connectAWS();
        Serial.println("AWS IoT Connected!");
      }
      client.loop();
    }
    unsigned long uptime = millis();
    if (uptime - previousDatasend > 5000 && state == CONNECTED)
    {
      String current_voltage_power = read_voltage_current();
      String data = String(posX) + "," +
                    String(posZ) + "," +
                    current_voltage_power;
      float voltage = current_voltage_power.substring(0, current_voltage_power.indexOf(",")).toFloat();
      float current = current_voltage_power.substring(current_voltage_power.indexOf(",") + 1, current_voltage_power.lastIndexOf(",")).toFloat();
      float power = current_voltage_power.substring(current_voltage_power.lastIndexOf(",") + 1).toFloat();
      publishMessage(posX, posZ, voltage, current, power);
      webSocket.broadcastTXT(data);
      previousDatasend = uptime;
    }
    delay(1); // Allow other tasks to run
  }
}
