/**
 * @author: Alexander Guinness <monolithed@gmail.com>
 * @date: 23.04.13 / 15:24
 */


// -- General cases

require('./../lib/suitest')

	// References first positional argument
	.suite('{0}', 'First, thou shalt count to {0}'.format(1),
		'First, thou shalt count to 1')

	// Interpolates multiple positional arguments
	.suite('{0}...', '{0}, you have {1} unread message{2}'.format('Holly', 2, 's'),
		'Holly, you have 2 unread messages')

	// Changed in version 2.7: The positional argument specifiers can be omitted,
	// so '{} {}' is equivalent to '{0} {1}'.

	// Implicitly references the first positional argument
	.suite('{}', 'Bring me a {}'.format(1), 'Bring me a 1')

	// Strips unmatched placeholders
	.suite('{}...', 'From {} to {}'.format(1), 'From 1 to undefined')

	// Does not allow explicit and implicit numbering to be intermingled
	// .suite('{}...{1}', '{} {1}'.format(1, 2), null)
	// .suite('{1}...{0}', '{1} {0}'.format(1, 2), null)

	// Format strings contain “replacement fields” surrounded by curly braces {}.
	// Anything that is not contained in braces is considered literal text,
	// which is copied unchanged to the output.
	// If you need to include a brace character in the literal text,
	// it can be escaped by doubling: {{ and}}.
	// replacement_field ::= "{" [field_name] ["!" conversion] [":" format_spec] "}"
	.suite('{{}}', '{{ {}: "{}"}}'.format('method', 'bar'), '{ method: "bar"}')

	// Supports property access via dot notation
	// field_name ::= arg_name ("." attribute_name | "[" element_index "]")*

	.suite('{0.property} single value','{0.method}'.format({method: 1}), '1')

	.suite('{0.property} multiple values', '{0.method} + {0.bar} = 3'
		.format({method: 1, bar: 2}), '1 + 2 = 3')

	.suite('{0.property} arguments with multiple values', '{0.method} + {1.bar} = 3'
		.format({method: 1}, {bar: 2}), '1 + 2 = 3')

	.suite('{0.property} arguments with multiple values and types', '{0.method} + {1.bar} = 3'
		.format({method: '1'}, {bar: 2}), '1 + 2 = 3')

	// Accepts a shorthand for properties of the first positional argument
	.suite('{property}', '{method} {bar}'
		.format({method: 1, bar: 2}), '1 2')

	// Accepts a shorthand for properties of the first positional argument
	// with multiple values and types
	.suite('{property} {1}', '{method} {bar} {1}'
		.format({method: 1, bar: 2}, '3'), '1 2 3')

	.suite('{property} is not overridable', '{method}'
		.format({method: 1}, {method: 2}), '1')

	// Invokes methods: without optional brackets
	.suite('{0.toLowerCase}', '{0.toLowerCase}'.format('FOO'), 'foo')

	.suite('{0.toLowerCase()}', '{0.toLowerCase()}'.format('FOO'), 'foo')

	.suite('{0.getFullYear}', '{0.getFullYear}'.format(new Date ('26 Apr 1984')), '1984')

	// Invokes methods: using brackets
	.suite('{0.charAt(1)}', '{0.charAt(1)}'.format('abc'), 'b')

	// Invokes methods: access to the return value by index
	.suite('{0.method()[1]}', '{0.method()[1]}'.format({method: function() {
		return [0, 2];
	}}), '2')

	.suite('{0.indexOf(0)}', '{0.indexOf(0)}'.format([0, 1]), 0)

	.suite('{pop}', '{pop}'.format(['one', 'two', 'three']), 'three')

	.suite('{pop}...', '{pop} {pop} {pop}'.format(['one', 'two', 'three']), 'three two one')

	// Keep any spaces
	.suite('\\s','   {}  '.format(1), '   1  ')

	.suite('()', '()'.format('1'), '()')

	.suite('.()', '.()'.format('1'), '.()')

	.suite('{{method()}}', '{{method()}}'.format('1'), '{method()}')

	.suite('{0.0}', '{0.0}'.format([0, 1]), '0')

