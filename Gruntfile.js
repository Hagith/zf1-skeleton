'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        path: {
            app: 'application',
            public: 'public',
            dist: 'dist'
        },
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: [
                '<%= compass.options.cssDir %>/*.css',
                '<%= compass.options.imagesDir %>/sprites/*.png',
                '<%= path.dist %>/**'
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
                        '!<%= path.app %>/assets/sass/**',
                        '!<%= path.app %>/configs/env.php',
                        '!docs/**',
                        '!nbproject/**',
                        '!node_modules/**',
                        '!<%= path.public %>/shared/var/*',
                        '!var/cache/*',
                        '!var/log/*',
                        '!var/tmp/*',
                        '!vendor/**/.*', // vendors dot files
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
        'copy:dist'
//        'useminPrepare',
//        'imagemin',
//        'htmlmin',
//        'concat',
//        'cssmin',
//        'uglify',
//        'usemin'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};
