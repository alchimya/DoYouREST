package domenicovacchiano.com.restclient.sdk.security;

import com.loopj.android.http.RequestParams;

import java.util.Objects;

import domenicovacchiano.com.restclient.sdk.config.Server;
import domenicovacchiano.com.restclient.sdk.consts.HTTPRequestTags;
import domenicovacchiano.com.restclient.sdk.net.RequestHandler;
import domenicovacchiano.com.restclient.sdk.net.RequestListener;

/**
 * Created by domenicovacchiano on 19/01/16.
 */
public class JWT {

    public  static void AuthenticateUser(String uid, String password,  RequestListener listener){
        RequestHandler handler = RequestHandler.getInstance();
        RequestParams params = new RequestParams();
        params.put("uid", uid);
        params.put("pwd", password);

        handler.makePostt(
                Server.instance().getAuthorizationEndpoint(),
                params,
                listener,
                HTTPRequestTags.AUTH_TOKEN
        );
    }


}
