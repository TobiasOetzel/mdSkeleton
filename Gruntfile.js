'use strict';

module.exports = function(grunt) {

	grunt.initConfig({

		dir: {
			webapp: 'webapp',
			dist: 'dist',
			bower_components: 'bower_components',
			localServerTestUrl : 'http://localhost:8080/test-resources'
		},

		connect: {
			options: {
				port: 8080,
				hostname: '*'
			},
			src: {},
			dist: {}
		},

		openui5_connect: {
			options: {
				resources: [
					'<%= dir.bower_components %>/openui5/src/sap.ui.core/src',
					'<%= dir.bower_components %>/openui5/src/sap.m/src',
					'<%= dir.bower_components %>/openui5/src/sap.ui.layout/src',
					'<%= dir.bower_components %>/openui5/src/themelib_sap_bluecrystal/src'
				]
			},
			src: {
				options: {
					appresources: ['<%= dir.webapp %>'],
					testresources: [ '<%= dir.webapp %>/test']
				}
			},
			dist: {
				options: {
					appresources: '<%= dir.dist %>'
				}
			}
		},

		openui5_preload: {
			component: {
				options: {
					resources: {
						cwd: '<%= dir.webapp %>',
						prefix: 'todo'
					},
					dest: '<%= dir.dist %>'
				},
				components: true
			}
		},

		clean: {
			dist: '<%= dir.dist %>/'
		},

		copy: {
			dist: {
				files: [ {
					expand: true,
					cwd: '<%= dir.webapp %>',
					src: [
						'**',
						'!test/**'
					],
					dest: '<%= dir.dist %>'
				} ]
			}
		},

		eslint: {
			webapp: ['<%= dir.webapp %>']
		},

		qunit: {
			all: {
				options: {
					urls: [
						'<%= dir.localServerTestUrl %>/model/Device.qunit.html',
						'<%= dir.localServerTestUrl %>/model/MockableModel.qunit.html',
						'<%= dir.localServerTestUrl %>/util/formatter.qunit.html',
						'<%= dir.localServerTestUrl %>/NavigationJourney.qunit.html'
					]
				}
			}
		}

	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-openui5');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-contrib-qunit');

	// Server task
	grunt.registerTask('serve', function(target) {
		grunt.task.run('openui5_connect:' + (target || 'src') + ':keepalive');
	});

	// Linting task
	grunt.registerTask('lint', ['eslint']);

	// Build task
	grunt.registerTask('build', ['openui5_preload', 'copy']);


	grunt.registerTask('test', ['openui5_connect:src', 'qunit']);

	// Default task
	grunt.registerTask('default', [
		'lint',
		'clean',
		'build',
		'serve:dist'
	]);
};
