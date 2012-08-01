var fs = require('fs'),
    client = require('mixu_minimal').Client;

// via: https://gist.github.com/3109252

function parse_link_header(header) {
  if (header.length == 0) {
    return {};
  }

  // Split parts by comma
  var parts = header.split(',');
  var links = {};
  // Parse each part into a named link
  parts.forEach(function(p) {
    var section = p.split(';');
    if (section.length != 2) {
      throw new Error("section could not be split on ';'");
    }
    var url = section[0].replace(/<(.*)>/, '$1').trim();
    var name = section[1].replace(/rel="(.*)"/, '$1').trim();
    links[name] = url;
  });

  return links;
}

exports.getCommits = function getCommits(user, repo, onDone) {
  var commits = [];

  function fetchCommits(url) {
    client
      .get(url)
      .end(function(err, res) {
        // gotta refactor the parsing stuff...
        client.parse(function(err, data) {
          if(err) throw err;
          commits = commits.concat(data);
          var headers = parse_link_header(res.headers['link'] || '');
          if(headers.next && commits.length < 1000) {
            fetchCommits(headers.next);
          } else {
            onDone(commits);
          }
        }).call(client, err, res);
      });
  }

  fetchCommits('https://api.github.com/repos/'+user+'/'+repo+'/commits?per_page=100');
};

exports.getVersions = function getVersions(moduleName, onDone) {
  client
    .get('http://registry.npmjs.org/'+moduleName)
    .end(client.parse(function(err, data) {
      if(err) throw err;
      onDone(data);
    }));
};

/*
exports.getCommits('mixu', 'nwm', function(commits) {
  console.log(JSON.parse(commits).length);
});
*/
