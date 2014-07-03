module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'js/**/*.js']
    },
    ngmin: {
      target: {
        src: ['js/app.js', 'js/**/*.js'],
        dest: 'tmp/build.js'
      }
    },
    uglify: {
      build: {
        files: {
          'dist/app.min.js': ['tmp/build.js']
        }
      }
    },
    // If you are using a
    cssmin: {
      combine: {
        files: {
          'dist/app.min.css': ['bower_components/todomvc-common/base.css']
        }
      }
    },
    concat: {
      dist: {
        src: [
          'bower_components/angular/angular.min.js',
          'bower_components/angular-route/angular-route.min.js'
        ],
        dest: 'dist/components.min.js',
      },
    },
    copy: {
      // Need to copy bg.png to the dist folder so the relative background-image
      // url will still resolve in release builds.
      images: {
        src: 'bower_components/todomvc-common/bg.png',
        dest: 'dist/bg.png',
        flatten: true
      }
    },
    watch: {
      options: {
        spawn: true,
        livereload: true
      },
      index: {
        files: ['index.html']
      },
      css: {
        files: ['css/*.css']
      },
      scripts: {
        files: ['js/**/*.js']
      }
    },
    clean: ['tmp'],
    aerobatic: {
      // These are the files that should be deployed to the cloud.
      deploy: {
        src: ['index.html', 'dist/*.*', 'favicons/*.*']
      },
      sim: {
        index: 'index.html',
        port: 3000,
        livereload: true
      }
    },
    karma: {
      options: {
        files: [
          'bower_components/angular/angular.js',
          'bower_components/angular-route/angular-route.js',
          'bower_components/angular-mocks/angular-mocks.js',
          'js/**/*.js',
          'test/unit/**/*.js'
        ],
        frameworks: ['jasmine'],
        browsers: ['Chrome'],
        logLevel: 'INFO',
        plugins : [
          'karma-jasmine',
          'karma-chrome-launcher'
        ],
        reporters: 'dots'
      },
      unit: {
        singleRun: true
      }
    }
  });


  grunt.registerTask('build', ['jshint', 'ngmin', 'copy', 'concat', 'uglify', 'cssmin', 'clean']);

  // Specify the sync option to avoid blocking the watch task
  grunt.registerTask('sim', ['build', 'aerobatic:sim:sync', 'watch']);

  // Create a deploy alias task which builds then deploys to aerobatic in the cloud
  grunt.registerTask('deploy', ['build', 'aerobatic:deploy']);

  grunt.registerTask('test', ['karma']);

  grunt.loadNpmTasks('grunt-aerobatic');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-karma');
};
