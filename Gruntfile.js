'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        path: {
            app: 'application'
        },
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            options: {
                config: 'compass.rb'
            },
            dist: {},
            dev: {
                options: {
                    debugInfo: true
                }
            }
        },
        watch: {
            compass: {
                files: ['<%= path.app %>/assets/**/*.scss'],
                tasks: ['compass:dev']
            }
        }
    });
};
