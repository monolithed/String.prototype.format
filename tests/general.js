'use strict';

describe('-- General', function () {
	it('mixed', function () {
		// References first positional argument
		expect('First, thou shalt count to {0}'.format(1),
			'First, thou shalt count to 1');

		// Interpolates multiple positional arguments
		expect('{0}, you have {1} unread message{2}'.format('Holly', 2, 's'))
			.to.equal('Holly, you have 2 unread messages');

		// Changed in version 2.7: The positional argument specifiers can be omitted,
		// so '{} {}' is equivalent to '{0} {1}'.

		// Implicitly references the first positional argument
		expect('Bring me a {}'.format(1)).to.equal('Bring me a 1');

		// Strips unmatched placeholders
		expect('From {} to {}'.format(1)).to.equal('From 1 to undefined');

		// Does not allow explicit and implicit numbering to be intermingled
		// expect('{} {1}'.format(1, 2)).to.equal(null)
		// expect('{1} {0}'.format(1, 2)).to.equal(null)

		// Format strings contain “replacement fields” surrounded by curly braces {}.
		// Anything that is not contained in braces is considered literal text,
		// which is copied unchanged to the output.
		// If you need to include a brace character in the literal text,
		// it can be escaped by doubling: {{ and}}.
		// replacement_field ::= "{" [field_name] ["!" conversion] [":" format_spec] "}"
		expect('{{ {}: "{}"}}'.format('method', 'bar')).to.equal('{ method: "bar"}');

		// Supports property access via dot notation
		// field_name ::= arg_name ("." attribute_name | "[" element_index "]")*

		expect('{0.method}'.format({method: 1})).to.equal('1');

		expect('{0.method} + {0.bar} = 3'
			.format({method: 1, bar: 2})).to.equal('1 + 2 = 3');

		expect('{0.method} + {1.bar} = 3'
			.format({method: 1}, {bar: 2})).to.equal('1 + 2 = 3');

		expect('{0.method} + {1.bar} = 3'
			.format({method: '1'}, {bar: 2})).to.equal('1 + 2 = 3');

		// Accepts a shorthand for properties of the first positional argument
		expect('{method} {bar}'
			.format({method: 1, bar: 2})).to.equal('1 2');

		// Accepts a shorthand for properties of the first positional argument
		// with multiple values and types
		expect('{method} {bar} {1}'
			.format({method: 1, bar: 2}, '3')).to.equal('1 2 3');

		expect('{method}'
			.format({method: 1}, {method: 2})).to.equal('1');

		// Invokes methods: without optional brackets
		expect('{0.toLowerCase}'.format('FOO')).to.equal('foo');

		expect('{0.toLowerCase()}'.format('FOO')).to.equal('foo');

		expect('{0.getFullYear}'.format(new Date('26 Apr 1984'))).to.equal('1984');

		// Invokes methods: using brackets
		expect('{0.charAt(1)}'.format('abc')).to.equal('b');

		// Invokes methods: access to the return value by index
		expect('{0.method()[1]}'.format({
			method: function () {
				return [0, 2];
			}
		})).to.equal('2');

		expect('{0.indexOf(0)}'.format([0, 1])).to.equal('0');

		expect('{pop}'.format(['one', 'two', 'three'])).to.equal('three');

		expect('{pop} {pop} {pop}'.format(['one', 'two', 'three'])).to.equal('three two one');

		// Keep any spaces
		expect('   {}  '.format(1)).to.equal('   1  ');

		expect('()'.format('1')).to.equal('()');

		expect('.()'.format('1')).to.equal('.()');

		expect('{{method()}}'.format('1')).to.equal('{method()}');

		expect('{0.0}'.format([0, 1])).to.equal('0');
	});
});
