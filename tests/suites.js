var Suitest = require('./Suitest/suitest.js');
require('../String.prototype.format.js');

void function() {
	var suitest = new Suitest;

	suitest.suite = function(name, pattern, values) {
		return this.test(name, function(test) {
			test.exec.call(test, pattern, values)
				.done();
		});
	};

	// Suite cases
	suitest

		// -- General cases

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

		.suite('()', '.()'.format('1'), '.()')

		.suite('()', '{{method()}}'.format('1'), '{method()}')

		.suite('()', '{0.0}'.format([0, 1]), '0')

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


		// -- undefined, null and boolean values
		.suite('{0}', '{0}'.format(0), '0')

		.suite('{null}', '{0}'.format(null), 'null')

		.suite('{undefined}', '{0}'.format(undefined), 'undefined')

		.suite('{""}', '{0}'.format(''), '')

		.suite('{true}', '{0}'.format(true), 'true')

		.suite('{false}', '{0}'.format(false), 'false')

		.suite('{Boolean}', '{0}'.format(Boolean), 'false')

		.suite('{0, 0, 1, 0}', '{0}, {1}, {2}, {3}, {4}, {5}, {6}, {7}, {8}, {9}'
			.format(0, 0, 1, 0, null, undefined, '', true, false, Boolean), '0, 0, 1, 0, null, undefined, , true, false, false')

		// -- { 0.method[0]}

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


		// -- array[0] ({array: [0]})

		.suite('{0[1]}', '{0[1]}'.format([0, 1]), '1')

		.suite('{0[ 1 ]}', '{0[ 1 ]}'.format([0, 1]), '1')

		.suite('{0["0"]}', '{0["0"]}'.format([1]), '1')

		.suite('{0[ "0" ]}', '{0[ "0" ]}'.format([1]), '1')

		.suite('{0[1]()}', '{0[1]()}'.format([0, function() {
			return 1;
		}]), '1')

		.suite('{0[1](1)}', '{0[1](1)}'.format([0, function(value) {
			return value;
		}]), '1')

		.suite('{0[1][0]()}', '{0[1][0]()}'.format([0, [function() {
			return 1;
		}]]), '1')

		.suite('{0[1][0](1)}', '{0[1][0](1)}'.format([0, [function(value) {
			return value;
		}]]), '1')

		.suite('{0[1]()[1]}', '{0[1]()[1]}'.format([0, function() {
			return [0, 1];
		}]), '1')

		.suite('{0[1](1)[1]}', '{0[1](1)[1]}'.format([0, function(value) {
			return [0, value];
		}]), '1')

		.suite('{0[1]()[1][1]}', '{0[1]()[1][1]}'.format([0, function() {
			return [0, [0, 1]];
		}]), '1')

		.suite('{0[1](1)[1][1]}', '{0[1](1)[1][1]}'.format([0, function(value) {
			return [0, [0, value]];
		}]), '1')

		.suite('{0[1]} {1[1]}', '{0[1]} {1[1]}'.format([0, 1], [0, 2]), '1 2')

		.suite('{0[1][1][1]}', '{0[1][1][1]}'.format([0, [0, [2, [3]]]]), '3')

		.suite('{0[1]...}', '{0[1](1)[1][1]}:{1[1][1][1]}:{2}:{3.method[1]}'.format([0, function(value) {
			return [0, [0, value]];
		}], [0, [0, [2, [3]]]], 2, {method: [0, [1]]}), '1:3:2:1')


		// -- function (function() {})

		.suite('{function}', '{0}'.format(function() {
			return 1;
		}), '1')

		.suite('{function}...', '{0}'.format(
			function() {
				return 1;
			},
			function() {
				return 1;
			}), '1')

		.suite('{function()}', '{0()}'.format(function() {
			return 1;
		}), '1')

		.suite('{function()}...', '{0()}{1()}'.format(
			function() {
				return 1;
			},
			function() {
				return 1;
			}), '11')

		.suite('{function}', '{0()}'.format(function() {
			return 1;
		}), '1')

		.suite('{function}', '{0(1)}'.format(function(value) {
			return value;
		}), '1')

		.suite('{function}', '{0()()}'.format(function() {
			return function() {
				return 1;
			};
		}), '1')

		.suite('{function}', '{0(1)(2)}'.format(function(a) {
			return function(b) {
				return a + b;
			};
		}), '3')

		.suite('{function}', '{0()()[1]}'.format(function() {
			return function() {
				return [0, 1];
			};
		}), '1')

		.suite('{function}', '{0(1)(2)[1]}'.format(function(a) {
			return function(b) {
				return [0, a + b];
			};
		}), '3')

		.suite('{function}', '{0()()[1][1]}'.format(function() {
			return function() {
				return [0, [1, 2]];
			};
		}), '2')

		.suite('{function}', '{0(1)(2)[1][1]}'.format(function(a) {
			return function(b) {
				return [0, [1, a + b]];
			};
		}), '3')

		.suite('{function}', '{0(1)(2)[1][1]}:{1}'.format(function(a) {
			return function(b) {
				return [0, [1, a + b]];
			};
		}, 1), '3:1')


		// -- {{ }}

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



// TODO:
//		.suite('{:0}', '{:0}'.format(1), '1')
//		.suite('{:1}', '{:1}'.format(1), '1')
//		.suite('{:4}', '{:4}'.format(1), '   1')
//
//		.suite('{:0d}', '{:0d}'.format(1), '1')
//		.suite('{:1d}', '{:1d}'.format(1), '1')
//		.suite('{:4d}', '{:4d}'.format(1), '   1')
//
//		.suite('{:0f}', '{:0f}'.format(1), '1')
//		.suite('{:1f}', '{:1f}'.format(1), '1')
//		.suite('{:4f}', '{:4f}'.format(1), '   1')
//
//		.suite('{:0o}', '{:0o}'.format(9), '9')


}();