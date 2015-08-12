'use strict';

describe('-- arrays', function () {
	it('{array: []}', function () {
		expect('{0[1]}'.format([0, 1])).to.equal('1');

		expect('{0[1]}'.format([0, 1])).to.equal('1')

		expect('{0[ 1 ]}'.format([0, 1])).to.equal('1')

		expect('{0["0"]}'.format([1])).to.equal('1')

		expect('{0[ "0" ]}'.format([1])).to.equal('1')

		expect('{0[1]()}'.format([0, function () {
			return 1;
		}])).to.equal('1');

		expect('{0[1](1)}'.format([0, function (value) {
			return value;
		}])).to.equal('1');

		expect('{0[1][0]()}'.format([0, [function () {
			return 1;
		}]])).to.equal('1');

		expect('{0[1][0](1)}'.format([0, [function (value) {
			return value;
		}]])).to.equal('1');

		expect('{0[1]()[1]}'.format([0, function () {
			return [0, 1];
		}])).to.equal('1');

		expect('{0[1](1)[1]}'.format([0, function (value) {
			return [0, value];
		}])).to.equal('1');

		expect('{0[1]()[1][1]}'.format([0, function () {
			return [0, [0, 1]];
		}])).to.equal('1');

		expect('{0[1](1)[1][1]}'.format([0, function (value) {
			return [0, [0, value]];
		}])).to.equal('1');

		expect('{0[1]} {1[1]}'.format([0, 1], [0, 2])).to.equal('1 2');

		expect('{0[1][1][1]}'.format([0, [0, [2, [3]]]])).to.equal('3');

		expect('{0[1](1)[1][1]}:{1[1][1][1]}:{2}:{3.method[1]}'.format([0, function (value) {
			return [0, [0, value]];
		}], [0, [0, [2, [3]]]], 2, {method: [0, [1]]})).to.equal('1:3:2:1');
	});
});
