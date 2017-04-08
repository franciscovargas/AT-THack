package att.hack.uk.knockknock;

import android.app.Activity;
import android.view.Window;
import android.widget.TextView;

import org.androidannotations.annotations.AfterViews;
import org.androidannotations.annotations.EActivity;
import org.androidannotations.annotations.Fullscreen;
import org.androidannotations.annotations.ViewById;
import org.androidannotations.annotations.WindowFeature;

/**
 * Created by fabienflorek on 4/8/17.
 */
@Fullscreen
@WindowFeature(Window.FEATURE_NO_TITLE)
@EActivity(R.layout.layout_lock)
public class LockActivity extends Activity {

   @ViewById(R.id.textView)
   TextView tx;

    @AfterViews
    void init() {
        String s = getIntent().getStringExtra("data");
        tx.setAllCaps(true);
        tx.setText(s);


    }
}
