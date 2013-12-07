'use strict';

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
                files: ['<%= path.app %>/assets/sass/**/*.scss'],
                tasks: ['compass:dev']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= path.app %>/assets/scripts/**/*.js',
                    '<%= path.app %>/layouts/scripts/**/*.phtml',
                    '<%= path.app %>/views/scripts/**/*.phtml',
                    'public/assets/css/*.css'
                ]
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
            'compass:dev',
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
