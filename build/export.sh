#! /bin/bash

file=string_format.js

grep 'module.exports' ${file} || echo -e "`cat ${file}`\n
	try {
		module.exports = String.prototype.format;
	}
	catch (error) {}
" > ${file}
