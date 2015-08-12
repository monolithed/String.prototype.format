# string_format

[![npm version badge](https://img.shields.io/npm/v/string_format.svg)](https://www.npmjs.org/package/string_format)
[![Build Status](https://travis-ci.org/monolithed/string_format.png)](https://travis-ci.org/monolithed/string_format)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE.txt)

> A small JavaScript library for formatting strings. 
It's inspired by and modelled on Python's `str.format()`.

When `format` is invoked on a string, placeholders within the string are
replaced with values determined by the arguments provided. A placeholder
is a sequence of characters beginning with `{` and ending with `}`.


## Install

```
npm install string_format
```


## Synopsys

```js
format(template, $0, $1, …, $N)
```


## Examples

For more examples see test [page](https://github.com/monolithed/string_format/blob/master/tests)

## Usage

```js
require('string_format');
```


### General

Placeholders may contain numbers which refer to positional arguments:

```js
'{0}, you have {1} unread message{2}'.format('Holly', 2, 's');
// 'Holly, you have 2 unread messages'
```

Unmatched placeholders produce no output:

```js
'{0}, you have {1} unread message{2}'.format('Steve', 1);
// 'Steve, you have 1 unread messageundefined'
```

A format string may reference a positional argument multiple times:

```js
'{0} x {0} x {0} = {1}'.format(3, 3 * 3 *3);
// '3 x 3 x 3 = 27'
```

Positional arguments may be referenced implicitly:

```js
'{}, you have {} unread message'.format('Steve', 1);
// 'Steve, you have 1 unread message'
```

A format string must not contain both implicit and explicit references:

```js
'My name is {} {}. Do you like the name {0}?'.format('Lemony', 'Snicket');
// ValueError: cannot switch from implicit to explicit numbering
```

`{{` and `}}` in format strings produce `{` and `}`:

```js
'{{}} creates an empty {} in {}'.format('dictionary', 'Python');
// '{} creates an empty dictionary in Python'
```

Dot notation may be used to reference object properties:

```js
var bobby = {
   first_name: 'Bobby', 
   last_name: 'Fischer'
};

var garry = {
   first_name: 'Garry',
   last_name: 'Kasparov'
};

'{0.first_name} {0.last_name} vs. {1.first_name} {1.last_name}'.format(bobby, garry)
// 'Bobby Fischer vs. Garry Kasparov'
```

When referencing the first positional argument, `0.` may be omitted:

```js
var repo = {
   owner    : 'pypy', 
   slug     : 'pypy', 
   followers: [1, 2, 3]
};

'{owner}/{slug} has {followers.length} followers'.format(repo);
// 'pypy/pypy has 3 followers'
```


If the referenced property is a method, it is invoked and the result is used
as the replacement string:

```js
var me = {
   name: 'David',
   dob: new Date
};

'{name} was born in {dob.getFullYear}'.format(me);
// 'David was born in 2015'

'{pop}'.format(['one', 'two', 'three']);
// three
```

### Arrays

```js
'{0[1]}'.format([0, 1]); 
// 1

'{0["0"]}'.format([1])); 
// 1

'{0[1]} {1[1]}'.format([0, 1], [0, 2]));
// 1 2


'{0[1][1][1]}'.format([0, [0, [2, [3]]]]);
// 3

'{0[1]()}'.format([0, function () {
    return 1;
}])); 
// 1

'{0[1](1)[1][1]}'.format([0, function (value) {
    return [0, [0, value]];
}]);
// 1

'{0[1](1)[1][1]}:{1[1][1][1]}:{2}:{3.method[1]}'.format([0, function (value) {
   return [0, [0, value]];
}], 
[0, [0, [2, [3]]]], 2, {
   method: [0, [1]]
});
// 1:3:2:1
```

### Escaping

```js
'{{'.format(null); 
// {


'{{}}'.format(null);
// {}

'{{{0}}}'.format(123);
// {123}
```

### Functions

```js
'{0}'.format(function () {
   return 1;
});
// 1

{0()}'.format(function () {
   return 1;
});
// 1

'{0()}{1()}'.format(
   function () {
       return 1;
   },
   function () {
       return 1;
   });
// 11

'{0(1)}'.format(function (value) {
   return value;
});
// 1

'{0()()}'.format(function () {
   return function () {
       return 1;
   };
});
// 1

'{0(1)(2)[1][1]}:{1}'.format(function (a) {
   return function (b) {
       return [0, [1, a + b]];
   };
}, 1);

// 3:1
```

### Methods

```js
'{0.method[1]}'.format({ method: [0, 1] });
// 1

'{method(1)}'.format({
   method: function (x) {
       return x;
   }
});
// 1

'{object.method(1, 2)}'.format({
   object: {
       method: function (a, b) {
           return a + b;
       }
   }
});

// 3

'{0.method[0]()}'.format({
   method: [function () {
       return 1;
   }]
});
// 1

'{0.method[0](1)}'.format({
   method: [function (value) {
       return value;
   }]
});
// 1

'{object.method[1]} + {object2.method[1]} = 2'.format({
    object : {
        method: [0, 1]
    },
    object2: {
        method: [0, 1]
    }
}, 2);
// 1 + 1 = 2


'{0.method(1, 2)}'.format({
   method: function (a, b) {
       return a + b;
   }
});
// 3


'{0.method(1, 2)(3, 4)}'.format({
   method: function (a, b) {
       return function (c, d) {
           return a + b + c + d;
       };
   }
});

// 10

'{0.method(0)(1)[0][1](1, 2)}'.format({
   method: function (a) {
       return function (b) {
           return [[0, function (c, d) {
               return a + b + c + d;
           }]];
       };
   }
});

// 4
```

### Undefined values

```js
'{0}'.format(null);
// null

'{0}'.format(undefined);
// undefined
```

## Tests

```
npm test
```

## Info

* http://docs.python.org/2/library/string.html
* https://github.com/deleted/string-format
