namespace RestClient {
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Linq;
    using System.Net.Http;
    using System.Text;
    using System.Threading.Tasks;
    using System.Windows;
    using System.Windows.Controls;
    using System.Windows.Data;
    using System.Windows.Documents;
    using System.Windows.Input;
    using System.Windows.Media;
    using System.Windows.Media.Imaging;
    using System.Windows.Navigation;
    using System.Windows.Shapes;
    using Newtonsoft.Json;
    using RestClient.API.Models;
    using RestClient.Http;
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window {
        private string baseUri = "http://localhost:8080";
        private string currentToken = null;

        public MainWindow() {
            InitializeComponent();
        }

        public static async Task<string> GetData(string url, string data) {
            //data = "test=something";

            HttpClient client = new HttpClient();
            StringContent queryString = new StringContent(data);

            HttpResponseMessage response = await client.PostAsync(new Uri(url), queryString);

            //response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();

            return responseBody;
        }

        private string test() {
            return "";
        }

        public void HttpRequestCompleted(object response) {
            if (response is TokenResponseModel) {
                var model = response as TokenResponseModel;
                currentToken = model.Token;
            }
            else if (response is TestResponseModel) {
                var model = response as TestResponseModel;
                Debug.Print(model.Message);
            }
          
           Dispatcher.BeginInvoke(new Action(delegate {
               txtResponse.Text = JsonConvert.SerializeObject(response);
            }));

        }
        private void cmdJWT_Click(object sender, RoutedEventArgs e) {
            string tokenUri = String.Format("{0}/token", baseUri);
            var postData = new List<KeyValuePair<string, string>>();
            postData.Add(new KeyValuePair<string, string>("uid", txtUID.Text));
            postData.Add(new KeyValuePair<string, string>("pwd", txtPWD.Text));
            HttpAsyncRequest<TokenResponseModel> token = new HttpAsyncRequest<TokenResponseModel>();
            token.RequestCompleted+=HttpRequestCompleted;
            token.SenTo(tokenUri, HTTPRequestMethod.HTTPRequestMethod_Post, postData);
        }

        private void cmdAPITest_Click(object sender, RoutedEventArgs e) {
            string apiUri = String.Format("{0}/api/test/1234?token={1}", baseUri,currentToken);
            HttpAsyncRequest<TestResponseModel> token = new HttpAsyncRequest<TestResponseModel>();
            token.RequestCompleted += HttpRequestCompleted;
            token.SenTo(apiUri, HTTPRequestMethod.HTTPRequestMethod_Get, null);
        }

  
        
    }


}
