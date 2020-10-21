#include <Wire.h>  
#include <LiquidCrystal_I2C.h> 
#define okayCheck 4

LiquidCrystal_I2C lcd(0x3F, 16, 2); 
int num = 0;
char numberStr[10] = "000000000";
char responseStr[40] = "---------------------------------------";
bool desiredCharFlag = false; // it hecks that needed char is in response from gsm800

void setup() {
  Serial.begin(19200);
  Serial.println("AT+IPR=19200");

  while (!Serial);
  
  lcd.begin(0, 2);
  lcd.init();
 
  lcd.backlight();     

  // lcd.clear();
  myPrint(0,"initiate--");

 // Serial.write("AT");
 }
 
void loop() {
  desiredCharFlag = false;
  Serial.println("AT");
  //delay(20);
  byte index = 0;
  while (Serial.available())
    {
      char RXG8 = Serial.read();
    // if O comes then check rest are OKAY or not!!!
    if(RXG8 == 'O') // || RXG8 == 'o' || RXG8 == 'K' || RXG8 == 'k'
    {
      desiredCharFlag = true;
    }
    if(desiredCharFlag)
    {
      //storing response char by char
    responseStr[index] = RXG8;
    index++;
    if(index >= okayCheck )
      { 
        index = 0;
        //if the msg contains okay then
        if(okayFind(responseStr[0], responseStr[1], responseStr[2], responseStr[3]))
        {
          myPrint(1, "Okay reply.......");
          break;
        }
        else{ //if the msg is not okay then...
          desiredCharFlag = false;
          index = 0;
          myPrint(1, "not Okay reply.....");
        }
      }
    }
      
    }
  /*lcd.setCursor(0, 1);
  while (Serial.available())
    {
    char Xch = Serial.read();
    if((Xch <= 'z' || Xch <= 'Z') && (Xch >= 'a' || Xch >= 'A'))
    {
      lcd.print("got something");
      while(1);
    }
    }*/
   
   delay(8000);
   num++;
   numToStr(num, numberStr);
   myPrint(0, numberStr);
   if(num > 9999999)
   num = 0;
  myPrint(1, "sending REQ....");
   delay(2000);
}

void numToStr(int X, char stringVar[10])
{
 byte indx = 9;
    while(X > 0)
    {
      stringVar[indx] = X%10+48;
      X/=10;
      indx--;
    }
}

bool okayFind(char c1, char c2, char c3, char c4)
{
  if(c1 == 'O' && c2 == 'K' && (c3 == '\r' || c3 == '\n' ))
    return true;
  else
    return false;
}

bool myPrint(int line, char msg[20])
{
    lcd.setCursor(0, line);
    lcd.print(msg);
}













