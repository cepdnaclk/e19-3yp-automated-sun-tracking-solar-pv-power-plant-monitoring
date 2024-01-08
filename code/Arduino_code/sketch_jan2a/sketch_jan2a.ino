#include <WiFi.h>
#include <WebServer.h>
#include <SPIFFS.h>
#include <ArduinoJson.h>
#include <ESP32Servo.h>
#include <Preferences.h>
#include <WebSocketsServer.h>
#include <ESPmDNS.h>

#define AP_MODE 0
#define CONNECTED 1

const char *ssid = "HelioEyeMount";
const char *password = "admin123";

String wifi = "";
String pass = "";

WebServer server(80);

Preferences preferences;

WebSocketsServer webSocket = WebSocketsServer(81);

int state = AP_MODE;

void handleRoot()
{
  File file;
  if (WiFi.status() == WL_CONNECTED)
  {
    file = SPIFFS.open("/index.html", "r");
  }
  else
  {
    file = SPIFFS.open("/wifisettings.html", "r");
  }
  server.streamFile(file, "text/html");
  file.close();
}

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
    return ip;
  }
}

void handleCalibrate()
{
  calibrate_sensors();
  server.send(200, "application/json", "{\"status\":\"calibrated\"}");
}

Servo myservo1;
int maxX = 110;
int minX = 10;
int posX = minX;

Servo myservo2;
int maxZ = 180;
int minZ = 1;
int posZ = minZ;

unsigned long previousRotation = 0;
unsigned long previousDatasend = 0;
const long interval = 15000;

int trigger_value[4];

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

float read_voltage()
{
  float voltage = 0;
  for (int i = 0; i < 10; i++)
  {
    voltage += analogRead(36);
    delay(10);
  }
  voltage = map(voltage / 10, 0, 4096, 0, 1900);
  return voltage / 100;
}

void setup()
{
  Serial.begin(9600);

  delay(1000);

  loadPreferences();

  String ip = setWifi(wifi, pass);
  if (ip == "")
  {
    WiFi.softAP(ssid, password);
    Serial.println("AP mode");
    Serial.println(WiFi.softAPIP());
    state = AP_MODE;
  }

  if (!SPIFFS.begin(true))
  {
    Serial.println("An Error has occurred while mounting SPIFFS");
    return;
  }

  server.on("/", handleRoot);
  server.on("/scan", handleScan);
  server.on("/set-wifi", handleSetWifi);
  server.on("/calibrate", handleCalibrate);
  server.on("/reset", handleReset);
  server.on("/wifisettings", []()
            {
              File file = SPIFFS.open("/wifisettings.html", "r");
              if (!file) {
                Serial.println("Failed to open file for reading");
                return;
              }
              server.streamFile(file, "text/html");
              file.close(); });
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

  if (!MDNS.begin("esp32"))
  {
    Serial.println("Error setting up MDNS responder!");
  }
  else
  {
    Serial.println("mDNS responder started");
    // Add service to MDNS-SD
    MDNS.addService("http", "tcp", 80);
  }

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
    break;
  }

  unsigned long uptime = millis();

  if (uptime - previousRotation > interval)
  {
    readAndControlServos();
  }

  Serial.println("Voltage: " + String(read_voltage()));

  if (uptime - previousDatasend > 1000)
  {
    webSocket.loop();
    String data = String(posX) + "," +
                  String(posZ) + ",";
    webSocket.broadcastTXT(data);
  }
}
