/*
 * grunt-dotnet-codecoverage
 * https://github.com/marcofranssen/grunt-dotnet-codecoverage
 *
 * Copyright (c) 2014 Marco Franssen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>',
            ],
            options: {
                jshintrc: '.jshintrc',
            },
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['reports'],
        },

        // Configuration to be run (and then tested).
        codecoverage: {
            options: {
                opencoverExe: 'test/src/packages/OpenCover.4.5.2316/OpenCover.Console.exe',
                reportGeneratorExe: 'test/src/packages/ReportGenerator.1.9.1.0/ReportGenerator.exe',
                target: 'test/src/packages/Machine.Specifications.0.6.2/tools/mspec-clr4.exe',
                output: 'reports/codecoverage',
                registerUser: true,
                reportTypes: ['html', 'xml'],
                filter: '+[MyCode]*',
                excludebyattribute: ['System.SerializableAttribute', 'System.SerializableAttribute'],
                targetargs: ['--xml ./reports/TestResults.xml', '--html ./reports/TestResults.html']
            },
            specs: {
                src: ['test/src/**/bin/Debug/*Specs.dll']
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js'],
        },

        // restore nuget package for test project
        shell: {
            nuget: {
                options: {
                    stdout: true,
                    execOptions: {
                        cwd: 'test/src'
                    }
                },
                command: 'nuget restore'
            }
        },

        // msbuild to build the test project
        msbuild: {
            src: ['test/**/*.csproj'],
            options: {
                projectConfiguration: 'Debug',
                targets: ['Clean', 'Rebuild'],
                stdout: true,
                maxCpuCount: 4,
                buildParameters: {
                    WarningLevel: 4
                },
                verbosity: 'quiet'
            }
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-msbuild');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'shell:nuget', 'msbuild', 'codecoverage', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
