'use strict';

describe('-- Functions', function () {
	it('(function() {}) | ()', function () {
		expect('{0}'.format(function () {
			return 1;
		})).to.equal('1');

		expect('{0}'.format(
			function () {
				return 1;
			},
			function () {
				return 1;
			})).to.equal('1');

		expect('{0()}'.format(function () {
			return 1;
		})).to.equal('1');

		expect('{0()}{1()}'.format(
			function () {
				return 1;
			},
			function () {
				return 1;
			})).to.equal('11');

		expect('{0(1)}'.format(function (value) {
			return value;
		})).to.equal('1');

		expect('{0()()}'.format(function () {
			return function () {
				return 1;
			};
		})).to.equal('1');

		expect('{0(1)(2)}'.format(function (a) {
			return function (b) {
				return a + b;
			};
		})).to.equal('3');

		expect('{0()()[1]}'.format(function () {
			return function () {
				return [0, 1];
			};
		})).to.equal('1');

		expect('{0(1)(2)[1]}'.format(function (a) {
			return function (b) {
				return [0, a + b];
			};
		})).to.equal('3');

		expect('{0()()[1][1]}'.format(function () {
			return function () {
				return [0, [1, 2]];
			};
		})).to.equal('2');

		expect('{0(1)(2)[1][1]}'.format(function (a) {
			return function (b) {
				return [0, [1, a + b]];
			};
		})).to.equal('3');

		expect('{0(1)(2)[1][1]}:{1}'.format(function (a) {
			return function (b) {
				return [0, [1, a + b]];
			};
		}, 1)).to.equal('3:1');
	});
});