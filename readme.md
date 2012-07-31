# changes

A tool for checking what the status of your own npm modules is.

## Why?

- I always forget to update my npm packages and I refuse to manually track my ```npm publish``` invocations.
- changes takes your Github repo commits (via the GH API) and your npm package versions (via the npm API), and creates a log that you can check.

## Usage

Edit config.json with your own repositories + modules.

There are two tasks: one updates the cached files, the other takes the cached files and produces output:

    node cache.js && node check.js

Output:

    Wrote file ./cache/gluejs.npm.json
    Wrote file ./cache/miniee.npm.json
    Wrote file ./cache/gluejs.github.json
    Wrote file ./cache/miniee.github.json

    gluejs
    unreleased      2012-07-31
      Spec out the new group responsibilities. Move the render() and watch() tasks to Glue so that file groups can focus on what they do best
      Initial support for multiple packages in one
      ... +21 commits ...
    0.0.2           2012-05-25
      Update readme.md and description
      Remove unneeded file
      ... +8 commits ...

    miniee
    unreleased      2012-07-31
      Merge pull request #1 from azer/master
      put missing semicolon
      ... +10 commits ...
    0.0.2           2011-09-14
      Bump to 0.0.2
      Whitespace fix and patch for when events are removed in the middle of emitting
      ... +2 commits ...
    0.0.1           2011-08-17
      Initial commit
      ... +1 commits ...

