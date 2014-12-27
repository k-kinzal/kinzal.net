'use strict';

module.exports = function(grunt) {
  // variable
  var config = {
    app: 'app',
    dist: 'dist',
    tmp: '.tmp',
    test: 'test'
  };
  // 
  grunt.template.addDelimiters('handlebars-like-delimiters', '{{', '}}')
  // grunt configuration
  grunt.initConfig({
    // variable
    config: config,
    // development
    watch: {
      livereload: {
        files: [
          '<%= config.app %>/{,*/}*.html',
          '<%= config.app %>/styles/{,*/}*.css',
          '<%= config.app %>/scripts/{,*/}*.js',
          '<%= config.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        tasks: ['template', 'livereload']
      }
    },
    connect: {
      options: {
        livereload: true,
        port: 8009,
        hostname: 'localhost',
        middleware: function(connect) {
            console.log(require('path').resolve(config.app));
          return [
            require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
            connect.static(require('path').resolve(config.tmp)),
            connect.static(require('path').resolve(config.app))
          ];
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }

    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= config.tmp %>',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      }
    },
    bower: {
      install: {
        options: {
          targetDir: '<%= config.app %>/components',
          install: true,
          copy: false,
          cleanTargetDir: true,
          cleanBowerDir: false,
          bowerOptions: {
            production: true
          }
        }
      }
    },
    jshint: {
      options: {
        jshintrc: true,
        reporter: require('jshint-stylish')
      },
      all: [
        '<%= config.app %>/scripts/{,*/}*.js',
        '<%= config.test %>/spec/{,*/}{,*/}*.js'
      ]
    },
    copy: {
      scripts: {
        files: [
          {
            expand: true,
            flatten: true,
            dest: '<%= config.tmp %>/scripts',
            src: [
              '<%= config.app %>/components/minified/dist/minified.js',
              '<%= config.app %>/components/echojs/dist/echo.js',
              '<%= config.app %>/scripts/script.js'
            ]
          }
        ]
      },
      fonts: {
        files: [
          {
            expand: true,
            cwd: '<%= config.app %>/components/font-awesome/fonts/',
            dest: '<%= config.tmp %>/fonts',
            src: [
              '**',
            ]
          }
        ]
      },
      images: {
        files: [
          {
            expand: true,
            cwd: '<%= config.app %>/images/',
            dest: '<%= config.tmp %>/images',
            src: [
              '**'
            ]
          }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= config.tmp %>',
            dest: '<%= config.dist %>',
            src: [
              '*.html',
              'scripts/*.min.js',
              'styles/*.min.css',
              'images/**',
              'fonts/**'
            ]
          }
        ]
      }
    },
    concat: {
      scripts: {
        files: {
          '<%= config.tmp %>/scripts/kinzal.net.min.js': [
            '<%= config.tmp %>/scripts/minified.min.js',
            '<%= config.tmp %>/scripts/echo.min.js',
            '<%= config.tmp %>/scripts/script.min.js'
          ]
        }
      }
    },
    replace: {
      strict: {
        src: '<%= config.tmp %>/scripts/script.js',
        dest: '<%= config.tmp %>/scripts/script.js',
        replacements: [{
          from: '\'use strict\';',
          to: ''
        }]
      }
    },
    uglify: {
      options: {
        mangle: true,
        squeeze: { dead_code: false},
        codegen: { quote_keys: true},
        report: 'gzip',
        compress: true,
        preserveComments: require('uglify-save-license')
      },
      dist: {
        files: [
          {
            src: '<%= config.tmp %>/scripts/minified.js',
            dest: '<%= config.tmp %>/scripts/minified.min.js'
          },
          {
            src: '<%= config.tmp %>/scripts/echo.js',
            dest: '<%= config.tmp %>/scripts/echo.min.js'
          },
          {
            src: '<%= config.tmp %>/scripts/script.js',
            dest: '<%= config.tmp %>/scripts/script.min.js'
          }
        ]
      }
    },
    uncss: {
      dist: {
        options: {
          ignore: [
            /:target/,
            /:not/,
          ],
          media: ['all'],
        },
        files: {
          '<%= config.tmp %>/styles/style.css': [
            '<%= config.app %>/index.html'
          ],
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 8']
      },
      files: {
          '<%= config.tmp %>/styles/style.css': [
            '<%= config.tmp %>/styles/style.css'
          ]
      }
    },
    csso: {
      compress: {
        options: {
          report: 'gzip'
        },
        files: {
          '<%= config.tmp %>/styles/kinzal.net.min.css': [
            '<%= config.tmp %>/styles/style.css'
          ],
        }
      }
    },
    image_resize: {
      favicon: {
        options: { width: 32 },
        files: {
          '<%= config.tmp %>/images/favicon.png': '<%= config.tmp %>/images/icon.png'
        }
      },
      57: {
        options: { width: 57 },
        files: {
          '<%= config.tmp %>/images/icon-57.png': '<%= config.tmp %>/images/icon.png'
        }
      },
      76: {
        options: { width: 76 },
        files: {
          '<%= config.tmp %>/images/icon-76.png': '<%= config.tmp %>/images/icon.png'
        }
      },
      120: {
        options: { width: 120 },
        files: {
          '<%= config.tmp %>/images/icon-120.png': '<%= config.tmp %>/images/icon.png'
        }
      },
      152: {
        options: { width: 152 },
        files: {
          '<%= config.tmp %>/images/icon-152.png': '<%= config.tmp %>/images/icon.png'
        }
      },
      256: {
        options: { width: 256 },
        files: {
          '<%= config.tmp %>/images/icon-256.png': '<%= config.tmp %>/images/icon.png'
        }
      },
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.tmp %>/images',
          src: '*.{png,jpg,jpeg}',
          dest: '<%= config.tmp %>/images'
        }]
      }
    },
    template: {
        options: {
            'delimiters': 'handlebars-like-delimiters'
        },
        index: {
            options: {
                data: {
                   year: (new Date).getFullYear(),
                    key: 'original',
                    images: function() {
                        return require('fs').readdirSync(require('path').join(config.app, 'images', 'original')).reverse();
                    }
                },
            },
            files: {
                '<%= config.tmp %>/index.html': [
                    '<%= config.app %>/index.html'
                ]
            }
        },
        original: {
            options: {
                data: {
                  year: (new Date).getFullYear(),
                    key: 'original',
                    images: function() {
                        return require('fs').readdirSync(require('path').join(config.app, 'images', 'original')).reverse();
                    }
                },
            },
            files: {
                '<%= config.tmp %>/original.html': [
                    '<%= config.app %>/index.html'
                ]
            }
        },
        scrap: {
            options: {
                data: {
                 year: (new Date).getFullYear(),
                    key: 'scrap',
                    images: function() {
                        return require('fs').readdirSync(require('path').join(config.app, 'images', 'scrap')).reverse();
                    }
                },
            },
            files: {
                '<%= config.tmp %>/scrap.html': [
                    '<%= config.app %>/index.html'
                ]
            }
        }
    },
    useminPrepare: {
      html: '<%= config.tmp %>/*.html',
      options: {
        dest: '<%= config.tmp %>'
      }
    },
    usemin: {
      html: ['<%= config.tmp %>/*.html'],
      options: {
        dirs: ['<%= config.tmp %>']
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeComments: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.tmp %>',
          src: ['*.html'],
          dest: '<%= config.tmp %>'
        }]
      }
    },
    s3: {
      options: {
        key: process.env.AWS_ACCESS_KEY_ID,
        secret: process.env.AWS_SECRET_ACCESS_KEY,
        bucket: 'kinzal.net',
        access: 'public-read',
        region: 'ap-northeast-1'
      },
      deploy: {
        sync: [
          {
            options: { verify: true },
            src: '<%= config.dist %>/**/*',
            dest: '/',
            rel: '<%= config.dist %>'
          }
        ]
      }
    }
  });
  // task
  grunt.registerTask('test', [], function () {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.task.run([
      'jshint'
    ]);
  });
  grunt.registerTask('server', [], function () {
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-regarde');
    grunt.renameTask('regarde', 'watch');
    grunt.task.run([
      'template',
      'livereload-start',
      'connect',
      'open',
      'watch'
    ]);
  });
  grunt.registerTask('build', [], function() {
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-csso');
    grunt.loadNpmTasks('grunt-uncss');

    grunt.loadNpmTasks('grunt-image-resize');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.task.run([
      'clean',
      'bower:install',
      // javascript
      'copy:scripts',
      'replace:strict',
      'uglify',
      'concat:scripts',
      // css
      'uncss',
      'autoprefixer',
      'csso',
      // font
      'copy:fonts',
      // image
      'copy:images',
      'image_resize:favicon',
      'image_resize:57',
      'image_resize:76',
      'image_resize:120',
      'image_resize:152',
      'image_resize:256',
      'imagemin',
      // html
      'template',
      'useminPrepare',
      'usemin',
      'htmlmin',
      // dist
      'copy:dist'
    ]);
  });
  grunt.registerTask('publish', [], function () {
    grunt.loadNpmTasks('grunt-s3');
    grunt.task.run([
      'test',
      'build',
      's3'
    ]);
  });
};
