var qs    = require("querystring");
var https = require("https");

var VkClient = function(token) {
    this.token = token;
};

VkClient.prototype.PATH_START = "/method/";
VkClient.prototype.HOST       = "api.vkontakte.ru";

VkClient.prototype.api = function(method, params, callback) {
    https.get(this.getHttpGetOptions(method, params), function(res) {
        var responseData = "";
        res.on("data", function(data) {
            responseData += data.toString();
        });

        res.on("end", function() {
            try {
                var result = JSON.parse(responseData);

                if (result.error) {
                    return callback && callback(result.error);
                } else {
                    return callback && callback(undefined, result.response);
                }
            } catch (e) {
                return callback && callback(e);
            }
        });
    }).on("error", function(e) {
        return callback && callback(e);
    });
};

VkClient.prototype.getHttpGetOptions = function(method, params) {
    var queryParams = {},
        i;

    if (typeof params === "object") {
        for (i in params) {
            if (params.hasOwnProperty(i)) {
                queryParams[i] = params[i];
            }
        }
    }

    queryParams.access_token = this.token;

    return {
        host: this.HOST,
        path: this.PATH_START + method + "?" + qs.stringify(queryParams)
    };
};

exports.VkClient = VkClient;