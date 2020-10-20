#include <Ticker.h>

bool atmode = true;
String atcommand = "";
String atresponse = "";
Ticker timer;

void setup() 
{
  Serial.begin(115200);
  inputString.reserve(200);
}

void loop()
{
  if(Serial.available())
  {
    char inChar = (char)Serial.read();
    if(atmode)
    {
      atcommand += inChar;
      if(inChar == '\n')
      {
        Serial.write("SENDING COMMAND: ");
        Serial.write(atcommand);

        Serial.switch();
        Serial.write(atcommand);
        timer.attach(1, switchBack);
      }
    } else {
      atresponse += inChar;
    }
  }
}

void switchBack()
{
  Serial.switch();
  Serial.write("RETURN FROM A6: ");
  Serial.write(atresponse);
  
  atcommand = "";
  atresponse = "";
  atmode = true;
}
