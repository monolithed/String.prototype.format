'use strict';

module.exports = function (grunt, options) {
	var timeout = 100 * 1000;

	return {
		options: {
			basePath  : './',
			frameworks: ['mocha', 'chai'],

			files: [
				'index.js',
				'tests/**/*.js'
			],

			client: {
				useFrame: true,

				mocha: {
					reporter: 'html',
					ui      : 'bdd',
					timeout : 10 * 1000,
				}
			},

			logLevel : 'INFO',
			colors   : true,
			singleRun: true,
			autoWatch: false
		},

		test: {
			options: {
				browsers : ['PhantomJS'],
				reporters: ['mocha', 'progress'],
			}
		}
	};
};
