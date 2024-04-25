#include <LiquidCrystal.h>

const int Button = 13;
int state = 0;
int previousState = 0; 
int Number = 0;

const int rs = 12, en = 11, d4 = 5, d5 = 4, d6 = 3, d7 = 2;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

void setup()
{
  Serial.begin(9600);
  pinMode(Button, INPUT);
  lcd.begin(16, 2);
  lcd.print("Bottles Banished:");
}

void loop()
{
  state = digitalRead(Button);
  
  if (state == HIGH && previousState == LOW) {
    delay(50); // Debounce delay
    if (digitalRead(Button) == HIGH) { // Check again after debounce delay
      Number++;
      Serial.println("Bottles Banished:");
      Serial.println(Number);
      lcd.setCursor(0, 1); // Set cursor to second row
      lcd.print(Number);
    }
  }

  previousState = state;
}