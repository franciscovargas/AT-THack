package lateralview.net.m2xapiv2exampleapp.activities;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;

import org.json.JSONException;
import org.json.JSONObject;

import lateralview.net.attm2xapiv2.listeners.ResponseListener;
import lateralview.net.attm2xapiv2.model.Distribution;
import lateralview.net.attm2xapiv2.network.ApiV2Response;
import lateralview.net.m2xapiv2exampleapp.R;

public class DistributionActivity extends Activity implements ResponseListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_distribution);
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_distribution, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    public void listDistributions(View view) {
        Distribution.list(DistributionActivity.this, new ResponseListener() {
            @Override
            public void onRequestCompleted(ApiV2Response result, int requestCode) {

            }

            @Override
            public void onRequestError(ApiV2Response error, int requestCode) {

            }
        });
    }

    public void createDistribution(View view){
        try {
            JSONObject o = new JSONObject("{ \"name\": \"Sample Distribution\",\n" +
                    "  \"description\": \"Longer description for Sample Distribution\",\n" +
                    "  \"visibility\": \"public\" }");
            Distribution.create(DistributionActivity.this, o, this);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public void viewDistributionDetails(View view){
        Distribution.viewDetails(DistributionActivity.this,"cc86b9c881755506d356659363680d29",this);
    }

    public void updateDistributionDetails(View view){
        try {
            JSONObject o = new JSONObject("{ \"name\": \"Sample Distribution\",\n" +
                    "                \"description\": \"Longer description for Sample Distribution\",\n" +
                    "                \"visibility\": \"public\" }");
            Distribution.updateDetails(DistributionActivity.this, o, "cc86b9c881755506d356659363680d29", this);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public void listDevicesExistingDistribution(View view){
        Distribution.listDevices(DistributionActivity.this,"cc86b9c881755506d356659363680d29",this);
    }

    public void addDeviceToDistribution(View view){
        try {
            JSONObject o = new JSONObject("{ \"serial\": \"ABC1234\"}");
            Distribution.addDevice(DistributionActivity.this, o, "cc86b9c881755506d356659363680d29", this);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public void deleteDistribution(View view){
        Distribution.delete(DistributionActivity.this,"cc86b9c881755506d356659363680d29",this);
    }

    public void listDataStreams(View view){
        Distribution.listDataStreams(DistributionActivity.this,"cc86b9c881755506d356659363680d29",this);
    }

    public void createUpdateDataStream(View view){
        try{
            JSONObject o = new JSONObject("{ \"unit\": { \"label\": \"celsius\", symbol: \"C\" }, \"type\": \"numeric\" }");
            Distribution.createUpdateDataStream(DistributionActivity.this,o,"cc86b9c881755506d356659363680d29","LVStream",this);
        }catch(JSONException e){
            e.printStackTrace();
        }
    }

    public void viewDataStream(View view){
        Distribution.viewDataStream(DistributionActivity.this,"cc86b9c881755506d356659363680d29","LVStream",this);
    }

    public void deleteDataStream(View view){
        Distribution.deleteDataStream(DistributionActivity.this,"cc86b9c881755506d356659363680d29","LVStreams",this);
    }

    //API listeners
    @Override
    public void onRequestCompleted(ApiV2Response result, int requestCode) {
        Log.d("APIV2Request", "Completed");
        Log.d("APIV2 - RESULT",result.get_raw());
    }

    @Override
    public void onRequestError(ApiV2Response error, int requestCode) {
        Log.d("APIV2Request","Error");
        Log.d("APIV2 - ERROR",error.get_raw());
    }
}
