package domenicovacchiano.com.restclient.sdk.net;

/**
 * Created by domenicovacchiano on 18/01/16.
 */
import com.loopj.android.http.*;

import java.util.Objects;

import cz.msebera.android.httpclient.Header;
public class RequestHandler{

    private static RequestHandler instance;

    private AsyncHttpClient client;

    private RequestHandler(){
        client = new AsyncHttpClient();
    }

    public static RequestHandler getInstance(){
        if(instance == null){
            instance = new RequestHandler();
        }
        return instance;
    }

    // You can add more parameters if you need here.
    public void makePostt(String url,RequestParams params, final RequestListener listener,final Object userInfo){
        client.post(url,params, new AsyncHttpResponseHandler() {

            @Override
            public void onStart() {}
            @Override
            public void onRetry(int retryNo) {}

            @Override
            public void onSuccess(int statusCode, Header[] headers, byte[] response) {
                listener.onSuccess(statusCode, headers, response,userInfo);
            }


            @Override
            public void onFailure(int statusCode, Header[] headers, byte[] errorResponse, Throwable e) {
                // called when response HTTP status is "4XX" (eg. 401, 403, 404)
                //Some debugging code here, show retry dialog, feedback etc.
                listener.onFailure(statusCode, headers, errorResponse);
            }

        });
    }
}


