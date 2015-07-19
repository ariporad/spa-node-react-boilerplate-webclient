// Make ESLint treat this as ES5
/*eslint no-var:0, prefer-const:0*/

var config = require('./Gruntconfig');
var path = require('path');


module.exports = function Gruntfile(grunt) {
  grunt.config('env',
               grunt.config('env') ||
               process.env.NODE_ENV ||
               'production');

  // configure the tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //
    // Build Setup
    //

    // Copy files from src to build
    // It's a very conscious design decision to copy everything here,
    // and do all of everything in build/. It clearly separates the build
    // and the source.
    copy: {
      build: {
        cwd: config.dir.src,
        dest: config.dir.build,
        src: ['**'],
        expand: true,
      },
      client: {
        cwd: config.dir.src,
        dest: config.dir.build,
        src: config.client.allFiles,
        expand: true,
      },
      stylesheets: {
        cwd: config.dir.src,
        dest: config.dir.build,
        src: config.style.stylus,
        expand: true,
      },
    },

    // Clean the build dir
    clean: {
      build: {
        src: [config.dir.build],
      },
      stylesheets: {
        cwd: config.dir.build,
        src: config.style.all.concat(['client/stylus'], config.clean.ignore),
        expand: true,
      },
      client: {
        cwd: config.dir.build,
        src: config.client.allFiles
          .concat(['client/vendor', 'client/js'], config.clean.ignore),
        expand: true,
      },
      clientTests: {
        cwd: config.dir.build,
        src: config.client.tests.concat(config.clean.ignore),
        expand: true,
      },
    },


    //
    // Stylesheets
    //

    // Compile the Styl(us)
    stylus: {
      prod: {
        src: config.toBuild(config.style.all),
        dest: config.bundle + 'css',
      },
      dev: {
        options: {
          sourcemap: {
            // grunt-contrib-stylus doesn't support external sourcemaps
            inline: true,
          },
        },
        src: config.toBuild(config.style.all),
        dest: config.bundle + 'css',
      },
    },

    // CSS Postproccessing
    postcss: {
      options: {
        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer-core')({
            browsers: '> 5%',
          }), // add vendor prefixes
          require('postcss-font-family')(),
          require('cssnano')(), // minify the result
        ],
      },
      prod: {
        expand: true,
        src: '**/*.css',
        cwd: config.dir.build,
        dest: config.dir.build,
      },
      dev: {
        expand: true,
        src: '**/*.css',
        cwd: config.dir.build,
        dest: config.dir.build,
        options: {
          map: true,
        },
      },
    },

    //
    // Build the JavaScript
    //

    // Bundle the client side JS
    browserify: {
      options: {
        transform: ['babelify', 'uglifyify'],
      },
      prod: {
        src: config.toBuild(config.client.mainFile),
        dest: config.bundle + 'js',
      },
      dev: {
        src: config.toBuild(config.client.mainFile),
        dest: config.bundle + 'js',
        options: {
          browserifyOptions: {
            debug: true,
          },
        },
      },
    },

    //
    // Testing
    //

    eslint: {
      client: {
        src: config.client.files,
        expand: true,
        cwd: config.dir.src,
      },
    },

    // Test the Nodecode™
    //mochaTest: {
    //  test: {
    //    options: {
    //      reporter: 'spec',
    //      require: './test.setup.js',
    //    },
    //    expand: true,
    //    src: config.node.js.tests,
    //    cwd: config.dir.build,
    //  },
    //  coverage: {
    //    options: {
    //      reporter: 'html-cov',
    //      quiet: true,
    //      captureFile: 'coverage.html',
    //    },
    //    expand: true,
    //    src: config.node.js.tests,
    //    cwd: config.dir.build,
    //  },
    //},

    //
    // Dev
    //

    // Watch for changes
    watch: {
      livereload: {
        options: {
          livereload: true,
        },
        files: [
          config.client.dir + '/**/*.{styl,css,js}',
        ],
      },
      stylesheets: {
        files: config.style.all,
        options: {
          cwd: config.dir.src,
        },
        tasks: ['stylesheets'],
      },
      client: {
        files: config.client.noTests.concat(config.client.vendor),
        options: {
          cwd: config.dir.src,
        },
        tasks: ['client:dev'],
      },
      clientTests: {
        files: config.client.files,
        tasks: ['clientTests'],
        options: {
          cwd: config.dir.src,
        },
      },
    },
  });

  // load the plugins
  require('load-grunt-tasks')(grunt);

  //
  // Tasks
  //

  // Stylesheets
  grunt.registerTask('stylesheets:dev',
                     'Compiles the stylesheets. (w/sourcemaps)',
    ['copy:stylesheets',
     'stylus:dev',
     'postcss:dev',
     'clean:stylesheets',
    ]);
  grunt.registerTask('stylesheets:prod', 'Compiles the stylesheets.',
    ['copy:stylesheets',
     'stylus:prod',
     'postcss:prod',
     'clean:stylesheets',
    ]);

  // Client
  grunt.registerTask('client:dev',
                     'Compiles the JavaScript files. (w/sourcemaps)',
    ['clean:client',
     'copy:client',
     'eslint:client',
     'browserify:dev',
     'clean:client',
    ]);
  grunt.registerTask('client:prod', 'Compiles the JavaScript files.',
    ['clean:client',
     'copy:client',
     'eslint:client',
     'browserify:prod',
     'clean:client',
     'clean:clientTests',
    ]);
  grunt.registerTask('clientTests', 'Compiles the JavaScript files.',
    ['eslint:client']);

  grunt.registerTask('test', 'Tests all the code',
    [
     'clientTests',
    ]);

  grunt.registerTask('build:prod',
                     'Compiles all of the assets and copies the files to ' +
                     'the build directory.',
    ['clean:build',
     'copy:build',
     'stylesheets:prod',
     'client:prod',
    ]);
  grunt.registerTask('build:dev',
                     'Compiles all of the assets and copies the files to ' +
                     'the build directory. (w/sourcemaps)',
    ['clean:build',
     'copy:build',
     'stylesheets:dev',
     'client:dev',
    ]);
  grunt.registerTask('build', 'Runs build:prod', 'build:prod');

  grunt.registerTask('default', 'Runs the dev task',
    ['dev']);
  grunt.registerTask('dev',
                     'Watches the project for changes, automatically builds' +
                     ' them and runs a server.',
    ['build',
    ]);
};
