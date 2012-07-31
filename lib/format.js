var semver = require('semver');

var npm = require('../test/fixtures/express.npm.json'),
    github = require('../test/fixtures/express.github.json');


function commits(gh) {
  return gh
    .filter(function(a) { return !!a; })
    .map(function(change) {
      return { date: new Date(change.commit.committer.date), message: change.commit.message };
    })
    .sort(function(a, b) { return b.date.getTime() - a.date.getTime(); });
}

console.log(require('util').inspect(commits(github), null, 5, true));

function versions(npm) {
  return Object.keys(npm.time)
    .filter(semver.valid)
    .sort(semver.rcompare)
    .map(function(version) {
      return { version: version, date: new Date(npm.time[version]) };
    });
}

console.log(require('util').inspect(versions(npm), null, 5, true));

function byDate(items) {
  var results = {};

  items.forEach(function(item) {
    var commitDate = new Date(item.date),
        shortDate = commitDate.getFullYear() +
        '-' + (commitDate.getMonth() < 9 ? '0' : '') + (commitDate.getMonth() + 1) +
        '-' + (commitDate.getDate() < 10 ? '0': '') + commitDate.getDate();
    results[shortDate] || (results[shortDate] = []);
    results[shortDate].push(item);
  });
  return results;
}

console.log(require('util').inspect(
  byDate(commits(github)), null, 5, true));

function byVersion(versions, commits) {
  var i, version, results = [];
  commits.forEach(function(commit) {
    i = versions.length-1;
    while(versions[i] && commit.date > versions[i].date) {
      i--;
    }
    version = (versions[i] ? versions[i].version : 'unreleased');
    results[version] || (results[version] = []);
    results[version].push(commit.message);
  });
  return results;
}

console.log(require('util').inspect(
  byVersion(versions(npm), commits(github)), null, 5, true));
