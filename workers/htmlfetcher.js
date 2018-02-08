// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var request = require('request');

exports.saveHTML = (url) => {

    var parseMyAwesomeHtml = function(html) {
        console.log(html);
    };
    request(url, function (error, response, body) {
        if (!error) {
            parseMyAwesomeHtml(body);
        } else {
            console.log(error);
        }
    });
}