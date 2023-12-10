#include <Servo.h>

Servo myservo;
int max = 130;
int min = 30;
int pos = 30;

int min_value[4];
int max_value[4];
int trigger_value[4];

void read_sensor_values(int sensor_readings1[], int pin1,int sensor_readings2[], int pin2) {
  myservo.write(pos);
  for (int i = 0; i < 100; i++) {
    digitalWrite(1, HIGH);
    delay(10);
    sensor_readings1[i] = analogRead(pin1);
    sensor_readings2[i] = analogRead(pin2);
    delay(10);
    digitalWrite(1, LOW);
    delay(180);
    pos++;
    myservo.write(pos);
  }
}

int max_array(int arr[]){
  int result=0;
  for(int i=0; i<100; i++){
    result = max(result, arr[i]);
  }
  return result;
}

int min_array(int arr[]){
  int result=1024;
  for(int i=0; i<100; i++){
    result = min(result, arr[i]);
  }
  return result;
}

void calibrate_sensors() {
  int sensor1_readings[100];
  int sensor2_readings[100];

  read_sensor_values(sensor1_readings, A0, sensor2_readings, A1);

  max_value[0] = max_array(sensor1_readings);
  max_value[1] = max_array(sensor2_readings);
  min_value[0] = min_array(sensor1_readings);
  min_value[1] = min_array(sensor2_readings);

  trigger_value[0] = (max_value[0]-min_value[0])*7/8 + min_value[0];
  trigger_value[1] = (max_value[1]-min_value[1])*7/8 + min_value[1];

  Serial.println("----------------------");
  Serial.println(max_value[0]);
  Serial.println(min_value[0]);
  Serial.println(max_value[1]);
  Serial.println(min_value[1]);
  Serial.println(trigger_value[0]);
  Serial.println(trigger_value[1]);
  Serial.println("----------------------");
}

void print_sensor(int xplus, int xminus){
  Serial.print(xplus);
  Serial.print(",");
  Serial.print(xminus);
  Serial.println();
}

void setup() {
  Serial.begin(9600);
  pinMode(1, OUTPUT);
  myservo.attach(9);

  calibrate_sensors();
}

void loop() {
  int xplus = analogRead(A0);
  int xminus = analogRead(A1);
  while(xplus > trigger_value[0] && pos <= max){
    myservo.write(pos);
    pos++; 
    delay(30);
    xplus = analogRead(A0);
    xminus = analogRead(A1);
    Serial.println("plus");
  }
  while(xminus > trigger_value[1] && pos >= min){
    myservo.write(pos);
    pos--;
    delay(30);
    xplus = analogRead(A0);
    xminus = analogRead(A1);
    Serial.println("minus");
  }
}
