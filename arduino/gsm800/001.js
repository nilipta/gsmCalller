#include <Wire.h>  
#include <LiquidCrystal_I2C.h> 


LiquidCrystal_I2C lcd(0x3F, 16, 2); 
int i = 0;

void setup() {
  Serial.begin(19200);
  //Serial.println("AT+IPR=19200");
  
  lcd.begin(0, 2);
  lcd.init();
 
  lcd.backlight();     

  // lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("initiate"); 

  Serial.write("AT");
 }
 
void loop() {

	while (Serial.available())
	  {
		char Xch = Serial.read();
		if((Xch <= 'z' || Xch <= 'Z') && (Xch >= 'a' || Xch >= 'A'))
		{
			lcd.setCursor(0, 1);
			lcd.print(Xch);
			while(1){lcd.setCursor(0, 0); lcd.print("In while loop");}
		}
	  }
	 Serial.write("AT");
	 lcd.setCursor(0, 1);
	 lcd.print("got something");
	 delay(100);
}

