/**
 * @author: Alexander Guinness <monolithed@gmail.com>
 * @date: 23.04.13 / 15:19
 */


// -- { 0.method[0]}

require('./../lib/suitest')

	.suite('{0.method[0]}', '{0.method[1]}'.format({method: [0, 1]}), '1')

	.suite('{0.method[0]()}', '{0.method[0]()}'.format({method: [function() {
		return 1;
	}]}), '1')

	.suite('{0.method[0](1)}', '{0.method[0](1)}'.format({method: [function(value) {
		return value;
	}]}), '1')

	.suite('{0.method[0](1)(2)}', '{0.method[0](1)(2)}'.format({method: [function(a) {
		return function(b) {
			return a + b;
		};
	}]}), '3')

	.suite('{0. method [ 0 ] ( 1 ) ( 2 )}', '{0. method [ 0 ] ( 1 ) ( 2 )}'.format({method: [function(a) {
		return function(b) {
			return a + b;
		};
	}]}), '3')

	.suite('{0.method[0](1, 2)}', '{0.method[0](1, 2)}'.format({method: [function(a, b) {
		return a + b;
	}]}), '3')

	.suite('{0.method[0]...}', '{0.method[1]} + {1.method2[1]} = 2'
			.format({method: [0, 1]}, {method2: [0, 1]}, 2), '1 + 1 = 2')


	// -- { object.method[0]}

	.suite('{object.method[0]}', '{object.method[1]}'.format({
		object: {
			method: [0, 1]
		}
	}), '1')

	.suite('{object.method[0]()}', '{object.method[0]()}'.format({
		object: {
			method: [function() {
				return 1;
			}]
		}}), '1')

	.suite('{object.method[0](1)}', '{object.method[0](1)}'.format({
		object: {
			method: [function(value) {
				return value;
			}]
		}}), '1')

	.suite('{object.method[0](1)(2)}', '{object.method[0](1)(2)}'.format({
		object: {
			method: [function(a) {
				return function(b) {
					return a + b;
				};
			}]
		}}), '3')

	.suite('{object.method[0](1, 2)}', '{object.method[0](1, 2)}'.format({
		object: {
			method: [function(a, b) {
				return a + b;
			}]
		}}), '3')

	.suite('{object.method[0]...}', '{object.method[1]} + {object2.method[1]} = 2'
		.format({
			object: {
				method: [0, 1]
			},
			object2: {
				method: [0, 1]
			}
		}, 2), '1 + 1 = 2')


	// -- position.method ({method: function() {}})

	.suite('{0.method()}',
		'{0.method()}'.format({method: function() {
			return 1;
		}}), '1')

	.suite('{0.method(1)}',
		'{0.method(1)}'.format({method: function(value) {
			return value;
		}}), '1')

	.suite('{0.method(1, 2)}',
		'{0.method(1, 2)}'.format({method: function(a, b) {
			return a + b;
		}}), '3')

	.suite('{0.method()()}',
		'{0.method()()}'.format({method: function() {
			return function() {
				return 1;
			};
		}}), '1')

	.suite('{0.method(1)(2)}',
		'{0.method(1)(2)}'.format({method: function(a) {
			return function(b) {
				return a + b;
			};
		}}), '3')

	.suite('{0.method(1, 2)(3, 4)}',
		'{0.method(1, 2)(3, 4)}'.format({method: function(a, b) {
			return function(c, d) {
				return a + b + c + d;
			};
		}}), '10')

	.suite('{0.method()[1]}',
		'{0.method()[1]}'.format({method: function() {
			return [0, 1];
		}}), '1')

	.suite('{0.method(1)[1]}',
		'{0.method(1)[1]}'.format({method: function(value) {
			return [0, value];
		}}), '1')

	.suite('{0.method()()[1]}',
		'{0.method()()[1]}'.format({method: function() {
			return function() {
				return [0, 1];
			};
		}}), '1')

	.suite('{0.method(1)(1)[1]}',
		'{0.method(0)(1)[1]}'.format({method: function(a) {
			return function(b) {
				return [0, a + b];
			};
		}}), '1')

	.suite('{0.method()[0][1]}',
		'{0.method()[0][1]}'.format({method: function() {
			return [[0, 1]];
		}}), '1')

	.suite('{0.method(1)[0][1]}',
		'{0.method(1)[0][1]}'.format({method: function(value) {
			return [[0, value]];
		}}), '1')

	.suite('{0.method()()[0][1]}',
		'{0.method()()[0][1]}'.format({method: function() {
			return function() {
				return [[0, 1]];
			};
		}}), '1')

	.suite('{0.method(0)(1)[0][1]}',
		'{0.method(0)(1)[0][1]}'.format({method: function(a) {
			return function(b) {
				return [[0, a + b]];
			};
		}}), '1')

	.suite('{0.method(0)(1)[0][1]}',
		'{0.method(0)(1)[0][1]()}'.format({method: function(a) {
			return function(b) {
				return [[0, function() {
					return a + b;
				}]];
			};
		}}), '1')

	.suite('{0.method(0)(1)[0][1]}',
		'{0.method(0)(1)[0][1](1)}'.format({method: function(a) {
			return function(b) {
				return [[0, function(c) {
					return a + b + c;
				}]];
			};
		}}), '2')

	.suite('{0.method(0)(1)[0][1]}',
		'{0.method(0)(1)[0][1](1, 2)}'.format({method: function(a) {
			return function(b) {
				return [[0, function(c, d) {
					return a + b + c + d;
				}]];
			};
		}}), '4')


	// -- method ({method: function() {}})

	.suite('{0.method()}',
		'{method()}'.format({method: function() {
			return 1;
		}}), '1')

	.suite('{method(1)}',
		'{method(1)}'.format({method: function(value) {
			return 1 + value;
		}}), '2')

	.suite('{method(1, 2)}',
		'{method(1, 2)}'.format({method: function(a, b) {
			return a + b;
		}}), '3')

	.suite('{method()()}',
		'{method()()}'.format({method: function() {
			return function() {
				return 1;
			};
		}}), '1')

	.suite('{method()()[1]}',
		'{method()()[1]}'.format({method: function() {
			return function() {
				return [0, 1];
			};
		}}), '1')

	.suite('{method()()[1][0]}',
		'{method()()[1][0]}'.format({method: function() {
			return function() {
				return [0, [1]];
			};
		}}), '1')


	.suite('{method(0)(1)[1][0]}',
		'{method(0)(1)[1][0]}'.format({method: function(a) {
			return function(b) {
				return [0, [a + b]];
			};
		}}), '1')

	.suite('{method(0, 1)(1, 2)[1][0]}',
		'{method(0, 2)(1, 2)[1][0]}'.format({method: function(a, b) {
			return function(c, d) {
				return [0, [a + b + c + d]];
			};
		}}), '5')


	// -- method ({method: function() {}})

	.suite('{object.method}',
		'{object.method}'.format({object: {
			method: 1
		}}), '1')

	.suite('{object.method()}',
		'{object.method}'.format({object: {
			method: function() {
				return 1;
			}
		}}), '1')

	.suite('{object.method(1)}',
		'{object.method(1)}'.format({object: {
			method: function(value) {
				return value;
			}
		}}), '1')

	.suite('{object.method(1, 2)}',
		'{object.method(1, 2)}'.format({object: {
			method: function(a, b) {
				return a + b;
			}
		}}), '3')

	.suite('{object.method()()}',
		'{object.method()()}'.format({object: {
			method: function() {
				return function() {
					return 1;
				};
			}
		}}), '1')

	.suite('{object.method(0, 1)(1, 2)}',
		'{object.method(0, 1)(1, 2)}'.format({object: {
			method: function(a, b) {
				return function(c, d) {
					return a + b + c + d;
				};
			}
		}}), '4')

	.suite('{object.method()[0]}',
		'{object.method()[1]}'.format({object: {
			method: function(){
				return [0, 1];
			}
		}}), '1')

	.suite('{object.method(1)[1]}',
		'{object.method(1)[1]}'.format({object: {
			method: function(a) {
				return [0, a];
			}
		}}), '1')

	.suite('{object.method()()[1]}',
		'{object.method()()[1]}'.format({object: {
			method: function() {
				return function() {
					return [0, 1];
				}
			}
		}}), '1')

	.suite('{object.method()()[1]}',
		'{object.method(0)(1)[1]}'.format({object: {
			method: function(a) {
				return function(b) {
					return [0, a + b];
				}
			}
		}}), '1')

	.suite('{object.method()()[1]}',
		'{object.method(0, 1)(1, 2)[1]}'.format({object: {
			method: function(a, b) {
				return function(c, d) {
					return [0, a + b + c + d];
				}
			}
		}}), '4')

	.suite('{object.method()[1][0]}',
		'{object.method()[1][0]}'.format({object: {
			method: function() {
				return [0, [1]];
			}
		}}), '1')

	.suite('{object.method()[1][0]}',
		'{object.method(1)[1][0]}'.format({object: {
			method: function(a) {
				return [0, [a]];
			}
		}}), '1')

	.suite('{object.method()()[1][0]}',
		'{object.method()()[1][0]}'.format({object: {
			method: function() {
				return function() {
					return [0, [1]];
				}
			}
		}}), '1')

	.suite('{object.method()()[1][0]}',
		'{object.method(1)(2)[1][0]}'.format({object: {
			method: function(a) {
				return function(b) {
					return [0, [a + b]];
				}
			}
		}}), '3')

	.suite('{object.method()()[1][0]}',
		'{object.method(1, 2)(2, 3)[1][0]}'.format({object: {
			method: function(a, b) {
				return function(c, d) {
					return [0, [a + b + c + d]];
				}
			}
		}}), '8')

	.suite('{object.method()()[1][0]}',
		'{object.method()()[1][0]()}'.format({object: {
			method: function() {
				return function() {
					return [0, [function() {
						return 1;
					}]];
				}
			}
		}}), '1')

	.suite('{object.method()()[1][0]}',
		'{object.method(1)(2)[1][0](1)}'.format({object: {
			method: function(a) {
				return function(b) {
					return [0, [function(c) {
						return a + b + c;
					}]];
				}
			}
		}}), '4')

	.suite('{object.method()()[1][0]}',
		'{object.method(1)(2)[1][0](1, 2)}'.format({object: {
			method: function(a) {
				return function(b) {
					return [0, [function(c, d) {
						return a + b + c + d;
					}]];
				}
			}
		}}), '6')

	// -- position.method ({method: function() {}})

	.suite('{0.method}',
		'{0.object.method}'.format({object: {
			method: 1
		}}), '1')

	.suite('{0.object.method()}',
		'{0.object.method}'.format({object: {
			method: function() {
				return 1;
			}
		}}), '1')

	.suite('{0.object.method(1)}',
		'{0.object.method(1)}'.format({object: {
			method: function(value) {
				return value;
			}
		}}), '1')

	.suite('{0.object.method(1, 2)}',
		'{0.object.method(1, 2)}'.format({object: {
			method: function(a, b) {
				return a + b;
			}
		}}), '3')

	.suite('{0.object.method()()}',
		'{0.object.method()()}'.format({object: {
			method: function() {
				return function() {
					return 1;
				};
			}
		}}), '1')

	.suite('{0.object.method(0, 1)(1, 2)}',
		'{0.object.method(0, 1)(1, 2)}'.format({object: {
			method: function(a, b) {
				return function(c, d) {
					return a + b + c + d;
				};
			}
		}}), '4')

	.suite('{0.object.method()[0]}',
		'{0.object.method()[1]}'.format({object: {
			method: function(){
				return [0, 1];
			}
		}}), '1')

	.suite('{0.object.method(1)[1]}',
		'{0.object.method(1)[1]}'.format({object: {
			method: function(a) {
				return [0, a];
			}
		}}), '1')

	.suite('{0.object.method()()[1]}',
		'{0.object.method()()[1]}'.format({object: {
			method: function() {
				return function() {
					return [0, 1];
				}
			}
		}}), '1')

	.suite('{object.method()()[1]}',
		'{0.object.method(0)(1)[1]}'.format({object: {
			method: function(a) {
				return function(b) {
					return [0, a + b];
				}
			}
		}}), '1')

	.suite('{0.object.method()()[1]}',
		'{0.object.method(0, 1)(1, 2)[1]}'.format({object: {
			method: function(a, b) {
				return function(c, d) {
					return [0, a + b + c + d];
				}
			}
		}}), '4')

	.suite('{object.method()[1][0]}',
		'{object.method()[1][0]}'.format({object: {
			method: function() {
				return [0, [1]];
			}
		}}), '1')

	.suite('{0.object.method()[1][0]}',
		'{0.object.method(1)[1][0]}'.format({object: {
			method: function(a) {
				return [0, [a]];
			}
		}}), '1')

	.suite('{0.object.method()()[1][0]}',
		'{0.object.method()()[1][0]}'.format({object: {
			method: function() {
				return function() {
					return [0, [1]];
				}
			}
		}}), '1')

	.suite('{0.object.method()()[1][0]}',
		'{0.object.method(1)(2)[1][0]}'.format({object: {
			method: function(a) {
				return function(b) {
					return [0, [a + b]];
				}
			}
		}}), '3')

	.suite('{0.object.method()()[1][0]}',
		'{0.object.method(1, 2)(2, 3)[1][0]}'.format({object: {
			method: function(a, b) {
				return function(c, d) {
					return [0, [a + b + c + d]];
				}
			}
		}}), '8')

	.suite('{0.object.method()()[1][0]}',
		'{0.object.method()()[1][0]()}'.format({object: {
			method: function() {
				return function() {
					return [0, [function() {
						return 1;
					}]];
				}
			}
		}}), '1')

	.suite('{0.object.method()()[1][0]}',
		'{0.object.method(1)(2)[1][0](1)}'.format({object: {
			method: function(a) {
				return function(b) {
					return [0, [function(c) {
						return a + b + c;
					}]];
				}
			}
		}}), '4')

	.suite('{0.object.method()()[1][0]}',
		'{0.object.method(1)(2)[1][0](1, 2)}'.format({object: {
			method: function(a) {
				return function(b) {
					return [0, [function(c, d) {
						return a + b + c + d;
					}]];
				}
			}
		}}), '6')

	.suite('{0}', '{0}'.format(function() {
			return 1;
		}), '1')




