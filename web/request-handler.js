var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
var htmlFetch = require('../workers/htmlfetcher');

// require more modules/folders here!
var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};
exports.handleRequest = function (req, res) {
  var pathName = url.parse(req.url).pathname;
  pathName = path.join(__dirname, pathName);
  var statusCode = 200;

  // if (req.url === '/public/index.html') {
  //   htmlFetch.saveHTML("https://www.google.com/");
  // }

  if(req.method === 'GET') {
    req.setEncoding('utf8');
    fs.readFile(pathName, (err, data) => {
      if (err) {};
      res.writeHead(statusCode, headers);
      res.end(data);
    });
    return;
  }
  
  if(req.method === 'POST') {
    return;
  }
  res.writeHead(404, headers);
  res.end(archive.paths.list);
};
