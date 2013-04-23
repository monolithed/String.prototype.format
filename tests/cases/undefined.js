/**
 * @author: Alexander Guinness <monolithed@gmail.com>
 * @date: 23.04.13 / 15:20
 */


// -- undefined, null and boolean values

require('./../lib/suitest')

.suite('{0}', '{0}'.format(0), '0')

.suite('{null}', '{0}'.format(null), 'null')

.suite('{undefined}', '{0}'.format(undefined), 'undefined')

.suite('{""}', '{0}'.format(''), '')

.suite('{true}', '{0}'.format(true), 'true')

.suite('{false}', '{0}'.format(false), 'false')

.suite('{Boolean}', '{0}'.format(Boolean), 'false')

.suite('{0, 0, 1, 0}', '{0}, {1}, {2}, {3}, {4}, {5}, {6}, {7}, {8}, {9}'
	.format(0, 0, 1, 0, null, undefined, '', true, false, Boolean), '0, 0, 1, 0, null, undefined, , true, false, false')
