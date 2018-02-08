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
  pathName = path.join(archive.paths.archivedSites, pathName);
  var statusCode = 200;

  // if (req.url === '/public/index.html') {
  //   htmlFetch.saveHTML("https://www.google.com/");
  // }

  if(req.method === 'GET') {
    req.setEncoding('utf8');
    fs.readFile(pathName, (err, data) => {
      if (err) {console.log('get error')};
      if(!pathName.includes('www.')) {
        statusCode = 404;
      }
      res.writeHead(statusCode, headers);
      res.end(data);
    });
    return;
  }
  
  if (req.method === 'POST') {
    var body = '';
    req.on('data', (postdata) =>{
      body += postdata;
    });
    req.on('end', () => {
      if (body) {
        var text = JSON.parse(body).url;
        archive.addUrlToList(text, () => {console.log('posted')});
        headers['Content-type'] = 'application/JSON';
        res.writeHead(302, headers);
        res.end(body);
      }
    });
    return;
  }
  res.writeHead(404, headers);
  res.end(archive.paths.list);
};
