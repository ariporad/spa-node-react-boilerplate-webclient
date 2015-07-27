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

    env: {
      dev: {
        NODE_ENV: 'development',
      },
      prod: {
        NODE_ENV: 'production',
      },
      test: {
        NODE_ENV: 'test',
      },
    },

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
      scripts: {
        cwd: config.dir.src,
        dest: config.dir.build,
        src: config.scripts.files.concat(['**/*.json']),
        expand: true,
      },
      stylesheets: {
        cwd: config.dir.src,
        dest: config.dir.build,
        src: config.style.stylus,
        expand: true,
      },
      test: {
        files: [
          {
            expand: true,
            cwd: 'node_modules/mocha',
            src: 'mocha.{js,css}',
            dest: config.dir.build,
          },
          {
            expand: true,
            cwd: 'test',
            src: 'mocha.html',
            dest: config.dir.build,
          },
        ],
      },
    },

    // Clean the build dir
    clean: {
      build: {
        src: [config.dir.build],
      },
      stylesheets: {
        cwd: config.dir.build,
        src: config.style.all.concat(['styl',
                                      '**/*.css.map'], config.clean.ignore),
        expand: true,
      },
      scripts: {
        cwd: config.dir.build,
        src: config.scripts.files
          .concat(['**/*.json', 'js', '**/*.js.map'], config.clean.ignore),
        expand: true,
      },
      test: {
        cwd: config.dir.build,
        src: config.scripts.tests.concat(config.clean.ignore),
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

    // Bundle the scripts side JS
    browserify: {
      options: {
        transform: ['babelify',
          ['extensify', { extensions: ['jsx'] }],
                    'envify',
                    'brfs',
                    'folderify',
                    'uglifyify',
        ],
      },
      prod: {
        src: config.toBuild(config.scripts.mainFile),
        dest: config.bundle + 'js',
      },
      dev: {
        src: config.toBuild(config.scripts.mainFile),
        dest: config.bundle + 'js',
        options: {
          browserifyOptions: {
            debug: true,
            basedir: __dirname + '/' + config.toBuild(config.dir.scripts)[0],
          },
        },
      },
      test: {
        src: config
          .toBuild(config.scripts.tests)
          .concat([config.test.setup.scripts]),
        dest: config.bundle + 'test.js',
        options: {
          browserifyOptions: {
            debug: true,
            basedir: __dirname + '/' + config.toBuild(config.dir.scripts)[0],
          },
        },
      },
    },

    exorcise: {
      options: {
        base: __dirname + '/' + config.dir.build
      },
      scripts: {
        options: {},
        src: config.bundle + 'js',
        dest: config.bundle + 'js.map',
      },
      test: {
        options: {},
        src: config.bundle + 'test.js',
        dest: config.bundle + 'test.js.map',
      },
      stylesheets: {
        options: {},
        src: config.bundle + 'css',
        dest: config.bundle + 'css.map',
      },
    },

    uglify: {
      dev: {
        options: {
          sourceMap: true,
          sourceMapIn: config.bundle + 'js.map',
        },
        src: config.bundle + 'js',
        dest: config.bundle + 'js',
      },
      prod: {
        src: config.bundle + 'js',
        dest: config.bundle + 'js',
        options: {
          compress: {
            drop_console: true
          }
        },
      },
    },

    //
    // Testing
    //

    eslint: {
      scripts: {
        src: config.scripts.files,
        expand: true,
        cwd: config.dir.src,
      },
      options: {
        configFile: 'eslint.json'
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },

    //// Test the Nodecode™
    //mochaTest: {
    //    test: {
    //      options: {
    //        reporter: 'spec',
    //        require: ['./test.setup.js'],
    //      },
    //      expand: true,
    //      src: config.node.js.tests,
    //      cwd: config.dir.build,
    //    },
    //    coverage: {
    //      options: {
    //        reporter: 'html-cov',
    //        quiet: true,
    //        captureFile: 'coverage.html',
    //      },
    //      expand: true,
    //      src: config.node.js.tests,
    //      cwd: config.dir.build,
    //    },
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
          config.dir.build + '/**/*.{html,css,js}',
        ],
      },
      stylesheets: {
        files: config.style.all,
        options: {
          cwd: config.dir.src,
        },
        tasks: ['stylesheets'],
      },
      scripts: {
        files: config.scripts.noTests,
        options: {
          cwd: config.dir.src,
        },
        tasks: ['scripts:dev'],
      },
      test: {
        files: config.scripts.files,
        tasks: ['test'],
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
     'exorcise:stylesheets',
     'clean:stylesheets',
    ]);
  grunt.registerTask('stylesheets:prod', 'Compiles the stylesheets.',
    ['copy:stylesheets',
     'stylus:prod',
     'postcss:prod',
     'clean:stylesheets',
    ]);

  // scripts
  grunt.registerTask('scripts:dev',
                     'Compiles the JavaScript files. (w/sourcemaps)',
    ['clean:scripts',
     'copy:scripts',
     'eslint:scripts',
     'browserify:dev',
     'clean:scripts',
     'exorcise:scripts',
    ]);
  grunt.registerTask('scripts:prod', 'Compiles the JavaScript files.',
    ['clean:scripts',
     'copy:scripts',
     'eslint:scripts',
     'browserify:prod',
     'clean:scripts',
     'uglify:prod'
    ]);
  grunt.registerTask('test', 'Tests the JavaScript files.',
    ['env:test',
     'clean:build',
     'eslint:scripts',
     'copy:scripts',
     'browserify:test',
     'clean:scripts',
     'copy:test',]);

  grunt.registerTask('build:prod',
                     'Compiles all of the assets and copies the files to ' +
                     'the build directory.',
    ['env:prod',
     'clean:build',
     'copy:build',
     'stylesheets:prod',
     'scripts:prod',
    ]);
  grunt.registerTask('build:dev',
                     'Compiles all of the assets and copies the files to ' +
                     'the build directory. (w/sourcemaps)',
    ['env:dev',
     'clean:build',
     'copy:build',
     'stylesheets:dev',
     'scripts:dev',
    ]);
  grunt.registerTask('build', 'Runs build:prod', 'build:prod');

  grunt.registerTask('default', 'Runs the dev task',
    ['dev']);
  grunt.registerTask('dev',
                     'Watches the project for changes, automatically builds' +
                     ' them and runs a server.',
    ['build:dev',
     'watch']);
};
