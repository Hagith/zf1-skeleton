'use strict';

var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};
var gateway = require('gateway');
var phpGateway = function (dir){
    return gateway(require('path').resolve(dir), {
        '.php': 'php-cgi'
    });
};

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        path: {
            app: 'application'
        },
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: [
                '<%= compass.options.cssDir %>/*.css'
            ]
        },
        compass: {
            options: {
                sassDir: '<%= path.app %>/assets/sass',
                imagesDir: '<%= path.app %>/assets/images',
                javascriptsDir: '<%= path.app %>/assets/js',
                fontsDir: '<%= path.app %>/assets/fonts',
                cssDir: 'public/assets/css',
                cacheDir: 'var/tmp/.sass',
                importPath: [
                    'vendor/'
                ]
            },
            dist: {
                options: {
                    outputStyle: 'compressed'
                }

            },
            dev: {
                options: {
                    outputStyle: 'expanded'
                }
            }
        },
        watch: {
            compass: {
                files: ['<%= path.app %>/assets/**/*.scss'],
                tasks: ['compass:dev']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= path.app %>/views/scripts/**/*.phtml',
                    '<%= path.app %>/layouts/scripts/**/*.phtml',
                    'public/assets/css/*.css'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            require('connect-livereload')(),
                            phpGateway('public'),
                            mountFolder(connect, '.')
                        ];
                    }
                }
            }
        }
    });

    grunt.registerTask('server', function (target) {
//        if (target === 'dist') {
//            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
//        }

        grunt.task.run([
//            'clean:server',
//            'coffee:dist',
//            'compass:server',
//            'livereload-start',
            'connect:livereload',
//            'open',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'compass:dist',
//        'useminPrepare',
//        'imagemin',
//        'htmlmin',
//        'concat',
//        'cssmin',
//        'uglify',
//        'copy',
//        'usemin'
    ]);
};
