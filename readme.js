'use strict';
const $ = require('jquery');
const marked = require('marked');
const fs = require('fs');
const readmeMD = fs.readFileSync(__dirname + '/README.md', 'utf8');
const readmeHTML = marked(readmeMD);

$(() => {
  $('#content').html(readmeHTML);
});