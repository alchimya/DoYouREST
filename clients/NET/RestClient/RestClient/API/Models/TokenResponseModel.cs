using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace RestClient.API.Models {
    class TokenResponseModel {
        [JsonProperty("success")]
        public bool Sucess { get; set; }
        [JsonProperty("token")]
        public string Token { get; set; }
    }
}
