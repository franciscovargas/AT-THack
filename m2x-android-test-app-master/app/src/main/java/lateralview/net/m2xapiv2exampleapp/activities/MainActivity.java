package lateralview.net.m2xapiv2exampleapp.activities;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;

import lateralview.net.m2xapiv2exampleapp.R;


public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //Call method to start request
        searchCatalog();
        createDevice();
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
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


    public void openDeviceActivity(View view) {
        Intent openDeviceActivityIntent = new Intent(MainActivity.this,DeviceActivity.class);
        startActivity(openDeviceActivityIntent);
    }

    public void openDistributionActivity(View view) {
        Intent openDistributionActivityIntent = new Intent(MainActivity.this,DistributionActivity.class);
        startActivity(openDistributionActivityIntent);
    }

    public void openKeysActivity(View view) {
        Intent openKeysActivityIntent = new Intent(MainActivity.this,KeysActivity.class);
        startActivity(openKeysActivityIntent);
    }

    @Override
    protected void onResume() {
        super.onResume();
    }

    private void searchCatalog(){

    }

    private void createDevice(){

    }




}
