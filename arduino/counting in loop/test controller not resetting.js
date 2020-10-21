#include <Wire.h>  
#include <LiquidCrystal_I2C.h> 


LiquidCrystal_I2C lcd(0x3F, 16, 2); 
int num = 0;
char numberStr[10] = "000000000";

void setup() {
  Serial.begin(19200);
  Serial.println("AT+IPR=19200");
  
  lcd.begin(0, 2);
  lcd.init();
 
  lcd.backlight();     

  // lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("initiate"); 

  Serial.write("AT");
 }
 
void loop() {

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
   Serial.write("AT");
   delay(1000);
   num++;
   numToStr(num, numberStr);
   lcd.setCursor(0, 0);
   lcd.print(numberStr);
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












