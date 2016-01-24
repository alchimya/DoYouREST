namespace RestClient.Http {
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Text;
    using System.Threading.Tasks;
    using Newtonsoft.Json;

    public enum HTTPRequestMethod{
        HTTPRequestMethod_Post=0,
        HTTPRequestMethod_Get=1
    }
    public class HttpAsyncRequest<T> {
        public delegate void HttpRequestCompleted(object response);
        public event HttpRequestCompleted RequestCompleted;
        public void SenTo(String uri, HTTPRequestMethod httpMethod, List<KeyValuePair<string, string>> postData) {

            
            HttpClient httpClient = new HttpClient();
           // httpClient.BaseAddress = new Uri("http://localhost:8080");
            //httpClient.DefaultRequestHeaders.Add("User-Agent", "Indexification URL Adder 1.0");
            switch (httpMethod) { 
                case HTTPRequestMethod.HTTPRequestMethod_Get:
                    httpClient.GetAsync(uri)
                    .ContinueWith(postTask => {
                        if (RequestCompleted != null) {
                            RequestCompleted(GetResponseObject(postTask));
                        }
                    });
                    break;
                case HTTPRequestMethod.HTTPRequestMethod_Post:
                    HttpContent content = new FormUrlEncodedContent(postData);
                    httpClient.PostAsync(uri, content)
                   .ContinueWith(postTask => {
                       if (RequestCompleted != null) {
                           RequestCompleted(GetResponseObject(postTask));
                       }
                    });
                    break;
            }
        }
        private T GetResponseObject(Task<HttpResponseMessage> postTask) {
            var contents = postTask.Result.EnsureSuccessStatusCode()
                .Content.ReadAsStringAsync().Result;
            
            return JsonConvert.DeserializeObject<T>(contents);
        }
    }

}
