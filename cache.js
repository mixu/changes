var fs = require('fs'),
    Fetch = require('./lib/fetch.js');

var tracked = require('./config.json');

tracked.forEach(function(item) {
  Fetch.getCommits(item.user, item.repo, function(data) {
    fs.writeFile('./cache/'+item.module+'.github.json', JSON.stringify(data, null, 2), function(err) {
      if(err) throw err;
      console.log('Wrote file ./cache/'+item.module+'.github.json');
    });
  });

  Fetch.getVersions(item.module, function(data) {
    fs.writeFile('./cache/'+item.module+'.npm.json', JSON.stringify(data, null, 2), function(err) {
      if(err) throw err;
      console.log('Wrote file ./cache/'+item.module+'.npm.json');
    });
  });

});

