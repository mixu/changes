var fs = require('fs'),
    util = require('util'),
    semver = require('semver'),

    fmt = require('./lib/format.js');

var styles = {
  'white'     : ['\033[37m', '\033[39m'],
  'grey'      : ['\033[90m', '\033[39m'],
  'black'     : ['\033[30m', '\033[39m'],
  'blue'      : ['\033[34m', '\033[39m'],
  'cyan'      : ['\033[36m', '\033[39m'],
  'green'     : ['\033[32m', '\033[39m'],
  'magenta'   : ['\033[35m', '\033[39m'],
  'red'       : ['\033[31m', '\033[39m'],
  'yellow'    : ['\033[33m', '\033[39m']
};

function style(str, style) {
  return styles[style][0] + str + styles[style][1];
}

var tracked = require('./config.json');

tracked.forEach(function(item) {
  console.log('');
  console.log(style(item.module, 'red'));
  var commits = fmt.commits(JSON.parse(fs.readFileSync('./cache/'+item.module+'.github.json'))),
      versions = fmt.versions(JSON.parse(fs.readFileSync('./cache/'+item.module+'.npm.json')));

  var items = fmt.byVersion(versions, commits);

  Object.keys(items).sort(semver.rcompare).forEach(function(tag) {
    var version = items[tag];
    console.log(style((tag+'          ').substr(0, 14), 'yellow') + '\t' + style(fmt.yyyymmdd(version.date), 'green'));
    var show = version.commits.splice(0, 19);
    show.forEach(function(l) {
      console.log('  '+l.split('\n').slice(0, 1));
    });

    if(version.commits.length > 0) {
      console.log(style('  ... +'+ version.commits.length +' commits ...', 'grey'));
    }

  });

});

