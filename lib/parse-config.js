var fs = require('fs');
var path = require('path');
var config = require('../data/config');
var md = require('node-markdown').Markdown;

md.parseFile = function (file) {
  var content = fs.readFileSync(file).toString();
  return md(content);
};

function parsePages(configs) {
  var result = [];
  configs.forEach(function (pageConfig) {
    var config = {};
    config.title = pageConfig.title;
    config.reference = pageConfig.reference;
    config.template = pageConfig.template;
    config.content = [];
    var dir = path.join(__dirname, '../data/', pageConfig.baseDir);
    pageConfig.content.forEach(function (content) {
      var file = path.join(dir, content.file);
      config.content.push({
        title: content.title,
        data: md.parseFile(file)
      });
    });
    result.push(config);
  });
  return result;
}


module.exports = {
  title: config.title,
  menu: config.menu,
  pages: parsePages(config.pages),
};




/*

module.exports = function (contentDir) {
  var result = [];
  var filePath = path.normalize(__dirname + '/../data/' + contentDir + '/');
  list.forEach(function (record) {
    var content = parseFile(filePath + record.file);
    result.push({
      title: record.title,
      data: content
    });
  });
  var aboutPath = path.normalize(filePath + '../');
  var about = parseFile(aboutPath + 'about.md');
  return {
    records: result,
    about: about
  };
};*/