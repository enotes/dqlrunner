'use strict';
const $ = require('jquery');
const exec = require('child_process').exec;
const fs = require('fs');
const configFile = __dirname + '/dqlrunner.json';

const readConfig = (cb) => {
    fs.access(configFile, fs.F_OK, (err) => {
      if (err) {
        // file does not exist
        return cb(null, {});
      }
      fs.readFile(configFile, 'utf8', (err, buffer) => {
          if (err) {
              return cb(err);
          }
          let config = {};
          try {
              config = JSON.parse(buffer.toString());
          } catch (e) {
              err = e;
          }
          cb(err, config);
      });
  });
};

const logError = (error) => {
  let $error = $('#error');
  $error.html(error.toString());
};

const updateButton = ($el, value) => {
  $el.val(value);
};

$(() => {
  const $dql = $('[name="dql"]');
  const $cwd = $('[name="cwd"]');
  const $opt = $('[name="opt"]');
  const $output = $('#output');
  const $submit = $('#submit');
  const $error = $('#error');

  $('#query-form').on('submit', (e) => {
    e.preventDefault();

    $output.html('');
    $error.html('');
    updateButton($submit, 'Loading...');

    const dql = $dql.val().trim();
    const cwd = $cwd.val() || __dirname;
    const opt = $opt.val() || '';

    const cmdParts = ['php app/console doctrine:query:dql'];
    if (opt) {
      cmdParts.push(opt);
    }
    cmdParts.push('-- "' + dql + '"');
    const cmd = cmdParts.join(' ');

    console.log(cwd);
    console.log(dql);
    console.log(cmd);

    exec(cmd, { cwd: cwd }, (err, stdout, stderr) => {
      if (err) {
        logError(err);
      } else if (stderr) {
        logError(stderr);
      } else {
        $output.html(stdout.toString());
      }
      updateButton($submit, 'Query...');
    });
  });

  readConfig((err, config) => {
    if (err) {
      return logError(err);
    }
    $dql.val(config.dql || '');
    $cwd.val(config.cwd || '');
    $opt.val(config.opt || '');
  });
});
