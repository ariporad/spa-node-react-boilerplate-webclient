// Make ESLint treat this as ES5
/*eslint no-var:0, prefer-const:0*/

var config = require('./config');
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
        src: ['**'].concat(config.negate(config.dir.scripts + '/**',
                                         config.dir.style + '/**')),
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
            src: '*.*',
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
        cwd: __dirname,
        src: config.test.coverage.dir,
        expand: true,
      },
    },


    //
    // Stylesheets
    //

    // Compile the Styl(us)

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
        src: config.bundle + 'css',
      },
      dev: {
        expand: true,
        src: config.bundle + 'css',
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
      options: {},
      prod: {
        src: config.to.src(config.scripts.mainFile),
        dest: config.bundle + 'js',
        options: {
          transform: config.browserify.transform.concat(['uglifyify'])
        },
      },
      dev: {
        src: config.to.src(config.scripts.mainFile),
        dest: config.bundle + 'js',
        options: {
          transform: config.browserify.transform,
          browserifyOptions: config.browserify.options,
        },
      },
      watch: {
        src: config.to.src(config.scripts.mainFile),
        dest: config.bundle + 'js',
        options: {
          transform: config.browserify.transform,
          browserifyOptions: config.browserify.options,
          watch: true,
          watchifyOptions: {
            verbose: true
          },
        },
      },
      // test: {
      //  src: config
      //    .toBuild(config.scripts.tests)
      //    .concat([config.test.setup.scripts]),
      //  dest: config.bundle + 'test.js',
      //  options: {
      //    browserifyOptions: {
      //      debug: true,
      //      basedir: __dirname + '/' +
      // config.toBuild(config.dir.scripts)[0], }, }, },
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
        configFile: 'karma.conf.js',
        browsers: ['PhantomJS'],
        background: true,
      },
      once: {
        configFile: 'karma.conf.js',
        browsers: ['PhantomJS'],
        singleRun: true,
      },
      coverage: {
        configFile: 'karma.coverage.conf.js',
        browsers: ['PhantomJS'],
        singleRun: true,
      },
      browsers: {
        configFile: 'karma.conf.js',
        background: true,
      },
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

    concurrent: {
      start: {
        tasks: ['']
      },
    },

    connect: {
      dev: {
        options: {
          port: 8080,
          base: config.dir.build,
          livereload: true,
          useAvailablePort: true,
        }
      }
    },

    // Watch for changes
    watch: {
      livereload: {
        options: {
          livereload: true,
        },
        files: [
          config.dir.build + '/*.*',
        ],
      },
      stylesheets: {
        files: config.style.all,
        options: {
          spawn: false,
          cwd: config.dir.src,
        },
        tasks: ['stylesheets:dev'],
      },
      scripts: {
        files: config.scripts.noTests,
        options: {
          spawn: false,
          cwd: config.dir.src,
        },
        tasks: [],
      },
      test: {
        files: config.scripts.files,
        tasks: ['eslint', 'karma:unit:run'],
        options: {
          spawn: false,
          cwd: config.dir.src,
        },
      },
      browsers: {
        files: config.scripts.files,
        tasks: ['eslint', 'karma:browsers:run'],
        options: {
          spawn: false,
          cwd: config.dir.src,
        },
      },
    },

    // Run only a subset of watch tasks
    focus: {
      test: {
        exclude: ['browsers'],
      },
      browsers: {
        exclude: ['test'],
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
    [
      'stylus:dev',
      'postcss:dev',
      'exorcise:stylesheets',
    ]);
  grunt.registerTask('stylesheets:prod', 'Compiles the stylesheets.',
    [
      'stylus:prod',
      'postcss:prod',
    ]);

// scripts
  grunt.registerTask('scripts:dev',
                     'Compiles the JavaScript files. (w/sourcemaps)',
    [
      'eslint:scripts',
      'browserify:dev',
      'exorcise:scripts',
    ]);
  grunt.registerTask('scripts:prod', 'Compiles the JavaScript files.',
    [
      'eslint:scripts',
      'browserify:prod',
      'uglify:prod'
    ]);
  grunt.registerTask('test', 'Tests the JavaScript files.', ['karma:once']);
  grunt.registerTask('test:coverage',
                     'Tests the JavaScript files and generates coverage reports',
    ['karma:coverage']);

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
    [
      'build:dev',
      'karma:unit:start',
      'connect:dev',
      'browserify:watch',
      'focus:test',
    ]);
  grunt.registerTask('dev:browsers',
                     'Watches the project for changes, automatically builds' +
                     ' them and runs a server.',
    [
      'build:dev',
      'karma:browsers:start',
      'connect:dev',
      'focus:browsers',
    ]);
};
