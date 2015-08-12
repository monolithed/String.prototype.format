'use strict';

describe('-- Methods', function () {
	it('.method', function () {

		expect('{0.method[1]}'.format({method: [0, 1]})).to.equal('1');

		expect('{0.method[0]()}'.format({
			method: [function () {
				return 1;
			}]
		})).to.equal('1');

		expect('{0.method[0](1)}'.format({
			method: [function (value) {
				return value;
			}]
		})).to.equal('1');

		expect('{0.method[0](1)(2)}'.format({
			method: [function (a) {
				return function (b) {
					return a + b;
				};
			}]
		})).to.equal('3');

		expect('{0. method [ 0 ] ( 1 ) ( 2 )}'.format({
			method: [function (a) {
				return function (b) {
					return a + b;
				};
			}]
		})).to.equal('3');

		expect('{0.method[0](1, 2)}'.format({
			method: [function (a, b) {
				return a + b;
			}]
		})).to.equal('3');

		expect('{0.method[1]} + {1.method2[1]} = 2'
			.format({method: [0, 1]}, {method2: [0, 1]}, 2)).to.equal('1 + 1 = 2');

		// -- { object.method[0]}

		expect('{object.method[1]}'.format({
			object: {
				method: [0, 1]
			}
		})).to.equal('1');

		expect('{object.method[0]()}'.format({
			object: {
				method: [function () {
					return 1;
				}]
			}
		})).to.equal('1');

		expect('{object.method[0](1)}'.format({
			object: {
				method: [function (value) {
					return value;
				}]
			}
		})).to.equal('1');

		expect('{object.method[0](1)(2)}'.format({
			object: {
				method: [function (a) {
					return function (b) {
						return a + b;
					};
				}]
			}
		})).to.equal('3');

		expect('{object.method[0](1, 2)}'.format({
			object: {
				method: [function (a, b) {
					return a + b;
				}]
			}
		})).to.equal('3');

		expect('{object.method[1]} + {object2.method[1]} = 2'
			.format({
				object : {
					method: [0, 1]
				},
				object2: {
					method: [0, 1]
				}
			}, 2)).to.equal('1 + 1 = 2');

		// -- position.method ({method: function() {}})
		expect('{0.method()}'.format({
			method: function () {
				return 1;
			}
		})).to.equal('1');

		expect('{0.method(1)}'.format({
			method: function (value) {
				return value;
			}
		})).to.equal('1');

		expect('{0.method(1, 2)}'.format({
			method: function (a, b) {
				return a + b;
			}
		})).to.equal('3');

		expect('{0.method()()}'.format({
			method: function () {
				return function () {
					return 1;
				};
			}
		})).to.equal('1');

		expect('{0.method(1)(2)}'.format({
			method: function (a) {
				return function (b) {
					return a + b;
				};
			}
		})).to.equal('3');

		expect('{0.method(1, 2)(3, 4)}'.format({
			method: function (a, b) {
				return function (c, d) {
					return a + b + c + d;
				};
			}
		})).to.equal('10');

		expect('{0.method()[1]}'.format({
			method: function () {
				return [0, 1];
			}
		})).to.equal('1');

		expect('{0.method(1)[1]}'.format({
			method: function (value) {
				return [0, value];
			}
		})).to.equal('1');

		expect('{0.method()()[1]}'.format({
			method: function () {
				return function () {
					return [0, 1];
				};
			}
		})).to.equal('1');

		expect('{0.method(0)(1)[1]}'.format({
			method: function (a) {
				return function (b) {
					return [0, a + b];
				};
			}
		})).to.equal('1');

		expect('{0.method()[0][1]}'.format({
			method: function () {
				return [[0, 1]];
			}
		})).to.equal('1');

		expect('{0.method(1)[0][1]}'.format({
			method: function (value) {
				return [[0, value]];
			}
		})).to.equal('1');

		expect('{0.method()()[0][1]}'.format({
			method: function () {
				return function () {
					return [[0, 1]];
				};
			}
		})).to.equal('1');

		expect('{0.method(0)(1)[0][1]}'.format({
			method: function (a) {
				return function (b) {
					return [[0, a + b]];
				};
			}
		})).to.equal('1');

		expect('{0.method(0)(1)[0][1]()}'.format({
			method: function (a) {
				return function (b) {
					return [[0, function () {
						return a + b;
					}]];
				};
			}
		})).to.equal('1');

		expect('{0.method(0)(1)[0][1](1)}'.format({
			method: function (a) {
				return function (b) {
					return [[0, function (c) {
						return a + b + c;
					}]];
				};
			}
		})).to.equal('2');

		expect('{0.method(0)(1)[0][1](1, 2)}'.format({
			method: function (a) {
				return function (b) {
					return [[0, function (c, d) {
						return a + b + c + d;
					}]];
				};
			}
		})).to.equal('4');

		// -- method ({method: function() {}})
		expect('{method()}'.format({
			method: function () {
				return 1;
			}
		})).to.equal('1');

		expect('{method(1)}'.format({
			method: function (value) {
				return 1 + value;
			}
		})).to.equal('2');

		expect('{method(1, 2)}'.format({
			method: function (a, b) {
				return a + b;
			}
		})).to.equal('3');

		expect('{method()()}'.format({
			method: function () {
				return function () {
					return 1;
				};
			}
		})).to.equal('1');

		expect('{method()()[1]}'.format({
			method: function () {
				return function () {
					return [0, 1];
				};
			}
		})).to.equal('1');

		expect('{method()()[1][0]}'.format({
			method: function () {
				return function () {
					return [0, [1]];
				};
			}
		})).to.equal('1');

		expect('{method(0)(1)[1][0]}'.format({
			method: function (a) {
				return function (b) {
					return [0, [a + b]];
				};
			}
		})).to.equal('1');

		expect('{method(0, 2)(1, 2)[1][0]}'.format({
			method: function (a, b) {
				return function (c, d) {
					return [0, [a + b + c + d]];
				};
			}
		})).to.equal('5');

		// -- method ({method: function() {}})
		expect('{object.method}'.format({
			object: {
				method: 1
			}
		})).to.equal('1');

		expect('{object.method}'.format({
			object: {
				method: function () {
					return 1;
				}
			}
		})).to.equal('1');

		expect('{object.method(1)}'.format({
			object: {
				method: function (value) {
					return value;
				}
			}
		})).to.equal('1');

		expect('{object.method(1, 2)}'.format({
			object: {
				method: function (a, b) {
					return a + b;
				}
			}
		})).to.equal('3');

		expect('{object.method()()}'.format({
			object: {
				method: function () {
					return function () {
						return 1;
					};
				}
			}
		})).to.equal('1');

		expect('{object.method(0, 1)(1, 2)}'.format({
			object: {
				method: function (a, b) {
					return function (c, d) {
						return a + b + c + d;
					};
				}
			}
		})).to.equal('4');

		expect('{object.method()[1]}'.format({
			object: {
				method: function () {
					return [0, 1];
				}
			}
		})).to.equal('1');

		expect('{object.method(1)[1]}'.format({
			object: {
				method: function (a) {
					return [0, a];
				}
			}
		})).to.equal('1');

		expect('{object.method()()[1]}'.format({
			object: {
				method: function () {
					return function () {
						return [0, 1];
					}
				}
			}
		})).to.equal('1');

		expect('{object.method(0)(1)[1]}'.format({
			object: {
				method: function (a) {
					return function (b) {
						return [0, a + b];
					}
				}
			}
		})).to.equal('1');

		expect('{object.method(0, 1)(1, 2)[1]}'.format({
			object: {
				method: function (a, b) {
					return function (c, d) {
						return [0, a + b + c + d];
					}
				}
			}
		})).to.equal('4');

		expect('{object.method()[1][0]}'.format({
			object: {
				method: function () {
					return [0, [1]];
				}
			}
		})).to.equal('1');

		expect('{object.method(1)[1][0]}'.format({
			object: {
				method: function (a) {
					return [0, [a]];
				}
			}
		})).to.equal('1');

		expect('{object.method()()[1][0]}'.format({
			object: {
				method: function () {
					return function () {
						return [0, [1]];
					}
				}
			}
		})).to.equal('1');

		expect('{object.method(1)(2)[1][0]}'.format({
			object: {
				method: function (a) {
					return function (b) {
						return [0, [a + b]];
					}
				}
			}
		})).to.equal('3');

		expect('{object.method(1, 2)(2, 3)[1][0]}'.format({
			object: {
				method: function (a, b) {
					return function (c, d) {
						return [0, [a + b + c + d]];
					}
				}
			}
		})).to.equal('8');

		expect('{object.method()()[1][0]()}'.format({
			object: {
				method: function () {
					return function () {
						return [0, [function () {
							return 1;
						}]];
					}
				}
			}
		})).to.equal('1');

		expect('{object.method(1)(2)[1][0](1)}'.format({
			object: {
				method: function (a) {
					return function (b) {
						return [0, [function (c) {
							return a + b + c;
						}]];
					}
				}
			}
		})).to.equal('4');

		expect('{object.method(1)(2)[1][0](1, 2)}'.format({
			object: {
				method: function (a) {
					return function (b) {
						return [0, [function (c, d) {
							return a + b + c + d;
						}]];
					}
				}
			}
		})).to.equal('6');

		// -- position.method ({method: function() {}})
		expect('{0.object.method}'.format({
			object: {
				method: 1
			}
		})).to.equal('1');

		expect('{0.object.method}'.format({
			object: {
				method: function () {
					return 1;
				}
			}
		})).to.equal('1');

		expect('{0.object.method(1)}'.format({
			object: {
				method: function (value) {
					return value;
				}
			}
		})).to.equal('1');

		expect('{0.object.method(1, 2)}'.format({
			object: {
				method: function (a, b) {
					return a + b;
				}
			}
		})).to.equal('3');

		expect('{0.object.method()()}'.format({
			object: {
				method: function () {
					return function () {
						return 1;
					};
				}
			}
		})).to.equal('1');

		expect('{0.object.method(0, 1)(1, 2)}'.format({
			object: {
				method: function (a, b) {
					return function (c, d) {
						return a + b + c + d;
					};
				}
			}
		})).to.equal('4');

		expect('{0.object.method()[1]}'.format({
			object: {
				method: function () {
					return [0, 1];
				}
			}
		})).to.equal('1');

		expect('{0.object.method(1)[1]}'.format({
			object: {
				method: function (a) {
					return [0, a];
				}
			}
		})).to.equal('1');

		expect('{0.object.method()()[1]}'.format({
			object: {
				method: function () {
					return function () {
						return [0, 1];
					}
				}
			}
		})).to.equal('1');

		expect('{0.object.method(0)(1)[1]}'.format({
			object: {
				method: function (a) {
					return function (b) {
						return [0, a + b];
					}
				}
			}
		})).to.equal('1');

		expect('{0.object.method(0, 1)(1, 2)[1]}'.format({
			object: {
				method: function (a, b) {
					return function (c, d) {
						return [0, a + b + c + d];
					}
				}
			}
		})).to.equal('4');

		expect('{object.method()[1][0]}'.format({
			object: {
				method: function () {
					return [0, [1]];
				}
			}
		})).to.equal('1');

		expect('{0.object.method(1)[1][0]}'.format({
			object: {
				method: function (a) {
					return [0, [a]];
				}
			}
		})).to.equal('1');

		expect('{0.object.method()()[1][0]}'.format({
			object: {
				method: function () {
					return function () {
						return [0, [1]];
					}
				}
			}
		})).to.equal('1');

		expect('{0.object.method(1)(2)[1][0]}'.format({
			object: {
				method: function (a) {
					return function (b) {
						return [0, [a + b]];
					}
				}
			}
		})).to.equal('3');

		expect('{0.object.method(1, 2)(2, 3)[1][0]}'.format({
			object: {
				method: function (a, b) {
					return function (c, d) {
						return [0, [a + b + c + d]];
					}
				}
			}
		})).to.equal('8');

		expect('{0.object.method()()[1][0]()}'.format({
			object: {
				method: function () {
					return function () {
						return [0, [function () {
							return 1;
						}]];
					}
				}
			}
		})).to.equal('1');

		expect('{0.object.method(1)(2)[1][0](1)}'.format({
			object: {
				method: function (a) {
					return function (b) {
						return [0, [function (c) {
							return a + b + c;
						}]];
					}
				}
			}
		})).to.equal('4');

		expect('{0.object.method(1)(2)[1][0](1, 2)}'.format({
			object: {
				method: function (a) {
					return function (b) {
						return [0, [function (c, d) {
							return a + b + c + d;
						}]];
					}
				}
			}
		})).to.equal('6');

		expect('{0}'.format(function () {
			return 1;
		})).to.equal('1');
	});
});
