"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
function checkProxy(proxy) {
    return new Promise(function (resolve) {
        var auth = null;
        if (proxy['user']) {
            auth = "Basic " + Buffer.from(proxy['user'] + ":" + proxy['pass']).toString('base64');
        }
        request({
            url: 'https://www.recaptcha.net/recaptcha/api.js',
            proxy: 'http://' + proxy['ip'] + ":" + proxy['port'],
            strictSSL: false,
            timeout: 5000,
            headers: {
                "Proxy-Authorization": auth || undefined
            }
        }, function (err, resp, body) {
            resolve(!err && body.indexOf('recaptcha') !== -1);
        });
    });
}
// checkProxy({ip:"60.191.57.78", port: "33555", user: "zx1569164689", pass: "uvf6oa"}).then((a)=>{
//     console.info(a)
// });
exports.default = checkProxy;
