'use strict';
const $ = require('jquery');
const exec = require('child_process').exec;
const fs = require('fs');

const readConfig = (cb) => {
  fs.readFile(__dirname + '/dqlrunner.json', 'utf8', (err, buffer) => {
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
};

$(() => {
  const $dql = $('[name="dql"]'),
    $cwd = $('[name="cwd"]'),
    $opt = $('[name="opt"]'),
    $loading = $('#loading'),
    $output = $('#output');

  $('#query-form').on('submit', (e) => {
    e.preventDefault();

    $loading.removeClass('hidden');
    $output.html('');

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

    exec(cmd, {cwd: cwd}, (err, stdout, stderr) => {
      $output.html(err ? err.toString() : stdout.toString());
      $loading.addClass('hidden');
    });
  });

  readConfig(function (err, config) {
    if (err) {
      console.info('Unable to load config: ' + err);
    }
    $dql.val(config.dql || '');
    $cwd.val(config.cwd || '');
    $opt.val(config.opt || '');
  });
});