#include <Wire.h>  
#include <LiquidCrystal_I2C.h> 


LiquidCrystal_I2C lcd(0x3F, 16, 2); 

void setup() {
  Serial.begin(9600);
  Serial.println("Starting...");
  
  lcd.begin(0, 2);
  lcd.init();
 
  lcd.backlight();     

  // lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("initiate to gsm module"); 
  
   
 }
 
void loop() {
    // lcd.setCursor(0, 1);
  // lcd.print("connected gsm module"); 
  sendATcommand("AT", 5);
  delay(5000);
  
   lcd.setCursor(0, 0);
  lcd.print("in loop"); 
  delay(2000);
}

int8_t sendATcommand(char* ATcommand, unsigned int timeout)
{
  lcd.setCursor(0, 0);
  //String cmd = "cmd-"  + *ATcommand;
  lcd.print("sending comand"); 
  uint8_t x = 0,  answer = 0;
  char response[20];
  unsigned long previous;
  memset(response, '\0', 20);
  delay(100);
  while (Serial.available())
  {
    Serial.read();
  }
  Serial.println(ATcommand);
  x = 0;
  previous = millis();
  do
  {
    if (Serial.available() != 0)
    {
      response[x] = Serial.read();
      x++;
    }
  }
  while ((answer == 0) && ((millis() - previous) < timeout));
  lcd.setCursor(0, 1);
  //lcd.print("last line"); 
  if(response[0] != '\0')
    lcd.print(response); 
  else
    lcd.print("No response----"); 
}
