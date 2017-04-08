package att.hack.uk.fallwithme;

import android.app.Activity;
import android.view.Window;

import org.androidannotations.annotations.EActivity;
import org.androidannotations.annotations.Fullscreen;
import org.androidannotations.annotations.WindowFeature;

/**
 * Created by fabienflorek on 4/8/17.
 */
@Fullscreen
@WindowFeature(Window.FEATURE_NO_TITLE)
@EActivity(R.layout.layout_fall)
public class FallActivity extends Activity {
}
