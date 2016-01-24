package domenicovacchiano.com.restclient.sdk.api;

import com.loopj.android.http.RequestParams;

import domenicovacchiano.com.restclient.sdk.config.Server;
import domenicovacchiano.com.restclient.sdk.consts.HTTPRequestTags;
import domenicovacchiano.com.restclient.sdk.net.RequestHandler;
import domenicovacchiano.com.restclient.sdk.net.RequestListener;

/**
 * Created by domenicovacchiano on 19/01/16.
 */
public class ApiBasicTest {
    public  static void PerfomPostWithToken(String token,RequestListener listener){
        RequestHandler handler = RequestHandler.getInstance();
        RequestParams params = new RequestParams();
        params.put("token", token);

        handler.makePostt(
                String.format("%s/test",Server.instance().getRessourcesEndpoint()),
                params,
                listener,
                HTTPRequestTags.API_BASIC
        );
    }
}

