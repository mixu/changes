var semver = require('semver');

exports.commits = function commits(gh) {
  return gh
    .filter(function(a) { return !!a; })
    .map(function(change) {
      return { date: new Date(change.commit.committer.date), message: change.commit.message };
    })
    .sort(function(a, b) { return b.date.getTime() - a.date.getTime(); });
};

exports.versions = function versions(npm) {
  return Object.keys(npm.time)
    .filter(semver.valid)
    .sort(semver.rcompare)
    .map(function(version) {
      return { version: version, date: new Date(npm.time[version]) };
    });
};

exports.yyyymmdd = function yyyymmdd(day) {
  return day.getFullYear() +
    '-' + (day.getMonth() < 9 ? '0' : '') + (day.getMonth() + 1) +
    '-' + (day.getDate() < 10 ? '0': '') + day.getDate();
};

// Groups a set of commits by date:
//
//   '2012-07-04':
//   [ { date: Wed, 04 Jul 2012 16:51:48 GMT,
//       message: 'fix to test' },
//     { date: Wed, 04 Jul 2012 11:19:40 GMT,
//       message: 'upgrade connect dep' } ],
exports.byDate = function byDate(items) {
  var results = {};

  items.forEach(function(item) {
    var commitDate = new Date(item.date),
        shortDate = yyyymmdd(commitDate);
    results[shortDate] || (results[shortDate] = []);
    results[shortDate].push(item);
  });
  return results;
};

exports.byVersion = function byVersion(versions, commits) {
  var i, version, results = {};
  commits.forEach(function(commit) {
    i = versions.length-1;
    while(versions[i] && commit.date > versions[i].date) {
      i--;
    }
    version = (versions[i] ? versions[i].version : 'unreleased');
    results[version] || (results[version] = { date: (versions[i] ? versions[i].date : new Date()), commits: [] });
    results[version].commits.push(commit.message);
  });
  return results;
};
