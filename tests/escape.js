'use strict';

describe('-- Escape', function () {
	it('{{ }}', function () {
		expect('{{'.format(null)).to.equal('{');

		expect('}}'.format(null)).to.equal('}');

		expect('{{}}'.format(null)).to.equal('{}');

		expect('{{x}}'.format(null)).to.equal('{x}');

		expect('{{{0}}}'.format(123)).to.equal('{123}');

		expect('{{{{0}}}}'.format(null)).to.equal('{{0}}');

		expect('}}{{'.format(null)).to.equal('}{');

		expect('}}x{{'.format(null)).to.equal('}x{');

		expect('}}x{{{{}}, {{, }}, {0}, {1}, {2[1]}'
			.format(1, 2, [0, 1])).to.equal('}x{{}, {, }, 1, 2, 1');
	});
});
