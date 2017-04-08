package att.hack.uk.fallwithme;

import android.app.Activity;
import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.util.Log;
import android.view.Window;

import com.att.m2x.android.listeners.ResponseListener;
import com.att.m2x.android.main.M2XAPI;
import com.att.m2x.android.model.Device;
import com.att.m2x.android.network.ApiV2Response;
import com.google.firebase.iid.FirebaseInstanceId;

import org.androidannotations.annotations.AfterViews;
import org.androidannotations.annotations.Click;
import org.androidannotations.annotations.EActivity;
import org.androidannotations.annotations.Fullscreen;
import org.androidannotations.annotations.ViewById;
import org.androidannotations.annotations.WindowFeature;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

import mehdi.sakout.fancybuttons.FancyButton;

@Fullscreen
@WindowFeature(Window.FEATURE_NO_TITLE)
@EActivity(R.layout.activity_main)
public class MainActivity extends Activity implements ResponseListener, SensorEventListener {

    private final String MASTER_API_KEY = "c25425b2b76dd3bbad2b7fbf348a802b";
    private final String DEVICE_API_KEY = "4e38d68dec07e31438dbe2ef93fc27c4";
    private final String STREAM_NAME = "myPhone";
    private final int SAMPLE_PER_SEC = 4;
    private final int NUM_SECS = 5;
    private SensorManager mSensorManager;
    private float[] sensorBuffer = new float[8];
    private byte falling = 0;
    Thread logDataForInterval;


    @ViewById(R.id.button_walking)
    FancyButton button1;

    @ViewById(R.id.button_falling)
    FancyButton button2;



