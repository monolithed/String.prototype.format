/**
 * @author: Alexander Guinness <monolithed@gmail.com>
 * @date: 23.04.13 / 15:17
 */

// -- array[0] ({array: [0]})

require('./../lib/suitest')

	.suite('{0[1]}', '{0[1]}'.format([0, 1]), '1')

	.suite('{0[ 1 ]}', '{0[ 1 ]}'.format([0, 1]), '1')

	.suite('{0["0"]}', '{0["0"]}'.format([1]), '1')

	.suite('{0[ "0" ]}', '{0[ "0" ]}'.format([1]), '1')

	.suite('{0[1]()}', '{0[1]()}'.format([0, function() {
		return 1;
	}]), '1')

	.suite('{0[1](1)}', '{0[1](1)}'.format([0, function(value) {
		return value;
	}]), '1')

	.suite('{0[1][0]()}', '{0[1][0]()}'.format([0, [function() {
		return 1;
	}]]), '1')

	.suite('{0[1][0](1)}', '{0[1][0](1)}'.format([0, [function(value) {
		return value;
	}]]), '1')

	.suite('{0[1]()[1]}', '{0[1]()[1]}'.format([0, function() {
		return [0, 1];
	}]), '1')

	.suite('{0[1](1)[1]}', '{0[1](1)[1]}'.format([0, function(value) {
		return [0, value];
	}]), '1')

	.suite('{0[1]()[1][1]}', '{0[1]()[1][1]}'.format([0, function() {
		return [0, [0, 1]];
	}]), '1')

	.suite('{0[1](1)[1][1]}', '{0[1](1)[1][1]}'.format([0, function(value) {
		return [0, [0, value]];
	}]), '1')

	.suite('{0[1]} {1[1]}', '{0[1]} {1[1]}'.format([0, 1], [0, 2]), '1 2')

	.suite('{0[1][1][1]}', '{0[1][1][1]}'.format([0, [0, [2, [3]]]]), '3')

	.suite('{0[1]...}', '{0[1](1)[1][1]}:{1[1][1][1]}:{2}:{3.method[1]}'.format([0, function(value) {
		return [0, [0, value]];
	}], [0, [0, [2, [3]]]], 2, {method: [0, [1]]}), '1:3:2:1')


