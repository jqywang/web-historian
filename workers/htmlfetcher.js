// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var request = require('request');

// exports.saveHTML = (url, callback) => {

//     var callback = function(html, stuff, morestuff for fs write) {
//         console.log(html);
//     };
//     request(url, function (error, response, body) {
//         if (!error) {
//             callback(body, stuff, morestuff);
//         } else {
//             console.log(error);
//         }
//     });
// }