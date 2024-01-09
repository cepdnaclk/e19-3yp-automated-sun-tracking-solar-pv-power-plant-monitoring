#include <WiFi.h>
#include <WebServer.h>
#include <SPIFFS.h>
#include <ArduinoJson.h>
#include <ESP32Servo.h>
#include <Preferences.h>
#include <WebSocketsServer.h>
#include <ESPmDNS.h>
#include <Wire.h>
#include <Adafruit_INA219.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include "secret.h"

#define AP_MODE 0
#define CONNECTED 1

#define AWS_IOT_PUBLISH_TOPIC "mount/data"
#define AWS_IOT_SUBSCRIBE_TOPIC "mount/control"

const char *ssid = "HelioEyeMount";
const char *password = "admin123";

String wifi = "";
String pass = "";

WebServer server(80);

Adafruit_INA219 ina219;

Preferences preferences;

WebSocketsServer webSocket = WebSocketsServer(81);

WiFiClientSecure net = WiFiClientSecure();
PubSubClient client(net);

Servo myservo1;
Servo myservo2;

int state = AP_MODE;

int maxX = 110;
int minX = 10;
int posX = minX;

int maxZ = 180;
int minZ = 1;
int posZ = minZ;

unsigned long previousRotation = 0;
unsigned long previousDatasend = 0;
const long interval = 15000;

int trigger_value[4];

bool logedin = false;

void handleScan()
{
  int n = WiFi.scanNetworks();
  DynamicJsonDocument doc(1024);
  JsonArray array = doc.to<JsonArray>();
  for (int i = 0; i < n; ++i)
  {
    array.add(WiFi.SSID(i));
  }
  String response;
  serializeJson(doc, response);
  server.send(200, "application/json", response);
}

void handleSetWifi()
{
  String wifi = server.arg("wifi");
  String pass = server.arg("pass");

  String ip = setWifi(wifi.c_str(), pass.c_str());

  server.send(200, "application/json", "{\"status\":\"connected\", \"newip\":\"" + ip + "\"}");
  delay(10000);
  preferences.putString("wifi", wifi);
  preferences.putString("pass", pass);
  WiFi.softAPdisconnect(true);
}

String setWifi(String ssid, String password)
{
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
  const char *message = doc["message"];
  Serial.println(message);
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
      digitalWrite(13, HIGH);
      delay(10);
      int xplus_raw = analogRead(32);
      int xminus_raw = analogRead(33);
      int zplus_raw = analogRead(34);
      int zminus_raw = analogRead(35);
      delay(10);
      digitalWrite(13, LOW);

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
    digitalWrite(13, HIGH);
    delay(10);
    int xplus = analogRead(32);
    int xminus = analogRead(33);
    int zplus = analogRead(34);
    int zminus = analogRead(35);
    delay(10);
    digitalWrite(13, LOW);

    int changed = 0;
    if (xplus > trigger_value[0] && posX < maxX)
    {
      setServoPosition(1, posX + 1);
      Serial.println("xplus : " + String(xplus) + " : " + String(trigger_value[0]) + " : " + String(posX));
      changed = 1;
    }
    if (xminus > trigger_value[1] && posX > minX)
    {
      setServoPosition(1, posX - 1);
      Serial.println("xminus : " + String(xminus) + " : " + String(trigger_value[1]) + " : " + String(posX));
      changed = 1;
    }
    if (zplus > trigger_value[2] && posZ < maxZ)
    {
      setServoPosition(2, posZ + 1);
      Serial.println("zplus : " + String(zplus) + " : " + String(trigger_value[2]) + " : " + String(posZ));
      changed = 1;
    }
    if (zminus > trigger_value[3] && posZ > minZ)
    {
      setServoPosition(2, posZ - 1);
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
  // reboot
  ESP.restart();
}

void handleLogin()
{
  String username = server.arg("username");
  String password = server.arg("password");
  if (username == "admin" && password == "admin123")
  {
    server.sendHeader("Location", "/");
    server.send(302, "text/plain", "");
    return;
  }
  server.sendHeader("Location", "/login");
  server.send(302, "text/plain", "");
}

void handleFile(string path)
{
  File file = SPIFFS.open(path.c_str(), "r");
  if (!file)
  {
    Serial.println("Failed to open file for reading");
    return;
  }
  server.streamFile(file, "text/html");
  file.close();
}

String read_voltage_current()
{
  float shuntvoltage = 0;
  float busvoltage = 0;
  float current_mA = 0;
  float loadvoltage = 0;
  float power = 0;

  shuntvoltage = ina219.getShuntVoltage_mV();
  busvoltage = ina219.getBusVoltage_V();
  current_mA = ina219.getCurrent_mA();
  loadvoltage = busvoltage + (shuntvoltage / 1000);
  power = loadvoltage * current_mA;

  Serial.print("Bus Voltage:   ");
  Serial.print(busvoltage);
  Serial.println(" V");
  Serial.print("Shunt Voltage: ");
  Serial.print(shuntvoltage);
  Serial.println(" mV");
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

void startAP()
{
  WiFi.softAP(ssid, password);
  Serial.println("AP mode");
  Serial.println(WiFi.softAPIP());
  state = AP_MODE;
}

void setup()
{
  Serial.begin(9600);

  delay(1000);

  ina219.begin();

  loadPreferences();

  String ip = setWifi(wifi, pass);
  if (ip == "")
  {
    startAP();
  }

  if (!SPIFFS.begin(true))
  {
    Serial.println("An Error has occurred while mounting SPIFFS");
    return;
  }

  server.on("/scan", handleScan);
  server.on("/set-wifi", handleSetWifi);
  server.on("/calibrate", handleCalibrate);
  server.on("/reset", handleReset);
  server.on("/login", handleLogin);
  server.on("/favicon", handleFile("/favicon.ico"));
  server.on("/style", handleFile("/style.css"));
  server.on("/logo", handleFile("/logo.png"));
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
    handleFile("/index.html"); });

  server.on("/login", []()
            {
              if(logedin){
                if (state == AP_MODE)
                {
                  server.sendHeader("Location", "/wifisettings");
                }
                else if (state == CONNECTED)
                {
                  server.sendHeader("Location", "/");
                }
                server.send(302, "text/plain", "");
                return;
              }
              handleFile("/login.html"); });
  server.on("/wifisettings", []()
            {
              if(!logedin){
                server.sendHeader("Location", "/login");
                server.send(302, "text/plain", "");
                return;
              }
              handleFile("/wifisettings.html"); });
  server.begin();

  pinMode(13, OUTPUT);
  myservo1.attach(26);
  myservo2.attach(27);

  if (posX > maxX || posX < minX)
    posX = minX;
  if (posZ > maxZ || posZ < minZ)
    posZ = minZ;

  setServoPosition(1, posX);
  setServoPosition(2, posZ);
  setServoPosition(1, minX);
  setServoPosition(2, minZ);

  webSocket.begin();
  webSocket.onEvent([](uint8_t num, WStype_t type, uint8_t *payload, size_t length)
                    {
  if (type == WStype_TEXT) {
    // Handle text message from client
  } });

  if (trigger_value[0] == 0)
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

  delay(1000);
}

void loop()
{
  server.handleClient();

  switch (state)
  {
  case AP_MODE:
    // Code to run in AP mode
    break;
  case CONNECTED:
    // Code to run when connected
    webSocket.loop();
    break;
  }

  unsigned long uptime = millis();

  if (uptime - previousRotation > interval)
  {
    readAndControlServos();
    previousRotation = uptime;
  }

  if (uptime - previousDatasend > 10000)
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
}
