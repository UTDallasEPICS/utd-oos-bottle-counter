

const int dipSwitchPins[] = {12, 11, 10, 9}; // Change to your dip switch pins

void setup() {
  Serial.begin(9600);
  
  // Set dip switch pins as input
  for (int i = 0; i < 4; i++) {
    pinMode(dipSwitchPins[i], INPUT_PULLUP); // Enable internal pull-up resistors
  }
}

void loop() {
  int currentSwitchValue = 0; // Variable to store the current switch value
  
  // Read the state of each dip switch and update the current switch value
  for (int i = 0; i < 4; i++) {
    if (digitalRead(dipSwitchPins[i]) == LOW) { // Check if switch is on (HIGH)
      currentSwitchValue |= (1 << i); // Set the corresponding bit to 1
    }
  }
  
  Serial.print("Decimal value: ");
  Serial.println(currentSwitchValue);

  delay(100); // Add a small delay to debounce and prevent too rapid reading
}
