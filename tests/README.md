# Unit test cases

### -- object.method ({object: {method: 1}})

* {object.method}
* {object.method()}
* {object.method(1)}
* {object.method(1, 1)}
* {object.method()()}
* {object.method(0)(1)}
* {object.method(0, 1)(1, 2)}
* {object.method()[0]}
* {object.method(0)[0]}
* {object.method()()[0]}
* {object.method(0)(1)[0]}
* {object.method(0, 1)(1, 2)[0]}
* {object.method()[0][0]}
* {object.method(0)[0][1]}
* {object.method()()[0][0]}
* {object.method(0)(1)[0][1]}
* {object.method(0)(1)[0][1]()}
* {object.method(0)(1)[0][1](1)}
* {object.method(0)(1)[0][1](1 ,1)}


### -- position.method ({method: 1})

* {0.method()}
* {0.method(1)}
* {0.method(1, 1)}
* {0.method()()}
* {0.method(0)(1)}
* {0.method()[0]}
* {0.method(0)[0]}
* {0.method()()[0]}
* {0.method(0)(1)[0]}
* {0.method()[0][0]}
* {0.method(0)[0][1]}
* {0.method()()[0][0]}
* {0.method(0)(1)[0][1]}
* {0.method(0)(1)[0][1]()}
* {0.method(0)(1)[0][1](1)}
* {0.method(0)(1)[0][1](1, 2)}

### -- position.method ({method: function() {}})

* {0.object.method}
* {0.object.method[0]}
* {0.object.method[0]()}
* {0.object.method[0](1)}
* {0.object.method[0](0)(1)}
* {0.object.method[0](1, 2)}
* {0.object.method()}
* {0.object.method(1)}
* {0.object.method(1, 1)}
* {0.object.method()()}
* {0.object.method(0)(1)}
* {0.object.method()[0]}
* {0.object.method(0)[0]}
* {0.object.method()()[0]}
* {0.object.method(0)(1)[0]}
* {0.object.method()[0][0]}
* {0.object.method(0)[0][1]}
* {0.object.method()()[0][0]}
* {0.object.method(0)(1)[0][1]}
* {0.object.method(0)(1)[0][1]()}
* {0.object.method(0)(1)[0][1](1)}

### -- method ({method: function() {}})

* {method()}
* {method(0)}
* {method(0, 1)}
* {method()()}
* {method(0)(1)}
* {method()()[0]}
* {method(0)(1)[0]}
* {method()()[0][1]}
* {method(0)(1)[0][1]}
* {method(0, 1)(1, 2)[0][1]}

### -- undefined, null and boolean values

* ( 0 )
* ( null )
* ( undefined )
* ( '' )
* ( true )
* ( false )
* ( Boolean )
* ( 0, 0, 1, 0, null, undefined, '', true, false, Boolean )

### -- { 0.method[]}

* {0.method[0]}
* {0.method[0]()}
* {0.method[0](1)}
* {0.method[0](0)(1)}
* {0. method [ 0 ] ( 0 ) ( 1 )}
* {0.method[0](1, 2)}
* {0.method[0]...}

### -- { object.method[]}

* {object.method[0]}
* {object.method[0]()}
* {object.method[0](1)}
* {object.method[0](0)(1)}
* {object.method[0](1, 2)}
* {object.method[0]...}

### -- array[0] ({array: [0]})

* {0[0]}
* {0[ 0 ]}
* {0['0']}
* {0[ '0' ]}
* {0[0]()}
* {0[0](0)}
* {0[0][0]()}
* {0[0][0](0)}
* {0[0]()[0]}
* {0[0](0)[0]}
* {0[0]()[0][1]}
* {0[0](0)[0][1]}
* {0[0][1]}
* {0[0]...}

### -- function (function() {})

* {0}
* {0 ...}
* {0()}
* {0()...}
* {0(0)}
* {0()()}
* {0(0)(1)}
* {0()()[0]}
* {0(0)(1)[0]}
* {0()()[0][1]}
* {0(0)(1)[0][1]}

### -- {{ }}

* {{{}
* {}}}
* {{}}
* {{x}
* {{{0}}}
* {{{0}}}
* {{{{0}}}}
* }}{{
* }}x{{
* {{}}...

### -- Other
* {0.toLowerCase}
* {0.getFullYear}
* {0.toString}
* {0.charAt(1)}
* {0.method()[1]}
* {pop}
*    {}
* ()
* .()
* {{method()}}
* {0.0}
