package domenicovacchiano.com.restclient.sdk.net;

/**
 * Created by domenicovacchiano on 19/01/16.
 */
import java.util.Objects;

import cz.msebera.android.httpclient.Header;
public interface RequestListener{
    void onSuccess(int statusCode, Header[] headers, byte[] response,Object userInfo);
    void onFailure(int statusCode, Header[] headers, byte[] errorResponse);
}