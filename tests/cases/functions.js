/**
 * @author: Alexander Guinness <monolithed@gmail.com>
 * @date: 23.04.13 / 15:16
 */


// -- function (function() {})

require('./../lib/suitest')

	.suite('{function}', '{0}'.format(function() {
		return 1;
	}), '1')

	.suite('{function}...', '{0}'.format(
		function() {
			return 1;
		},
		function() {
			return 1;
		}), '1')

	.suite('{0()}', '{0()}'.format(function() {
		return 1;
	}), '1')

	.suite('{0()}...', '{0()}{1()}'.format(
		function() {
			return 1;
		},
		function() {
			return 1;
		}), '11')

	.suite('{0(x)}', '{0(1)}'.format(function(value) {
		return value;
	}), '1')

	.suite('{0()()}', '{0()()}'.format(function() {
		return function() {
			return 1;
		};
	}), '1')

	.suite('{0(x)(x)}', '{0(1)(2)}'.format(function(a) {
		return function(b) {
			return a + b;
		};
	}), '3')

	.suite('{0()()[1]}', '{0()()[1]}'.format(function() {
		return function() {
			return [0, 1];
		};
	}), '1')

	.suite('{0(1)(2)[1]}', '{0(1)(2)[1]}'.format(function(a) {
		return function(b) {
			return [0, a + b];
		};
	}), '3')

	.suite('{0()()[1][1]}', '{0()()[1][1]}'.format(function() {
		return function() {
			return [0, [1, 2]];
		};
	}), '2')

	.suite('{0(1)(2)[1][1]}', '{0(1)(2)[1][1]}'.format(function(a) {
		return function(b) {
			return [0, [1, a + b]];
		};
	}), '3')

	.suite('{0(1)(2)[1][1]}...', '{0(1)(2)[1][1]}:{1}'.format(function(a) {
		return function(b) {
			return [0, [1, a + b]];
		};
	}, 1), '3:1')
