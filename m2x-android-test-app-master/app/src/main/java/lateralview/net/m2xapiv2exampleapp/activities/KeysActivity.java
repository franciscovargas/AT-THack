package lateralview.net.m2xapiv2exampleapp.activities;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;

import org.json.JSONObject;

import lateralview.net.attm2xapiv2.listeners.ResponseListener;
import lateralview.net.attm2xapiv2.model.Key;
import lateralview.net.attm2xapiv2.network.ApiV2Response;
import lateralview.net.m2xapiv2exampleapp.R;

public class KeysActivity extends Activity implements ResponseListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_keys);
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_keys, menu);
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

    public void listKeys(View view){
        Key.list(KeysActivity.this,null,this);
    }

    public void createKey(View view){
        try{
            JSONObject o = new JSONObject("{ \"name\": \"newkey\",\n" +
                    "  \"permissions\": [\"GET\", \"PUT\"],\n" +
                    "  \"device\": null,\n" +
                    "  \"stream\": null,\n" +
                    "  \"expires_at\": null }");
            Key.create(KeysActivity.this,o,this);
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    public void viewKeyDetails(View view){
        Key.viewDetails(this,"0b7e5278cbd63674c1c54a708d7ef421",this);
    }

    public void updateKey(View view){
        try{
            JSONObject o = new JSONObject("{ \"name\": \"newKey\",\n" +
                    "  \"permissions\": [\"GET\"],\n" +
                    "  \"expires_at\": \"2014-10-03T15:37:05.000Z\",\n" +
                    "  \"stream\": \"temperature\",\n" +
                    "  \"origin\": null,\n" +
                    "  \"device_access\": \"public\" }");
            Key.update(this,o,"0b7e5278cbd63674c1c54a708d7ef421",this);
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    public void regenerateKey(View view){
        Key.regenerate(this,"0b7e5278cbd63674c1c54a708d7ef421",this);
    }

    public void deleteKey(View view){
        Key.delete(KeysActivity.this,"20e46ffaa5fa8a09408ca4efa868c37e",this);
    }

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
