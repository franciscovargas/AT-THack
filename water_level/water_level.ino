/*macro definition of water sensor and the buzzer*/
#define WATER_SENSOR 8
#define BUZZER 6
boolean beeped = true;


void setup()
{
    pins_init();
    Serial.begin(9600);
    pinMode(6, OUTPUT);
    


}
void loop()
{
    if(isExposedToWater() and not beeped) {
      soundAlarm();
      beeped = true;
    }else
      beeped=false;
    Serial.println(digitalRead(WATER_SENSOR));
    delay(200);

}

void pins_init()
{
    pinMode(WATER_SENSOR, INPUT);
    pinMode(BUZZER, OUTPUT);
}

/************************************************************************/
/*Function: When the sensor is exposed to the water, the buzzer sounds  */
/*          for 2 seconds.                                              */
/************************************************************************/
void soundAlarm()
{
    for(uint8_t i = 0;i < 1;i ++)
    {
        digitalWrite(BUZZER, HIGH);
        delay(5);
        digitalWrite(BUZZER, LOW);
        delay(1000);
    }
}

/************************************************************************/
/*Function: Determine whether the sensor is exposed to the water        */
/*Parameter:-void                                                       */
/*Return:   -boolean,if it is exposed to the water,it will return true. */
/************************************************************************/
boolean isExposedToWater()
{
    if(digitalRead(WATER_SENSOR) == LOW)
    return true;
    else return false;
}
