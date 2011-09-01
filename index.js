var qs    = require("querystring");
var https = require("https");

var VkClient = function(token) {
    this.token = token;
}

VkClient.prototype.PATH_START = "/method/";
VkClient.prototype.HOST       = "api.vkontakte.ru";

VkClient.prototype.api = function(method, params, callback) {
    var queryParams = {};
    if (typeof params == "object") {
        for (var i in params) {
            if (params.hasOwnProperty(i)) {
                queryParams[i] = params[i];
            }
        }
    }

    queryParams.access_token = this.token;

    var options = {
        host: this.HOST,
        path: this.PATH_START + method + "?" + qs.stringify(queryParams)
    };

    https.get(options, function(res) {
        var responseData = "";
        res.on("data", function(data) {
            responseData += data.toString();
        });

        res.on("end", function() {
            try {
                var result = JSON.parse(responseData);

                if (result.error) {
                    callback && callback(result.error);
                } else {
                    callback(undefined, result.response);
                }
            } catch (e) {
                callback && callback(e);
            }
        })
    }).on('error', function(e) {
        callback && callback(e);
    });
};

exports.VkClient = VkClient;