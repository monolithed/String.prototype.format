// -*- coding: utf-8; indent-tabs-mode: nil; tab-width: 4; c-basic-offset: 4; -*-

/*
* string_format
*
* @author: Alexander Guinness
* @requires Array.prototype.forEach
*
* @version: 0.0.3
* @license: MIT
*
* Original author:
*	https://github.com/davidchambers/string-format
*
* Original fork:
*	https://github.com/deleted/string-format
*
* This project attempts to implement python-style string formatting, as documented here:
* http://docs.python.org/2/library/string.html#format-string-syntax
*
* NOTE: The format spec part is not complete yet
*/

void function () {
	var apply, format, lookup, resolve,

	format = String.prototype.format = function () {
		var args = Array.prototype.slice.call(arguments, 0);

		if (!args.length)
			return this;

		var explicit, index, implicit, message,

		index = 0;
		explicit = implicit = false;

		message = 'Cannot switch from {} to {} numbering'.format();

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


	lookup = function (object, key) {
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


	resolve = function (data, key) {
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
	apply = function (value, format_spec) {
		var pattern = /([^{}](?=[<>=^]))?([<>=^])?([-+ ])?(\#)?(0)?(\d+)?(,)?(?:\.(\d+))?([bcdeEfFgGnosxX%])?/,
			chunk = format_spec.match(pattern).slice(1),
			chunks = {};

		format_spec = ['fill', 'align', 'sign', 'hash', 'zeropad', 'width', 'comma', 'precision', 'type'];

		var i = format_spec.length;

		while (i--) {
			chunks[format_spec[i]] = chunk[i];
		}

		if (chunks.zeropad) {
			chunks.fill  = chunks.fill  || '0';
			chunks.align = chunks.align || '=';
		}

		if (!chunks.align) {
			chunks.align = '>';
		}

		if (!chunks.fill) {
			chunks.fill = ' ';
		}

		var numeric;

		switch (chunks.type) {
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

				if (chunks.precision) {
					value = value.toFixed(chunks.precision | 0);
				}
				else {
					value += '';
				}
				break;

			case 's':
				numeric = false;
				value += '';
		}

		if (numeric && chunks.sign) {
			if (chunks.sign === '+' || chunks.sign === ' ') {
				if (value[0] !== '-')
					value = chunks.sign + value;
			}
		}

		if (chunks.fill) {
			value += '';

			while (value.length < chunks.width | 0) {
				switch (chunks.align) {
					 // Forces the padding to be placed after
					 // the sign (if any) but before the digits.
					case '=':
						if (~'+- '.indexOf(value[0])) {
							value = value.charAt(0) + chunks.fill + value.slice(1);
						}
						else {
							value = chunks.fill + value;
						}
						break;

					// Forces the field to be left-aligned within
					// the available space (this is the default for most objects).
					case '<':
						value = value + chunks.fill;
						break;

					// Forces the field to be right-aligned within
					// the available space (this is the default for numbers).
					case '>':
						value = chunks.fill + value;
						break;

					case '^':
					case ',':
						throw new Error('Not implemented');
				}
			}
		}

		return value;
	};

	format.transformers = format.transformers || {};

}.call(this);\n
	try {
		module.exports = String.prototype.format;
	}
	catch (error) {}

