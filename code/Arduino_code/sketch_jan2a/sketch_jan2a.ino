#include <WiFi.h>
#include <WebServer.h>
#include <SPIFFS.h>
#include <ArduinoJson.h>
#include <ESP32Servo.h>
#include <Preferences.h>

#define AP_MODE 0
#define CONNECTED 1

const char *ssid = "HelioEyeMount";
const char *password = "admin123";

WebServer server(80);

Preferences preferences;

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

Servo myservo1;
int maxX = 120;
int minX = 10;
int posX = minX;

Servo myservo2;
int maxZ = 180;
int minZ = 1;
int posZ = minZ;

unsigned long previousMillis = 0;
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
  const float thresholdZ = 0.7; // Set this to the desired threshold

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

struct Difference
{
  int diff;
  void (*action)();
};

void actionXPlus()
{
  int position = posX;
  if (position > maxX)
  {
    position = minX;
  }
  else
  {
    position++;
  }
  setServoPosition(1, position);
  Serial.println("xplus : posX = " + String(posX) + "");
}

void actionXMinus()
{
  int position = posX;
  if (position < minX)
  {
    position = maxX;
  }
  else
  {
    position--;
  }
  setServoPosition(1, position);
  Serial.println("xminus : posX = " + String(posX) + "");
}

void actionZPlus()
{
  int position = posZ;
  if (position < maxZ)
  {
    position++;
  }
  else
  {
    position = minZ;
  }
  setServoPosition(2, position);
  Serial.println("zplus : posZ = " + String(posZ) + "");
}

void actionZMinus()
{
  int position = posZ;
  if (position > minZ)
  {
    position--;
  }
  else
  {
    position = maxZ;
  }
  setServoPosition(2, position);
  Serial.println("zminus : posZ = " + String(posZ) + "");
}

void readAndControlServos()
{
  while (true)
  {
    // Read the raw LDR values
    digitalWrite(13, HIGH);
    int xplus = analogRead(32);
    int xminus = analogRead(33);
    int zplus = analogRead(34);
    int zminus = analogRead(35);
    digitalWrite(13, LOW);

    // Calculate the differences and assign the actions
    Difference differences[4] = {
        {xplus - trigger_value[0], actionXPlus},
        {xminus - trigger_value[1], actionXMinus},
        {zplus - trigger_value[2], actionZPlus},
        {zminus - trigger_value[3], actionZMinus}};

    // Sort the differences in descending order
    std::sort(differences, differences + 4, [](const Difference &a, const Difference &b)
              { return a.diff > b.diff; });

    // Execute the actions in the sorted order
    int still = 1;
    for (int i = 0; i < 4; i++)
    {
      if (differences[i].diff > 0)
      {
        differences[i].action();
        still = 0;
        break;
      }
    }

    if (still)
    {
      break;
    }
  }
}

void setup()
{
  Serial.begin(9600);

  delay(1000);

  preferences.begin("preferences", false);
  String wifi = preferences.getString("wifi", "");
  String pass = preferences.getString("pass", "");

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
  server.on("/calibrate", calibrate_sensors);
  server.begin();

  pinMode(13, OUTPUT);
  myservo1.attach(26);
  myservo2.attach(27);

  posX = preferences.getInt("posX", minX);
  posZ = preferences.getInt("posZ", minZ);

  if (posX > maxX || posX < minX)
    posX = minX;
  if (posZ > maxZ || posZ < minZ)
    posZ = minZ;

  setServoPosition(1, posX);
  setServoPosition(2, posZ);
  setServoPosition(1, minX);
  setServoPosition(2, minZ);

  switch (state)
  {
  case AP_MODE:
    // Code to run in AP mode
    calibrate_sensors();
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

  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval)
  {
    previousMillis = currentMillis;

    readAndControlServos();
  }
}
