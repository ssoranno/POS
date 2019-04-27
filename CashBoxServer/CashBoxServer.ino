bool lockOpen = false;
#define TIMEOUT 5000 // mS
bool connection = false;
const int lockPin = 24;
int lock_state = 0;

void setup()
{
 //pinMode(LED,OUTPUT);
 //pinMode(button,INPUT); 
 Serial.begin(115200);
 Serial1.begin(115200);
 SendCommand("AT+RST", "Ready");
 delay(5000);
 SendCommand("AT+CWMODE=1","OK");
 String cmd = "AT+CWJAP=\"";         // Connect to WiFi
  cmd += "CenterForTheRetardedArts";                   // ssid_name
  cmd += "\",\"";
  cmd += "#Crackacold1";                // password
  cmd += "\"\r\n";

 SendCommand(cmd,"OK");
 SendCommand("AT+CIFSR", "OK");
 SendCommand("AT+CIPMUX=1","OK");
 SendCommand("AT+CIPSERVER=1,80","OK");
 SendCommand("AT+CIPSTA?","ip");
}
 
void loop(){
 lock_state = digitalRead(lockPin);
 
 /*if(button_state == HIGH){
    Serial1.println("AT+CIPSEND=0,23");
    Serial1.println("
Button was pressed!
");
    delay(1000);
    SendCommand("AT+CIPCLOSE=0","OK");
  }*/
  String IncomingString="";
 boolean StringReady = false;
  
  if(connection){
    
     //Serial1.println("AT+CIPSEND=0,4");
    SendCommand("AT+CIPSEND=0,4", ">");
    if(lockOpen){
        SendCommand("open",""); 
     } else{
        SendCommand("lock","");
     }
    delay(700);
    SendCommand("AT+CIPCLOSE=0","OK");
    connection = false;
  }
 
 while (Serial1.available()){
   IncomingString=Serial1.readString();
   StringReady= true;
  }
 
  if (StringReady){
      Serial.println("Received String: " + IncomingString);

    if (IncomingString.indexOf("GET /open") != -1) {
      connection = true;
      lockOpen = true;
      digitalWrite(lockPin,HIGH);
      Serial.println("unlocked");
    }

    if (IncomingString.indexOf("GET /lock") != -1) {
      connection = true;
      lockOpen = false;
      digitalWrite(lockPin,HIGH);
      Serial.println("locked");
    }


    /*SendCommand("AT+CIPSEND=0,4", ">");
    if(lockOpen){
        SendCommand("open",""); 
     } else{
        SendCommand("lock","");
     }
    delay(1000);
    SendCommand("AT+CIPCLOSE=0","OK");*/
  }
 }
 
boolean SendCommand(String cmd, String ack){
  Serial1.println(cmd); // Send "AT+" command to module
  if (!echoFind(ack)) // timed out waiting for ack string
    return true; // ack blank or ack found
}
 
boolean echoFind(String keyword){
 byte current_char = 0;
 byte keyword_length = keyword.length();
 long deadline = millis() + TIMEOUT;
 while(millis() < deadline){
  if (Serial1.available()){
    char ch = Serial1.read();
    Serial.write(ch);
    if (ch == keyword[current_char])
      if (++current_char == keyword_length){
       Serial.println();
       return true;
    }
   }
  }
 return false; // Timed out
}
