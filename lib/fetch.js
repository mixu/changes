var fs = require('fs'),
    client = require('mixu_minimal').Client;


exports.getCommits = function(user, repo, onDone) {
  client
    .get('https://api.github.com/repos/'+user+'/'+repo+'/commits?per_page=100')
    .end(client.parse(function(err, data) {
      if(err) throw err;
      onDone(data);
    }));
};

exports.getVersions = function(moduleName, onDone) {
  client
    .get('http://registry.npmjs.org/'+moduleName)
    .end(client.parse(function(err, data) {
      if(err) throw err;
      onDone(data);
    }));
};
