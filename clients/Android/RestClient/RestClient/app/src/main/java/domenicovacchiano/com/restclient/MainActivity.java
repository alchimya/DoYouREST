package domenicovacchiano.com.restclient;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.EditText;

import com.loopj.android.http.*;

import org.json.JSONObject;

import java.util.ArrayList;

import cz.msebera.android.httpclient.Header;
import domenicovacchiano.com.restclient.sdk.api.ApiBasicTest;
import domenicovacchiano.com.restclient.sdk.consts.HTTPRequestTags;
import domenicovacchiano.com.restclient.sdk.net.RequestHandler;
import domenicovacchiano.com.restclient.sdk.net.RequestListener;
import domenicovacchiano.com.restclient.sdk.security.JWT;

public class MainActivity extends AppCompatActivity implements RequestListener {
    private String currentToken=null;
    private EditText txtUID;
    private EditText txtPWD;
    private EditText txtResponse;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        txtUID = (EditText) findViewById(R.id.txtUID);
        txtPWD = (EditText) findViewById(R.id.txtPWD);
        txtResponse = (EditText) findViewById(R.id.txtResponse);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });


    }
    public void onJWTClick(View view) {
        JWT.AuthenticateUser(txtUID.getText().toString(),txtPWD.getText().toString(),this);
    }

    public void onAPIBasicClick(View view) {
        ApiBasicTest.PerfomPostWithToken(currentToken,this);
    }

    @Override
    public void onSuccess(int statusCode, Header[] headers, byte[] response,Object userInfo) {
        // do whatever you want here.
        String jsonString = new String(response);
        try{
            JSONObject json = new JSONObject(jsonString);
            //System.out.print(jsonString);
            if (userInfo.toString()== HTTPRequestTags.AUTH_TOKEN){
                currentToken=json.getString("token");
            }else if (userInfo.toString()== HTTPRequestTags.API_BASIC){

            }
            txtResponse.setText(jsonString);
        }catch (Exception e){
            //TODO
        }






    }
    @Override
    public void onFailure(int statusCode, Header[] headers, byte[] errorResponse) {
        String s = new String(errorResponse);
        System.out.print(s);
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


}
