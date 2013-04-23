/**
 * @author: Alexander Guinness <monolithed@gmail.com>
 * @date: 23.04.13 / 14:51
 */

require('../../String.prototype.format');
require('./Suitest/suitest.js');

var suitest = new Suitest;

suitest.suite = function(name, pattern, values) {
	return this.test(name, function(test) {
		test.exec.call(test, pattern, values)
			.done();
	});
};

module.exports = suitest;