    @AfterViews
    void init() {
        M2XAPI.initialize(getApplicationContext(), MASTER_API_KEY);
        //initializes a stream if does not exist
        createUpdateDataStream(STREAM_NAME + "_test", "meter/square second");

        createUpdateDataStream(STREAM_NAME + "_acc_x", "meter/square second");
        createUpdateDataStream(STREAM_NAME + "_acc_y", "meter/square second");
        createUpdateDataStream(STREAM_NAME + "_acc_z", "meter/square second");
        createUpdateDataStream(STREAM_NAME + "_acc_linear", "meter/square second");
        createUpdateDataStream(STREAM_NAME + "_gyro_x", "radian per second");
        createUpdateDataStream(STREAM_NAME + "_gyro_y", "radian per second");
        createUpdateDataStream(STREAM_NAME + "_gyro_z", "radian per second");
        createUpdateDataStream(STREAM_NAME + "_gyro_rotation", "radian per second");
        createUpdateDataStream(STREAM_NAME + "_falling", "byte");

        mSensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
        mSensorManager.registerListener(this, mSensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER), SensorManager.SENSOR_DELAY_NORMAL);
        mSensorManager.registerListener(this, mSensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE), SensorManager.SENSOR_DELAY_NORMAL);
        mSensorManager.registerListener(this, mSensorManager.getDefaultSensor(Sensor.TYPE_LINEAR_ACCELERATION), SensorManager.SENSOR_DELAY_NORMAL);
        mSensorManager.registerListener(this, mSensorManager.getDefaultSensor(Sensor.TYPE_ROTATION_VECTOR), SensorManager.SENSOR_DELAY_NORMAL);
        Log.e("fire",FirebaseInstanceId.getInstance().getToken());
    }

    void initThread() {
        logDataForInterval = new Thread() {
            @Override
            public void run() {
                try {
                    int numRuns = SAMPLE_PER_SEC*NUM_SECS;
                    while(numRuns>0) {
                        sleep(1000/SAMPLE_PER_SEC);
                        sendCollectedSensorData();
                        numRuns--;
                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        };

    }

    @Click(R.id.button_walking)
    void doOnClick() {
        falling = 0;
        initThread();
        logDataForInterval.start();
    }
    @Click(R.id.button_falling)
    void onFallingClick() {
        falling = 1;
        initThread();
        logDataForInterval.start();

    }


    public void createUpdateDataStream(String name, String label) {
        try {
            JSONObject o = new JSONObject("{ \"unit\": { \"label\": \"" + label + "\", symbol: \"" + label + "\" }}");
            Device.createUpdateDataStreams(this, o, DEVICE_API_KEY, name, this);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private String getTimeStamp() {
        TimeZone tz = TimeZone.getTimeZone("UTC");
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"); // Quoted "Z" to indicate UTC, no timezone offset
        df.setTimeZone(tz);
        return df.format(new Date());
    }

    public void postDataStreamValues(String name,String timestamp, float value) {
        try {
            JSONObject o = new JSONObject("{ \"values\": [\n" +
                    // "  { \"timestamp\": \"2014-09-09T19:15:00.624Z\", \"value\": 32 },\n" +
                    // "  { \"timestamp\": \"2014-09-09T20:15:00.522Z\", \"value\": 30 },\n" +
                    "  { \"timestamp\": \"" + timestamp + "\", \"value\":" + value + " } ] }");
            Device.postDataStreamValues(this, o, DEVICE_API_KEY, name, this);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public void updateDataStreamValue(int value) {
        try {
            JSONObject o = new JSONObject("{ \"timestamp\": \"" + getTimeStamp() + "\", \"value\": " + value + " }");
            Log.d("Stream", o.toString());
            Device.createUpdateDataStreams(this, o, DEVICE_API_KEY, STREAM_NAME, this);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
    private void sendCollectedSensorData() {
        String timestamp = getTimeStamp();
        postDataStreamValues(STREAM_NAME + "_acc_x",timestamp, sensorBuffer[0]);
        postDataStreamValues(STREAM_NAME + "_acc_y",timestamp, sensorBuffer[1]);
        postDataStreamValues(STREAM_NAME + "_acc_z",timestamp, sensorBuffer[2]);
        postDataStreamValues(STREAM_NAME + "_gyro_x",timestamp, sensorBuffer[3]);
        postDataStreamValues(STREAM_NAME + "_gyro_y",timestamp, sensorBuffer[4]);
        postDataStreamValues(STREAM_NAME + "_gyro_z",timestamp, sensorBuffer[5]);
        postDataStreamValues(STREAM_NAME + "_acc_linear",timestamp, sensorBuffer[6]);
        postDataStreamValues(STREAM_NAME + "_gyro_rotation",timestamp, sensorBuffer[7]);
        //postDataStreamValues(STREAM_NAME + "_falling",timestamp, falling);



    }

    //API listeners
    @Override
    public void onRequestCompleted(ApiV2Response result, int requestCode) {
        Log.d("APIV2Request", "Completed");
        Log.d("APIV2 - RESULT", result.get_raw());
    }

    @Override
    public void onRequestError(ApiV2Response error, int requestCode) {
        Log.d("APIV2Request", "Error");
        Log.d("APIV2 - ERROR", error.get_raw());
    }

    @Override
    public void onAccuracyChanged(Sensor arg0, int arg1) {
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        Sensor sensor = event.sensor;
        if (sensor.getType() == Sensor.TYPE_ACCELEROMETER) {
            sensorBuffer[0] = event.values[0];
            sensorBuffer[1] = event.values[1];
            sensorBuffer[2] = event.values[2];
        } else if (sensor.getType() == Sensor.TYPE_GYROSCOPE) {
            sensorBuffer[3] = event.values[0];
            sensorBuffer[4] = event.values[1];
            sensorBuffer[5] = event.values[2];

        } else if (sensor.getType() == Sensor.TYPE_LINEAR_ACCELERATION) {
            sensorBuffer[6] = event.values[0];
        } else if (sensor.getType() == Sensor.TYPE_ROTATION_VECTOR) {
            sensorBuffer[7] = event.values[0];
        }


//https://link.springer.com/article/10.1186/s13678-016-0004-1
    }


}