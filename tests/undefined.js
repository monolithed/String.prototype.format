'use strict';

describe('-- Undefined values', function () {
	it('undefined, null and boolean', function () {
		expect('{0}'.format(0)).to.equal('0');

		expect('{0}'.format(null)).to.equal('null');

		expect('{0}'.format(undefined)).to.equal('undefined');

		expect('{0}'.format('')).to.equal('');

		expect('{0}'.format(true)).to.equal('true');

		expect('{0}'.format(false)).to.equal('false');

		expect('{0}'.format(Boolean)).to.equal('false');

		expect('{0}, {1}, {2}, {3}, {4}, {5}, {6}, {7}, {8}, {9}'
			.format(0, 0, 1, 0, null, undefined, '', true, false, Boolean))
			.to.equal('0, 0, 1, 0, null, undefined, , true, false, false');
	});
});
