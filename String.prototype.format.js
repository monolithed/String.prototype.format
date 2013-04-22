/*
	Original fork:
	https://github.com/deleted/string-format

	This project attempts to implement python-style string formatting, as documented here:
	http://docs.python.org/2/library/string.html#format-string-syntax

	The format spec part is not complete
*/

//require('./String.sprintf.js');

(function() {
	var apply, format, lookup, resolve,

	format = String.prototype.format = function() {
		var args = Array.prototype.slice.call(arguments, 0);

		if (!args.length)
			return this;

		var explicit, index, implicit, message,

		index = 0;
		explicit = implicit = false;

		message = 'cannot switch from {} to {} numbering'.format();

		return this.replace(/([{}])\1|[{](.*?)(?:!([^:]+?)?)?(?::(.+?))?[}]/g,
			function(match, literal, key, transformer, format_spec) {
				var transformers, value;

				if (literal)
					return literal;

				if (key.length) {
					explicit = true;

					if (implicit) {
						throw new Error(message('implicit', 'explicit'));
					}

					value = lookup(args, key);

				}
				else {
					implicit = true;

					if (explicit) {
						throw new Error(message('explicit', 'implicit'));
					}

					value = args[index++];
				}

				if (format_spec) {
					value = apply(value, format_spec);
				}
				else {
					value += '';
				}

				if (transformers = format.transformers[transformer]) {
					return transformers.call(value) || '';
				}
				else {
					return value;
				}
			}
		);
	};


	lookup = function(object, key) {
		if (!/^(\d+)([.\[\(]|$)/.test(key)) {
			key = '0.' + key;
		}

		var match = null;

		while (match = /(.+?)[.](.+)/.exec(key)) {
			object = resolve(object, match[1]);
			key = match[2];
		}

		return resolve(object, key);
	};


	resolve = function(data, key) {
		var value = data[key];
		var object = null;

		if (typeof value === 'function') {
			return value.call(data);
		}
		else if (object = key.match(/^(\d+)([\[\(].*)/)) {
			return new Function('data, index',
				'return data[index]' + object[2])(data, object[1]);
		}
		else if (object = key.match(/^(.*)[\[\(]/)) {
			return new Function('data', 'return data.' + key)(data);
		}
		else {
			return value;
		}
	};

	// Not complete yet
	apply = function(value, format_spec) {

		var numeric;
		var pattern = /([^{}](?=[<>=^]))?([<>=^])?([-+\x20])?(\#)?(0)?(\d+)?(,)?(?:\.(\d+))?([bcdeEfFgGnosxX%])?/;
		var token = format_spec.match(pattern).slice(1);

		var tokens = {};

		['fill', 'align', 'sign', 'hash', 'zeropad', 'width', 'comma', 'precision', 'type']
			.forEach(function(value, index) {
				tokens[value] = token[index];
			})
		;

		if (tokens.zeropad) {
			tokens.fill  = tokens.fill  || '0';
			tokens.align = tokens.align || '=';
		}

		if (!tokens.align) {
			tokens.align = '>';
		}

		if (!tokens.fill) {
			tokens.fill = ' ';
		}

		switch (tokens.type) {
			case 'b':
			case 'c':
			case 'd':
			case 'o':
			case 'x':
			case 'X':
			case 'n':
				numeric = true;
				value = parseInt(value, 10).toString();
				break;
			case 'e':
			case 'E':
			case 'f':
			case 'F':
			case 'g':
			case 'G':
			case 'n':
			case '%':
				numeric = true;
				value = parseFloat(value);

				if (tokens.precision) {
					value = value.toFixed(tokens.precision | 0);
				}
				else {
					value += '';
				}
				break;

			case 's':
				numeric = false;
				value += '';
		}

		if (numeric && tokens.sign) {
			if (tokens.sign === '+' || tokens.sign === ' ') {
				if (value[0] !== '-')
					value = tokens.sign + value;
			}
		}

		if (tokens.fill) {
			value += '';

			while (value.length < tokens.width | 0) {
				switch (tokens.align) {
					 // Forces the padding to be placed after
					 // the sign (if any) but before the digits.
					case '=':
						if (~'+- '.indexOf(value[0])) {
							value = value.charAt(0) + tokens.fill + value.slice(1);
						}
						else {
							value = tokens.fill + value;
						}
						break;

					// Forces the field to be left-aligned within
					// the available space (this is the default for most objects).
					case '<':
						value = value + tokens.fill;
						break;

					// Forces the field to be right-aligned within
					// the available space (this is the default for numbers).
					case '>':
						value = tokens.fill + value;
						break;

					case '^':
					case ',':
						throw new Error("Not implemented");
				}
			}
		}

		return value;
	};

	format.transformers = format.transformers || {};
	format.version = '0.2.1';

}).call(this);