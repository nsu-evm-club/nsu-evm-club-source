var config = require('./lib/parse-config');
var jadeConfig = require('./lib/jade-config')(config);

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main: {
        expand: true,
        cwd: 'data/static/',
        src: '**',
        dest: 'dest/'
      }
    },
    clean: ['dest/*'],
    less: {
      production: {
        options: {
          "compress": true
        },
        files: {
          "dest/css/main.css": "src/less/main.less"
        }
      }
    },
    jade: {
      compile: {
        options: {
          data: jadeConfig.data
        },
        files: jadeConfig.files
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          hostname: '127.0.0.1',
          base: 'dest/',
          keepalive: true
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-connect');
  
  grunt.registerTask('compile', ['clean', 'copy', 'less', 'jade']);
  grunt.registerTask('serve', ['connect']);
  grunt.registerTask('default', ['compile']);
};