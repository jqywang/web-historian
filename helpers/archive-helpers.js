var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile('/Users/student/code/hrsf89-web-historian/test/testdata/sites.txt', (err, data) => {
    if(err) console.log(err);
    data = data.toString();
    console.log(data);
    var arrayURLS = data.split('\n');
    callback(arrayURLS);
    done();
  });
};

exports.isUrlInList = function(url) {
  return (fs.readFile(exports.paths.list, (err, data) => {
    return data.includes(url);
  }));
};

exports.addUrlToList = function(url, callback) {
  var stream = fs.createWriteStream(exports.paths.list, {flags: 'a'});
  stream.write(`${url} `);
  stream.end();
};

exports.isUrlArchived = function(url, callback) {
  return fs.existsSync(exports.paths.archivedSites + url);
};

exports.downloadUrls = function(urls) {
  for (var i = 0; i < urls.length; i++) {
    //get urls[i] index.html with whatever method
  }
  //clear sites.txt
};
