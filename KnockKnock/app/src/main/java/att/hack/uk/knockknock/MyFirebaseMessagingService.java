package att.hack.uk.knockknock;

import android.content.Intent;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

/**
 * Created by fabienflorek on 4/8/17.
 */

public class MyFirebaseMessagingService extends FirebaseMessagingService {

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        Intent i = new Intent(getApplicationContext(), LockActivity_.class);
        i.putExtra("data", remoteMessage.getNotification().getBody());
        startActivity(i);
    }

}
