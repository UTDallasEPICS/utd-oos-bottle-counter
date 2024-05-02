

const int dipSwitchPins[] = {12, 11, 10, 9, 8, 7, 6, 5}; // Change to your dip switch pins
const int buttonPin = 4; 
int buttonState = 0; 
int lastButtonState = 0; // Variable to store the previous state of the button
bool buttonPressed = false; // Flag to indicate if the button has been pressed

void setup() {
  Serial.begin(9600);
  pinMode(buttonPin, INPUT);
  
  // Set dip switch pins as input
  for (int i = 0; i < 8; i++) {
    pinMode(dipSwitchPins[i], INPUT_PULLUP); // Enable internal pull-up resistors
  }
}

void loop() {
  buttonState = digitalRead(buttonPin);
  int currentSwitchValue = 0; // Variable to store the current switch value
  
  // Check if the button is pressed and has transitioned from unpressed to pressed
  if (buttonState == HIGH && lastButtonState == LOW) {
    buttonPressed = true;
  }
  
  // If the button is pressed, read the state of each dip switch and update the current switch value
  if (buttonPressed) {
    for (int i = 0; i < 8; i++) {
      if (digitalRead(dipSwitchPins[i]) == LOW) { // Check if switch is on (LOW)
        currentSwitchValue |= (1 << i); // Set the corresponding bit to 1
      }
    }
    
    Serial.print("Decimal value: ");
    Serial.println(currentSwitchValue);
    
    // Reset buttonPressed flag to false after reading the switches
    buttonPressed = false;
  }
  
  // Store the current button state for comparison in the next iteration
  lastButtonState = buttonState;

  delay(100); // Add a small delay to debounce and prevent too rapid reading
}
