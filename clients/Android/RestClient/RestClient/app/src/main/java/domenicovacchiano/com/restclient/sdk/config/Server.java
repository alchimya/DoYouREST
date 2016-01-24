package domenicovacchiano.com.restclient.sdk.config;

/**
 * Created by domenicovacchiano on 19/01/16.
 */

public class Server {

    private String host="http://192.168.1.104";
    private int port=8080;
    private static Server _instance;


    public String getAuthorizationEndpoint() {
        return String.format("%s:%d/token",host,port);
    }
    public String getRessourcesEndpoint() {
        return String.format("%s:%d/api",host,port);
    }
    public String getHost() {
        return host;
    }
    public void setHost(String host) {
        this.host = host;
    }
    public int getPort() {
        return port;
    }
    public void setPort(int port) {
        this.port = port;
    }

    public  static Server instance (){
        if (_instance==null){
            _instance=new Server();
        }
        return _instance;
    }


}
