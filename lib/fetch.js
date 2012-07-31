var fs = require('fs'),
    client = require('mixu_minimal').Client;

client
  .get('https://api.github.com/repos/visionmedia/express/commits?per_page=100')
  .end(function(err, res){
    res.pipe(fs.createWriteStream('../test/fixtures/express.github.json'));
  });
  /*
  .end(client.parse(function(err, data) {
    console.log(data);

    if(data && data.changes) {
      data.changes.forEach(function(change) {


      });
    }
  }));
*/

client
  .get('http://search.npmjs.org/api/express')
  .end(function(err, res){
    res.pipe(fs.createWriteStream('../test/fixtures/express.npm.json'));
  });
/*
  .end(client.parse(function(err, data) {
    console.log(data);

    if(data && data.changes) {
      data.changes.forEach(function(change) {


      });
    }
  }));
*/

