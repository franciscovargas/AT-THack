package att.hack.uk.knockknock;

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
    private final String STREAM_NAME = "knock_";
    private final int SAMPLE_PER_SEC = 4;
    private final int NUM_SECS = 3;
    private SensorManager mSensorManager;
    private float[] sensorBuffer = new float[4];
    private byte touch = 0;
    Thread logDataForInterval;



    @ViewById(R.id.button1)
    FancyButton button1;

    @ViewById(R.id.button2)
    FancyButton button2;

    @ViewById(R.id.button3)
    FancyButton button3;


    @ViewById(R.id.button4)
    FancyButton button4;



    @AfterViews
    void init() {
        M2XAPI.initialize(getApplicationContext(), MASTER_API_KEY);
        //initializes a stream if does not exist
        createUpdateDataStream(STREAM_NAME + "_acc_x", "meter/square second");
        createUpdateDataStream(STREAM_NAME + "_acc_y", "meter/square second");
        createUpdateDataStream(STREAM_NAME + "_acc_z", "meter/square second");
        createUpdateDataStream(STREAM_NAME + "_time", "byte");
        createUpdateDataStream(STREAM_NAME + "_event", "byte");



        mSensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
        mSensorManager.registerListener(this, mSensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER), SensorManager.SENSOR_DELAY_NORMAL);

        Log.e("fire", FirebaseInstanceId.getInstance().getToken());
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

    @Click(R.id.button1)
    void onKnock() {
        touch = 0;
        initThread();
        logDataForInterval.start();
    }
    @Click(R.id.button2)
    void onOpen() {
        touch = 1;
        initThread();
        logDataForInterval.start();

    }
    @Click(R.id.button3)
    void onBreak() {
        touch = 2;
        initThread();
        logDataForInterval.start();

    }
    @Click(R.id.button4)
    void onNothing() {
        touch = 3;
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

    public void postDataStreamValues(String name,String timestamp, String value) {
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

    private void sendCollectedSensorData() {
        String timestamp = getTimeStamp();
        postDataStreamValues(STREAM_NAME + "_acc_x",timestamp, sensorBuffer[0]+"");
        postDataStreamValues(STREAM_NAME + "_acc_y",timestamp, sensorBuffer[1]+"");
        postDataStreamValues(STREAM_NAME + "_acc_z",timestamp, sensorBuffer[2]+"");
        postDataStreamValues(STREAM_NAME + "_time",timestamp, timestamp);
        postDataStreamValues(STREAM_NAME + "_event",timestamp, touch+"");





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
        }


    }


}