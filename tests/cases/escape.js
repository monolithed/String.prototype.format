/**
 * @author: Alexander Guinness <monolithed@gmail.com>
 * @date: 23.04.13 / 14:20
 */


// -- {{ }}

require('./../lib/suitest')

	.suite('{{', '{{'.format(null), '{')

	.suite('}}', '}}'.format(null), '}')

	.suite('{{}}', '{{}}'.format(null), '{}')

	.suite('{{x}}', '{{x}}'.format(null), '{x}')

	.suite('{{{0}}}', '{{{0}}}'.format(123), '{123}')

	.suite('{{{{0}}}}', '{{{{0}}}}'.format(null), '{{0}}')

	.suite('}}{{', '}}{{'.format(null), '}{')

	.suite('}}x{{', '}}x{{'.format(null), '}x{')

	.suite('}}x{{{{}}, {{, }}, {0}, {1}, {2[1]}', '}}x{{{{}}, {{, }}, {0}, {1}, {2[1]}'
		.format(1, 2, [0, 1]), '}x{{}, {, }, 1, 2, 1')


