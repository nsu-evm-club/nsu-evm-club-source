var marked = require('marked');
var us = require('underscore');
var path = require('path');
var fs = require('fs');

function parseFile(file) {
  var content = fs.readFileSync(file).toString();
  return marked(content);
}

exports.preparePages = function (config) {
  var menu = [];
  var result = [];
  config.pages.forEach(function (page) {
    var pageInfo = {};
    pageInfo.src = path.join('./src/template', page.template);
    pageInfo.dest = path.join('./dest/', page.reference);
    pageInfo.options = {};
    pageInfo.options.menu = menu;
    pageInfo.options.title = config.title + " - " + page.title;
    pageInfo.options.records = us.clone(page.content);
    pageInfo.options.records.forEach(function (record) {
      record.data = parseFile(path.join('./data/', page.baseDir, record.file));
    });
    result.push(pageInfo);
    menu.push({title: page.title, href: page.reference});
  });
  return result;
}

