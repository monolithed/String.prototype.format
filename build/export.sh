#! /bin/bash

file=string_format.js

grep 'module.exports' ${file} || echo "`cat ${file}`\n
	try {
		module.exports = String.prototype.format;
	}
	catch (error) {}
" > ${file}
