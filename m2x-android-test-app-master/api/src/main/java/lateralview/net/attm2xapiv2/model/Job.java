package lateralview.net.attm2xapiv2.model;

import android.content.Context;

import java.util.Locale;

import lateralview.net.attm2xapiv2.common.Constants;
import lateralview.net.attm2xapiv2.listeners.ResponseListener;
import lateralview.net.attm2xapiv2.network.JsonRequest;

/**
 * Created by kristinpeterson on 12/28/15.
 */
public class Job {

    public static final int REQUEST_CODE_VIEW_JOB_DETAILS = 7001;

    public static final void viewDetails(Context context, String jobId, ResponseListener listener){
        JsonRequest.makeGetRequest(
                context,
                String.format(Locale.US, Constants.JOB_VIEW, jobId),
                null,
                listener,
                REQUEST_CODE_VIEW_JOB_DETAILS
        );
    }

}
