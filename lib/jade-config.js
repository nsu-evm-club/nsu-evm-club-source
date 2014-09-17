module.exports = function (config) {
  var pages = {};
  var files = {};
  var menu = [];
  config.pages.forEach(function (page) {
    var dest = "dest" + page.reference + 'index.html';
    var src = "src/template/" + page.template;
    files[dest] = src;
    
    pages[dest] = page;
    menu.push({
      title: page.title,
      href: page.reference
    });
  });
  return {
    files: files,
    data: function (src, dest) {
      return {
        title: config.title + " - " + pages[src].title,
        records: pages[src].content,
        menu: menu
      };
    }
  };
};