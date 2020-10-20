#include <SoftwareSerial.h>

SoftwareSerial mySerial(7, 8);

void setup()
{
  mySerial.begin(19200);               // the GPRS baud rate   
   mySerial.write("Hello me");
  Serial.begin(19200);                 // the GPRS baud rate
  mySerial.println("AT+IPR=19200");    // Tell the SIM900 not to autobaud
  Serial.write("Hello me2");
  
}

void loop()
{
  if (mySerial.available())
    Serial.write(mySerial.read());
  if (Serial.available())
    mySerial.write(Serial.read());  

}
