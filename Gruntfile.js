'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        path: {
            app: 'application',
            assets: 'public',
            dist: 'dist'
        },
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            options: {
                sassDir: '<%= path.assets %>/sass',
                imagesDir: '<%= path.assets %>/images',
                javascriptsDir: '<%= path.assets %>/scripts',
                fontsDir: '<%= path.assets %>/fonts',
                cssDir: '<%= path.assets %>/css',
                cacheDir: 'var/cache/.sass',
                importPath: [
                    'vendor/bootstrap-sass/vendor/assets/stylesheets'
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
                files: ['<%= path.assets %>/sass/**/*.scss'],
                tasks: ['compass:dev']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= path.assets %>/css/*.css',
                    '<%= path.assets %>/scripts/**/*.js',
                    'application/layouts/scripts/**/*.phtml',
                    'application/views/scripts/**/*.phtml'
                ]
            }
        },
        clean: {
            dist: [
                '<%= compass.options.cssDir %>/*.css',
                '<%= compass.options.imagesDir %>/sprites/*.png',
                '<%= path.dist %>/**'
            ]
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '.',
                    dest: '<%= path.dist %>',
                    src: [
                        '**',
                        '.htaccess',
                        '!**/.*/**', // exclude dot folders
                        '!.bowerrc',
                        '!.zfproject.xml',
                        '!.git*',
                        '!*.json',
                        '!*.lock',
                        '!*.js',
                        '!*.iml',
                        '!<%= path.assets %>/sass/**',
                        '!application/configs/env.php',
                        '!docs/**',
                        '!nbproject/**',
                        '!node_modules/**',
                        '!<%= path.assets %>/shared/var/*',
                        '!var/cache/*',
                        '!var/log/*',
                        '!var/tmp/*',
//                        '!vendor/**/.*', // vendors dot files
                        '!vendor/**/tests/**',
                        '!vendor/**/test/**',
                        '!vendor/**/unitTests/**',
                        '!vendor/**/examples/**',
                        '!vendor/**/Examples/**',
                        '!vendor/**/demos/**',
                        '!vendor/**/documentation/**'
                    ]
                }]
            }
        },
        useminPrepare: {
            html: 'application/**/*.phtml',
            options: {
                root: '<%= path.dist %>',
                staging: 'var/tmp'
            }
        },
        usemin: {
            html: ['<%= path.dist %>/application/**/*.phtml']
        }
    });

    grunt.registerTask('build', [
        'clean:dist',
        'compass:dist',
        'copy:dist',
        'useminPrepare',
        'concat',
        'uglify',
        'usemin'
//        'imagemin',
//        'htmlmin',
    ]);

    grunt.registerTask('default', [
        'build'
    ]);

};
