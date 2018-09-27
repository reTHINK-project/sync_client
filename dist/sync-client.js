module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 136);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(32)('wks');
var uid = __webpack_require__(22);
var Symbol = __webpack_require__(1).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(0);
var ctx = __webpack_require__(10);
var hide = __webpack_require__(9);
var has = __webpack_require__(8);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(4);
var IE8_DOM_DEFINE = __webpack_require__(45);
var toPrimitive = __webpack_require__(35);
var dP = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(11)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(5);
var createDesc = __webpack_require__(17);
module.exports = __webpack_require__(6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(19);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(46);
var defined = __webpack_require__(25);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(54);
var enumBugKeys = __webpack_require__(27);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(25);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(5).f;
var has = __webpack_require__(8);
var TAG = __webpack_require__(2)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*
 * Dexie.js - a minimalistic wrapper for IndexedDB
 * ===============================================
 *
 * By David Fahlander, david.fahlander@gmail.com
 *
 * Version {version}, {date}
 *
 * http://dexie.org
 *
 * Apache License Version 2.0, January 2004, http://www.apache.org/licenses/
 */
 
var keys = Object.keys;
var isArray = Array.isArray;
var _global = typeof self !== 'undefined' ? self :
    typeof window !== 'undefined' ? window :
        global;
function extend(obj, extension) {
    if (typeof extension !== 'object')
        return obj;
    keys(extension).forEach(function (key) {
        obj[key] = extension[key];
    });
    return obj;
}
var getProto = Object.getPrototypeOf;
var _hasOwn = {}.hasOwnProperty;
function hasOwn(obj, prop) {
    return _hasOwn.call(obj, prop);
}
function props(proto, extension) {
    if (typeof extension === 'function')
        extension = extension(getProto(proto));
    keys(extension).forEach(function (key) {
        setProp(proto, key, extension[key]);
    });
}
var defineProperty = Object.defineProperty;
function setProp(obj, prop, functionOrGetSet, options) {
    defineProperty(obj, prop, extend(functionOrGetSet && hasOwn(functionOrGetSet, "get") && typeof functionOrGetSet.get === 'function' ?
        { get: functionOrGetSet.get, set: functionOrGetSet.set, configurable: true } :
        { value: functionOrGetSet, configurable: true, writable: true }, options));
}
function derive(Child) {
    return {
        from: function (Parent) {
            Child.prototype = Object.create(Parent.prototype);
            setProp(Child.prototype, "constructor", Child);
            return {
                extend: props.bind(null, Child.prototype)
            };
        }
    };
}
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
function getPropertyDescriptor(obj, prop) {
    var pd = getOwnPropertyDescriptor(obj, prop), proto;
    return pd || (proto = getProto(obj)) && getPropertyDescriptor(proto, prop);
}
var _slice = [].slice;
function slice(args, start, end) {
    return _slice.call(args, start, end);
}
function override(origFunc, overridedFactory) {
    return overridedFactory(origFunc);
}
function assert(b) {
    if (!b)
        throw new Error("Assertion Failed");
}
function asap(fn) {
    if (_global.setImmediate)
        setImmediate(fn);
    else
        setTimeout(fn, 0);
}

/** Generate an object (hash map) based on given array.
 * @param extractor Function taking an array item and its index and returning an array of 2 items ([key, value]) to
 *        instert on the resulting object for each item in the array. If this function returns a falsy value, the
 *        current item wont affect the resulting object.
 */
function arrayToObject(array, extractor) {
    return array.reduce(function (result, item, i) {
        var nameAndValue = extractor(item, i);
        if (nameAndValue)
            result[nameAndValue[0]] = nameAndValue[1];
        return result;
    }, {});
}
function trycatcher(fn, reject) {
    return function () {
        try {
            fn.apply(this, arguments);
        }
        catch (e) {
            reject(e);
        }
    };
}
function tryCatch(fn, onerror, args) {
    try {
        fn.apply(null, args);
    }
    catch (ex) {
        onerror && onerror(ex);
    }
}
function getByKeyPath(obj, keyPath) {
    // http://www.w3.org/TR/IndexedDB/#steps-for-extracting-a-key-from-a-value-using-a-key-path
    if (hasOwn(obj, keyPath))
        return obj[keyPath]; // This line is moved from last to first for optimization purpose.
    if (!keyPath)
        return obj;
    if (typeof keyPath !== 'string') {
        var rv = [];
        for (var i = 0, l = keyPath.length; i < l; ++i) {
            var val = getByKeyPath(obj, keyPath[i]);
            rv.push(val);
        }
        return rv;
    }
    var period = keyPath.indexOf('.');
    if (period !== -1) {
        var innerObj = obj[keyPath.substr(0, period)];
        return innerObj === undefined ? undefined : getByKeyPath(innerObj, keyPath.substr(period + 1));
    }
    return undefined;
}
function setByKeyPath(obj, keyPath, value) {
    if (!obj || keyPath === undefined)
        return;
    if ('isFrozen' in Object && Object.isFrozen(obj))
        return;
    if (typeof keyPath !== 'string' && 'length' in keyPath) {
        assert(typeof value !== 'string' && 'length' in value);
        for (var i = 0, l = keyPath.length; i < l; ++i) {
            setByKeyPath(obj, keyPath[i], value[i]);
        }
    }
    else {
        var period = keyPath.indexOf('.');
        if (period !== -1) {
            var currentKeyPath = keyPath.substr(0, period);
            var remainingKeyPath = keyPath.substr(period + 1);
            if (remainingKeyPath === "")
                if (value === undefined)
                    delete obj[currentKeyPath];
                else
                    obj[currentKeyPath] = value;
            else {
                var innerObj = obj[currentKeyPath];
                if (!innerObj)
                    innerObj = (obj[currentKeyPath] = {});
                setByKeyPath(innerObj, remainingKeyPath, value);
            }
        }
        else {
            if (value === undefined)
                delete obj[keyPath];
            else
                obj[keyPath] = value;
        }
    }
}
function delByKeyPath(obj, keyPath) {
    if (typeof keyPath === 'string')
        setByKeyPath(obj, keyPath, undefined);
    else if ('length' in keyPath)
        [].map.call(keyPath, function (kp) {
            setByKeyPath(obj, kp, undefined);
        });
}
function shallowClone(obj) {
    var rv = {};
    for (var m in obj) {
        if (hasOwn(obj, m))
            rv[m] = obj[m];
    }
    return rv;
}
var concat = [].concat;
function flatten(a) {
    return concat.apply([], a);
}
//https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
var intrinsicTypes = "Boolean,String,Date,RegExp,Blob,File,FileList,ArrayBuffer,DataView,Uint8ClampedArray,ImageData,Map,Set"
    .split(',').concat(flatten([8, 16, 32, 64].map(function (num) { return ["Int", "Uint", "Float"].map(function (t) { return t + num + "Array"; }); }))).filter(function (t) { return _global[t]; }).map(function (t) { return _global[t]; });
function deepClone(any) {
    if (!any || typeof any !== 'object')
        return any;
    var rv;
    if (isArray(any)) {
        rv = [];
        for (var i = 0, l = any.length; i < l; ++i) {
            rv.push(deepClone(any[i]));
        }
    }
    else if (intrinsicTypes.indexOf(any.constructor) >= 0) {
        rv = any;
    }
    else {
        rv = any.constructor ? Object.create(any.constructor.prototype) : {};
        for (var prop in any) {
            if (hasOwn(any, prop)) {
                rv[prop] = deepClone(any[prop]);
            }
        }
    }
    return rv;
}
function getObjectDiff(a, b, rv, prfx) {
    // Compares objects a and b and produces a diff object.
    rv = rv || {};
    prfx = prfx || '';
    keys(a).forEach(function (prop) {
        if (!hasOwn(b, prop))
            rv[prfx + prop] = undefined; // Property removed
        else {
            var ap = a[prop], bp = b[prop];
            if (typeof ap === 'object' && typeof bp === 'object' &&
                ap && bp &&
                // Now compare constructors are same (not equal because wont work in Safari)
                ('' + ap.constructor) === ('' + bp.constructor))
                // Same type of object but its properties may have changed
                getObjectDiff(ap, bp, rv, prfx + prop + ".");
            else if (ap !== bp)
                rv[prfx + prop] = b[prop]; // Primitive value changed
        }
    });
    keys(b).forEach(function (prop) {
        if (!hasOwn(a, prop)) {
            rv[prfx + prop] = b[prop]; // Property added
        }
    });
    return rv;
}
// If first argument is iterable or array-like, return it as an array
var iteratorSymbol = typeof Symbol !== 'undefined' && Symbol.iterator;
var getIteratorOf = iteratorSymbol ? function (x) {
    var i;
    return x != null && (i = x[iteratorSymbol]) && i.apply(x);
} : function () { return null; };
var NO_CHAR_ARRAY = {};
// Takes one or several arguments and returns an array based on the following criteras:
// * If several arguments provided, return arguments converted to an array in a way that
//   still allows javascript engine to optimize the code.
// * If single argument is an array, return a clone of it.
// * If this-pointer equals NO_CHAR_ARRAY, don't accept strings as valid iterables as a special
//   case to the two bullets below.
// * If single argument is an iterable, convert it to an array and return the resulting array.
// * If single argument is array-like (has length of type number), convert it to an array.
function getArrayOf(arrayLike) {
    var i, a, x, it;
    if (arguments.length === 1) {
        if (isArray(arrayLike))
            return arrayLike.slice();
        if (this === NO_CHAR_ARRAY && typeof arrayLike === 'string')
            return [arrayLike];
        if ((it = getIteratorOf(arrayLike))) {
            a = [];
            while ((x = it.next()), !x.done)
                a.push(x.value);
            return a;
        }
        if (arrayLike == null)
            return [arrayLike];
        i = arrayLike.length;
        if (typeof i === 'number') {
            a = new Array(i);
            while (i--)
                a[i] = arrayLike[i];
            return a;
        }
        return [arrayLike];
    }
    i = arguments.length;
    a = new Array(i);
    while (i--)
        a[i] = arguments[i];
    return a;
}

// By default, debug will be true only if platform is a web platform and its page is served from localhost.
// When debug = true, error's stacks will contain asyncronic long stacks.
var debug = typeof location !== 'undefined' &&
    // By default, use debug mode if served from localhost.
    /^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);
function setDebug(value, filter) {
    debug = value;
    libraryFilter = filter;
}
var libraryFilter = function () { return true; };
var NEEDS_THROW_FOR_STACK = !new Error("").stack;
function getErrorWithStack() {
    "use strict";
    if (NEEDS_THROW_FOR_STACK)
        try {
            // Doing something naughty in strict mode here to trigger a specific error
            // that can be explicitely ignored in debugger's exception settings.
            // If we'd just throw new Error() here, IE's debugger's exception settings
            // will just consider it as "exception thrown by javascript code" which is
            // something you wouldn't want it to ignore.
            getErrorWithStack.arguments;
            throw new Error(); // Fallback if above line don't throw.
        }
        catch (e) {
            return e;
        }
    return new Error();
}
function prettyStack(exception, numIgnoredFrames) {
    var stack = exception.stack;
    if (!stack)
        return "";
    numIgnoredFrames = (numIgnoredFrames || 0);
    if (stack.indexOf(exception.name) === 0)
        numIgnoredFrames += (exception.name + exception.message).split('\n').length;
    return stack.split('\n')
        .slice(numIgnoredFrames)
        .filter(libraryFilter)
        .map(function (frame) { return "\n" + frame; })
        .join('');
}
function deprecated(what, fn) {
    return function () {
        console.warn(what + " is deprecated. See https://github.com/dfahlander/Dexie.js/wiki/Deprecations. " + prettyStack(getErrorWithStack(), 1));
        return fn.apply(this, arguments);
    };
}

var dexieErrorNames = [
    'Modify',
    'Bulk',
    'OpenFailed',
    'VersionChange',
    'Schema',
    'Upgrade',
    'InvalidTable',
    'MissingAPI',
    'NoSuchDatabase',
    'InvalidArgument',
    'SubTransaction',
    'Unsupported',
    'Internal',
    'DatabaseClosed',
    'PrematureCommit',
    'ForeignAwait'
];
var idbDomErrorNames = [
    'Unknown',
    'Constraint',
    'Data',
    'TransactionInactive',
    'ReadOnly',
    'Version',
    'NotFound',
    'InvalidState',
    'InvalidAccess',
    'Abort',
    'Timeout',
    'QuotaExceeded',
    'Syntax',
    'DataClone'
];
var errorList = dexieErrorNames.concat(idbDomErrorNames);
var defaultTexts = {
    VersionChanged: "Database version changed by other database connection",
    DatabaseClosed: "Database has been closed",
    Abort: "Transaction aborted",
    TransactionInactive: "Transaction has already completed or failed"
};
//
// DexieError - base class of all out exceptions.
//
function DexieError(name, msg) {
    // Reason we don't use ES6 classes is because:
    // 1. It bloats transpiled code and increases size of minified code.
    // 2. It doesn't give us much in this case.
    // 3. It would require sub classes to call super(), which
    //    is not needed when deriving from Error.
    this._e = getErrorWithStack();
    this.name = name;
    this.message = msg;
}
derive(DexieError).from(Error).extend({
    stack: {
        get: function () {
            return this._stack ||
                (this._stack = this.name + ": " + this.message + prettyStack(this._e, 2));
        }
    },
    toString: function () { return this.name + ": " + this.message; }
});
function getMultiErrorMessage(msg, failures) {
    return msg + ". Errors: " + failures
        .map(function (f) { return f.toString(); })
        .filter(function (v, i, s) { return s.indexOf(v) === i; }) // Only unique error strings
        .join('\n');
}
//
// ModifyError - thrown in Collection.modify()
// Specific constructor because it contains members failures and failedKeys.
//
function ModifyError(msg, failures, successCount, failedKeys) {
    this._e = getErrorWithStack();
    this.failures = failures;
    this.failedKeys = failedKeys;
    this.successCount = successCount;
}
derive(ModifyError).from(DexieError);
function BulkError(msg, failures) {
    this._e = getErrorWithStack();
    this.name = "BulkError";
    this.failures = failures;
    this.message = getMultiErrorMessage(msg, failures);
}
derive(BulkError).from(DexieError);
//
//
// Dynamically generate error names and exception classes based
// on the names in errorList.
//
//
// Map of {ErrorName -> ErrorName + "Error"}
var errnames = errorList.reduce(function (obj, name) { return (obj[name] = name + "Error", obj); }, {});
// Need an alias for DexieError because we're gonna create subclasses with the same name.
var BaseException = DexieError;
// Map of {ErrorName -> exception constructor}
var exceptions = errorList.reduce(function (obj, name) {
    // Let the name be "DexieError" because this name may
    // be shown in call stack and when debugging. DexieError is
    // the most true name because it derives from DexieError,
    // and we cannot change Function.name programatically without
    // dynamically create a Function object, which would be considered
    // 'eval-evil'.
    var fullName = name + "Error";
    function DexieError(msgOrInner, inner) {
        this._e = getErrorWithStack();
        this.name = fullName;
        if (!msgOrInner) {
            this.message = defaultTexts[name] || fullName;
            this.inner = null;
        }
        else if (typeof msgOrInner === 'string') {
            this.message = msgOrInner;
            this.inner = inner || null;
        }
        else if (typeof msgOrInner === 'object') {
            this.message = msgOrInner.name + " " + msgOrInner.message;
            this.inner = msgOrInner;
        }
    }
    derive(DexieError).from(BaseException);
    obj[name] = DexieError;
    return obj;
}, {});
// Use ECMASCRIPT standard exceptions where applicable:
exceptions.Syntax = SyntaxError;
exceptions.Type = TypeError;
exceptions.Range = RangeError;
var exceptionMap = idbDomErrorNames.reduce(function (obj, name) {
    obj[name + "Error"] = exceptions[name];
    return obj;
}, {});
function mapError(domError, message) {
    if (!domError || domError instanceof DexieError || domError instanceof TypeError || domError instanceof SyntaxError || !domError.name || !exceptionMap[domError.name])
        return domError;
    var rv = new exceptionMap[domError.name](message || domError.message, domError);
    if ("stack" in domError) {
        // Derive stack from inner exception if it has a stack
        setProp(rv, "stack", { get: function () {
                return this.inner.stack;
            } });
    }
    return rv;
}
var fullNameExceptions = errorList.reduce(function (obj, name) {
    if (["Syntax", "Type", "Range"].indexOf(name) === -1)
        obj[name + "Error"] = exceptions[name];
    return obj;
}, {});
fullNameExceptions.ModifyError = ModifyError;
fullNameExceptions.DexieError = DexieError;
fullNameExceptions.BulkError = BulkError;

function nop() { }
function mirror(val) { return val; }
function pureFunctionChain(f1, f2) {
    // Enables chained events that takes ONE argument and returns it to the next function in chain.
    // This pattern is used in the hook("reading") event.
    if (f1 == null || f1 === mirror)
        return f2;
    return function (val) {
        return f2(f1(val));
    };
}
function callBoth(on1, on2) {
    return function () {
        on1.apply(this, arguments);
        on2.apply(this, arguments);
    };
}
function hookCreatingChain(f1, f2) {
    // Enables chained events that takes several arguments and may modify first argument by making a modification and then returning the same instance.
    // This pattern is used in the hook("creating") event.
    if (f1 === nop)
        return f2;
    return function () {
        var res = f1.apply(this, arguments);
        if (res !== undefined)
            arguments[0] = res;
        var onsuccess = this.onsuccess, // In case event listener has set this.onsuccess
        onerror = this.onerror; // In case event listener has set this.onerror
        this.onsuccess = null;
        this.onerror = null;
        var res2 = f2.apply(this, arguments);
        if (onsuccess)
            this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
        if (onerror)
            this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
        return res2 !== undefined ? res2 : res;
    };
}
function hookDeletingChain(f1, f2) {
    if (f1 === nop)
        return f2;
    return function () {
        f1.apply(this, arguments);
        var onsuccess = this.onsuccess, // In case event listener has set this.onsuccess
        onerror = this.onerror; // In case event listener has set this.onerror
        this.onsuccess = this.onerror = null;
        f2.apply(this, arguments);
        if (onsuccess)
            this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
        if (onerror)
            this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
    };
}
function hookUpdatingChain(f1, f2) {
    if (f1 === nop)
        return f2;
    return function (modifications) {
        var res = f1.apply(this, arguments);
        extend(modifications, res); // If f1 returns new modifications, extend caller's modifications with the result before calling next in chain.
        var onsuccess = this.onsuccess, // In case event listener has set this.onsuccess
        onerror = this.onerror; // In case event listener has set this.onerror
        this.onsuccess = null;
        this.onerror = null;
        var res2 = f2.apply(this, arguments);
        if (onsuccess)
            this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
        if (onerror)
            this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
        return res === undefined ?
            (res2 === undefined ? undefined : res2) :
            (extend(res, res2));
    };
}
function reverseStoppableEventChain(f1, f2) {
    if (f1 === nop)
        return f2;
    return function () {
        if (f2.apply(this, arguments) === false)
            return false;
        return f1.apply(this, arguments);
    };
}

function promisableChain(f1, f2) {
    if (f1 === nop)
        return f2;
    return function () {
        var res = f1.apply(this, arguments);
        if (res && typeof res.then === 'function') {
            var thiz = this, i = arguments.length, args = new Array(i);
            while (i--)
                args[i] = arguments[i];
            return res.then(function () {
                return f2.apply(thiz, args);
            });
        }
        return f2.apply(this, arguments);
    };
}

/*
 * Copyright (c) 2014-2017 David Fahlander
 * Apache License Version 2.0, January 2004, http://www.apache.org/licenses/LICENSE-2.0
 */
//
// Promise and Zone (PSD) for Dexie library
//
// I started out writing this Promise class by copying promise-light (https://github.com/taylorhakes/promise-light) by
// https://github.com/taylorhakes - an A+ and ECMASCRIPT 6 compliant Promise implementation.
//
// In previous versions this was fixed by not calling setTimeout when knowing that the resolve() or reject() came from another
// tick. In Dexie v1.4.0, I've rewritten the Promise class entirely. Just some fragments of promise-light is left. I use
// another strategy now that simplifies everything a lot: to always execute callbacks in a new micro-task, but have an own micro-task
// engine that is indexedDB compliant across all browsers.
// Promise class has also been optimized a lot with inspiration from bluebird - to avoid closures as much as possible.
// Also with inspiration from bluebird, asyncronic stacks in debug mode.
//
// Specific non-standard features of this Promise class:
// * Custom zone support (a.k.a. PSD) with ability to keep zones also when using native promises as well as
//   native async / await.
// * Promise.follow() method built upon the custom zone engine, that allows user to track all promises created from current stack frame
//   and below + all promises that those promises creates or awaits.
// * Detect any unhandled promise in a PSD-scope (PSD.onunhandled). 
//
// David Fahlander, https://github.com/dfahlander
//
// Just a pointer that only this module knows about.
// Used in Promise constructor to emulate a private constructor.
var INTERNAL = {};
// Async stacks (long stacks) must not grow infinitely.
var LONG_STACKS_CLIP_LIMIT = 100;
var MAX_LONG_STACKS = 20;
var ZONE_ECHO_LIMIT = 7;
var nativePromiseInstanceAndProto = (function () {
    try {
        // Be able to patch native async functions
        return new Function("let F=async ()=>{},p=F();return [p,Object.getPrototypeOf(p),Promise.resolve(),F.constructor];")();
    }
    catch (e) {
        var P = _global.Promise;
        return P ?
            [P.resolve(), P.prototype, P.resolve()] :
            [];
    }
})();
var resolvedNativePromise = nativePromiseInstanceAndProto[0];
var nativePromiseProto = nativePromiseInstanceAndProto[1];
var resolvedGlobalPromise = nativePromiseInstanceAndProto[2];
var nativePromiseThen = nativePromiseProto && nativePromiseProto.then;
var NativePromise = resolvedNativePromise && resolvedNativePromise.constructor;
var AsyncFunction = nativePromiseInstanceAndProto[3];
var patchGlobalPromise = !!resolvedGlobalPromise;
var stack_being_generated = false;
/* The default function used only for the very first promise in a promise chain.
   As soon as then promise is resolved or rejected, all next tasks will be executed in micro ticks
   emulated in this module. For indexedDB compatibility, this means that every method needs to
   execute at least one promise before doing an indexedDB operation. Dexie will always call
   db.ready().then() for every operation to make sure the indexedDB event is started in an
   indexedDB-compatible emulated micro task loop.
*/
var schedulePhysicalTick = resolvedGlobalPromise ?
    function () { resolvedGlobalPromise.then(physicalTick); }
    :
        _global.setImmediate ?
            // setImmediate supported. Those modern platforms also supports Function.bind().
            setImmediate.bind(null, physicalTick) :
            _global.MutationObserver ?
                // MutationObserver supported
                function () {
                    var hiddenDiv = document.createElement("div");
                    (new MutationObserver(function () {
                        physicalTick();
                        hiddenDiv = null;
                    })).observe(hiddenDiv, { attributes: true });
                    hiddenDiv.setAttribute('i', '1');
                } :
                // No support for setImmediate or MutationObserver. No worry, setTimeout is only called
                // once time. Every tick that follows will be our emulated micro tick.
                // Could have uses setTimeout.bind(null, 0, physicalTick) if it wasnt for that FF13 and below has a bug 
                function () { setTimeout(physicalTick, 0); };
// Configurable through Promise.scheduler.
// Don't export because it would be unsafe to let unknown
// code call it unless they do try..catch within their callback.
// This function can be retrieved through getter of Promise.scheduler though,
// but users must not do Promise.scheduler = myFuncThatThrowsException
var asap$1 = function (callback, args) {
    microtickQueue.push([callback, args]);
    if (needsNewPhysicalTick) {
        schedulePhysicalTick();
        needsNewPhysicalTick = false;
    }
};
var isOutsideMicroTick = true;
var needsNewPhysicalTick = true;
var unhandledErrors = [];
var rejectingErrors = [];
var currentFulfiller = null;
var rejectionMapper = mirror; // Remove in next major when removing error mapping of DOMErrors and DOMExceptions
var globalPSD = {
    id: 'global',
    global: true,
    ref: 0,
    unhandleds: [],
    onunhandled: globalError,
    pgp: false,
    env: {},
    finalize: function () {
        this.unhandleds.forEach(function (uh) {
            try {
                globalError(uh[0], uh[1]);
            }
            catch (e) { }
        });
    }
};
var PSD = globalPSD;
var microtickQueue = []; // Callbacks to call in this or next physical tick.
var numScheduledCalls = 0; // Number of listener-calls left to do in this physical tick.
var tickFinalizers = []; // Finalizers to call when there are no more async calls scheduled within current physical tick.
function Promise(fn) {
    if (typeof this !== 'object')
        throw new TypeError('Promises must be constructed via new');
    this._listeners = [];
    this.onuncatched = nop; // Deprecate in next major. Not needed. Better to use global error handler.
    // A library may set `promise._lib = true;` after promise is created to make resolve() or reject()
    // execute the microtask engine implicitely within the call to resolve() or reject().
    // To remain A+ compliant, a library must only set `_lib=true` if it can guarantee that the stack
    // only contains library code when calling resolve() or reject().
    // RULE OF THUMB: ONLY set _lib = true for promises explicitely resolving/rejecting directly from
    // global scope (event handler, timer etc)!
    this._lib = false;
    // Current async scope
    var psd = (this._PSD = PSD);
    if (debug) {
        this._stackHolder = getErrorWithStack();
        this._prev = null;
        this._numPrev = 0; // Number of previous promises (for long stacks)
    }
    if (typeof fn !== 'function') {
        if (fn !== INTERNAL)
            throw new TypeError('Not a function');
        // Private constructor (INTERNAL, state, value).
        // Used internally by Promise.resolve() and Promise.reject().
        this._state = arguments[1];
        this._value = arguments[2];
        if (this._state === false)
            handleRejection(this, this._value); // Map error, set stack and addPossiblyUnhandledError().
        return;
    }
    this._state = null; // null (=pending), false (=rejected) or true (=resolved)
    this._value = null; // error or result
    ++psd.ref; // Refcounting current scope
    executePromiseTask(this, fn);
}
// Prepare a property descriptor to put onto Promise.prototype.then
var thenProp = {
    get: function () {
        var psd = PSD, microTaskId = totalEchoes;
        function then(onFulfilled, onRejected) {
            var _this = this;
            var possibleAwait = !psd.global && (psd !== PSD || microTaskId !== totalEchoes);
            if (possibleAwait)
                decrementExpectedAwaits();
            var rv = new Promise(function (resolve, reject) {
                propagateToListener(_this, new Listener(nativeAwaitCompatibleWrap(onFulfilled, psd, possibleAwait), nativeAwaitCompatibleWrap(onRejected, psd, possibleAwait), resolve, reject, psd));
            });
            debug && linkToPreviousPromise(rv, this);
            return rv;
        }
        then.prototype = INTERNAL; // For idempotense, see setter below.
        return then;
    },
    // Be idempotent and allow another framework (such as zone.js or another instance of a Dexie.Promise module) to replace Promise.prototype.then
    // and when that framework wants to restore the original property, we must identify that and restore the original property descriptor.
    set: function (value) {
        setProp(this, 'then', value && value.prototype === INTERNAL ?
            thenProp : // Restore to original property descriptor.
            {
                get: function () {
                    return value; // Getter returning provided value (behaves like value is just changed)
                },
                set: thenProp.set // Keep a setter that is prepared to restore original.
            });
    }
};
props(Promise.prototype, {
    then: thenProp,
    _then: function (onFulfilled, onRejected) {
        // A little tinier version of then() that don't have to create a resulting promise.
        propagateToListener(this, new Listener(null, null, onFulfilled, onRejected, PSD));
    },
    catch: function (onRejected) {
        if (arguments.length === 1)
            return this.then(null, onRejected);
        // First argument is the Error type to catch
        var type = arguments[0], handler = arguments[1];
        return typeof type === 'function' ? this.then(null, function (err) {
            // Catching errors by its constructor type (similar to java / c++ / c#)
            // Sample: promise.catch(TypeError, function (e) { ... });
            return err instanceof type ? handler(err) : PromiseReject(err);
        })
            : this.then(null, function (err) {
                // Catching errors by the error.name property. Makes sense for indexedDB where error type
                // is always DOMError but where e.name tells the actual error type.
                // Sample: promise.catch('ConstraintError', function (e) { ... });
                return err && err.name === type ? handler(err) : PromiseReject(err);
            });
    },
    finally: function (onFinally) {
        return this.then(function (value) {
            onFinally();
            return value;
        }, function (err) {
            onFinally();
            return PromiseReject(err);
        });
    },
    stack: {
        get: function () {
            if (this._stack)
                return this._stack;
            try {
                stack_being_generated = true;
                var stacks = getStack(this, [], MAX_LONG_STACKS);
                var stack = stacks.join("\nFrom previous: ");
                if (this._state !== null)
                    this._stack = stack; // Stack may be updated on reject.
                return stack;
            }
            finally {
                stack_being_generated = false;
            }
        }
    },
    timeout: function (ms, msg) {
        var _this = this;
        return ms < Infinity ?
            new Promise(function (resolve, reject) {
                var handle = setTimeout(function () { return reject(new exceptions.Timeout(msg)); }, ms);
                _this.then(resolve, reject).finally(clearTimeout.bind(null, handle));
            }) : this;
    }
});
if (typeof Symbol !== 'undefined' && Symbol.toStringTag)
    setProp(Promise.prototype, Symbol.toStringTag, 'Promise');
// Now that Promise.prototype is defined, we have all it takes to set globalPSD.env.
// Environment globals snapshotted on leaving global zone
globalPSD.env = snapShot();
function Listener(onFulfilled, onRejected, resolve, reject, zone) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.resolve = resolve;
    this.reject = reject;
    this.psd = zone;
}
// Promise Static Properties
props(Promise, {
    all: function () {
        var values = getArrayOf.apply(null, arguments) // Supports iterables, implicit arguments and array-like.
            .map(onPossibleParallellAsync); // Handle parallell async/awaits 
        return new Promise(function (resolve, reject) {
            if (values.length === 0)
                resolve([]);
            var remaining = values.length;
            values.forEach(function (a, i) { return Promise.resolve(a).then(function (x) {
                values[i] = x;
                if (!--remaining)
                    resolve(values);
            }, reject); });
        });
    },
    resolve: function (value) {
        if (value instanceof Promise)
            return value;
        if (value && typeof value.then === 'function')
            return new Promise(function (resolve, reject) {
                value.then(resolve, reject);
            });
        var rv = new Promise(INTERNAL, true, value);
        linkToPreviousPromise(rv, currentFulfiller);
        return rv;
    },
    reject: PromiseReject,
    race: function () {
        var values = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
        return new Promise(function (resolve, reject) {
            values.map(function (value) { return Promise.resolve(value).then(resolve, reject); });
        });
    },
    PSD: {
        get: function () { return PSD; },
        set: function (value) { return PSD = value; }
    },
    //totalEchoes: {get: ()=>totalEchoes},
    //task: {get: ()=>task},
    newPSD: newScope,
    usePSD: usePSD,
    scheduler: {
        get: function () { return asap$1; },
        set: function (value) { asap$1 = value; }
    },
    rejectionMapper: {
        get: function () { return rejectionMapper; },
        set: function (value) { rejectionMapper = value; } // Map reject failures
    },
    follow: function (fn, zoneProps) {
        return new Promise(function (resolve, reject) {
            return newScope(function (resolve, reject) {
                var psd = PSD;
                psd.unhandleds = []; // For unhandled standard- or 3rd party Promises. Checked at psd.finalize()
                psd.onunhandled = reject; // Triggered directly on unhandled promises of this library.
                psd.finalize = callBoth(function () {
                    var _this = this;
                    // Unhandled standard or 3rd part promises are put in PSD.unhandleds and
                    // examined upon scope completion while unhandled rejections in this Promise
                    // will trigger directly through psd.onunhandled
                    run_at_end_of_this_or_next_physical_tick(function () {
                        _this.unhandleds.length === 0 ? resolve() : reject(_this.unhandleds[0]);
                    });
                }, psd.finalize);
                fn();
            }, zoneProps, resolve, reject);
        });
    }
});
/**
* Take a potentially misbehaving resolver function and make sure
* onFulfilled and onRejected are only called once.
*
* Makes no guarantees about asynchrony.
*/
function executePromiseTask(promise, fn) {
    // Promise Resolution Procedure:
    // https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    try {
        fn(function (value) {
            if (promise._state !== null)
                return; // Already settled
            if (value === promise)
                throw new TypeError('A promise cannot be resolved with itself.');
            var shouldExecuteTick = promise._lib && beginMicroTickScope();
            if (value && typeof value.then === 'function') {
                executePromiseTask(promise, function (resolve, reject) {
                    value instanceof Promise ?
                        value._then(resolve, reject) :
                        value.then(resolve, reject);
                });
            }
            else {
                promise._state = true;
                promise._value = value;
                propagateAllListeners(promise);
            }
            if (shouldExecuteTick)
                endMicroTickScope();
        }, handleRejection.bind(null, promise)); // If Function.bind is not supported. Exception is handled in catch below
    }
    catch (ex) {
        handleRejection(promise, ex);
    }
}
function handleRejection(promise, reason) {
    rejectingErrors.push(reason);
    if (promise._state !== null)
        return;
    var shouldExecuteTick = promise._lib && beginMicroTickScope();
    reason = rejectionMapper(reason);
    promise._state = false;
    promise._value = reason;
    debug && reason !== null && typeof reason === 'object' && !reason._promise && tryCatch(function () {
        var origProp = getPropertyDescriptor(reason, "stack");
        reason._promise = promise;
        setProp(reason, "stack", {
            get: function () {
                return stack_being_generated ?
                    origProp && (origProp.get ?
                        origProp.get.apply(reason) :
                        origProp.value) :
                    promise.stack;
            }
        });
    });
    // Add the failure to a list of possibly uncaught errors
    addPossiblyUnhandledError(promise);
    propagateAllListeners(promise);
    if (shouldExecuteTick)
        endMicroTickScope();
}
function propagateAllListeners(promise) {
    //debug && linkToPreviousPromise(promise);
    var listeners = promise._listeners;
    promise._listeners = [];
    for (var i = 0, len = listeners.length; i < len; ++i) {
        propagateToListener(promise, listeners[i]);
    }
    var psd = promise._PSD;
    --psd.ref || psd.finalize(); // if psd.ref reaches zero, call psd.finalize();
    if (numScheduledCalls === 0) {
        // If numScheduledCalls is 0, it means that our stack is not in a callback of a scheduled call,
        // and that no deferreds where listening to this rejection or success.
        // Since there is a risk that our stack can contain application code that may
        // do stuff after this code is finished that may generate new calls, we cannot
        // call finalizers here.
        ++numScheduledCalls;
        asap$1(function () {
            if (--numScheduledCalls === 0)
                finalizePhysicalTick(); // Will detect unhandled errors
        }, []);
    }
}
function propagateToListener(promise, listener) {
    if (promise._state === null) {
        promise._listeners.push(listener);
        return;
    }
    var cb = promise._state ? listener.onFulfilled : listener.onRejected;
    if (cb === null) {
        // This Listener doesnt have a listener for the event being triggered (onFulfilled or onReject) so lets forward the event to any eventual listeners on the Promise instance returned by then() or catch()
        return (promise._state ? listener.resolve : listener.reject)(promise._value);
    }
    ++listener.psd.ref;
    ++numScheduledCalls;
    asap$1(callListener, [cb, promise, listener]);
}
function callListener(cb, promise, listener) {
    try {
        // Set static variable currentFulfiller to the promise that is being fullfilled,
        // so that we connect the chain of promises (for long stacks support)
        currentFulfiller = promise;
        // Call callback and resolve our listener with it's return value.
        var ret, value = promise._value;
        if (promise._state) {
            // cb is onResolved
            ret = cb(value);
        }
        else {
            // cb is onRejected
            if (rejectingErrors.length)
                rejectingErrors = [];
            ret = cb(value);
            if (rejectingErrors.indexOf(value) === -1)
                markErrorAsHandled(promise); // Callback didnt do Promise.reject(err) nor reject(err) onto another promise.
        }
        listener.resolve(ret);
    }
    catch (e) {
        // Exception thrown in callback. Reject our listener.
        listener.reject(e);
    }
    finally {
        // Restore env and currentFulfiller.
        currentFulfiller = null;
        if (--numScheduledCalls === 0)
            finalizePhysicalTick();
        --listener.psd.ref || listener.psd.finalize();
    }
}
function getStack(promise, stacks, limit) {
    if (stacks.length === limit)
        return stacks;
    var stack = "";
    if (promise._state === false) {
        var failure = promise._value, errorName, message;
        if (failure != null) {
            errorName = failure.name || "Error";
            message = failure.message || failure;
            stack = prettyStack(failure, 0);
        }
        else {
            errorName = failure; // If error is undefined or null, show that.
            message = "";
        }
        stacks.push(errorName + (message ? ": " + message : "") + stack);
    }
    if (debug) {
        stack = prettyStack(promise._stackHolder, 2);
        if (stack && stacks.indexOf(stack) === -1)
            stacks.push(stack);
        if (promise._prev)
            getStack(promise._prev, stacks, limit);
    }
    return stacks;
}
function linkToPreviousPromise(promise, prev) {
    // Support long stacks by linking to previous completed promise.
    var numPrev = prev ? prev._numPrev + 1 : 0;
    if (numPrev < LONG_STACKS_CLIP_LIMIT) {
        promise._prev = prev;
        promise._numPrev = numPrev;
    }
}
/* The callback to schedule with setImmediate() or setTimeout().
   It runs a virtual microtick and executes any callback registered in microtickQueue.
 */
function physicalTick() {
    beginMicroTickScope() && endMicroTickScope();
}
function beginMicroTickScope() {
    var wasRootExec = isOutsideMicroTick;
    isOutsideMicroTick = false;
    needsNewPhysicalTick = false;
    return wasRootExec;
}
/* Executes micro-ticks without doing try..catch.
   This can be possible because we only use this internally and
   the registered functions are exception-safe (they do try..catch
   internally before calling any external method). If registering
   functions in the microtickQueue that are not exception-safe, this
   would destroy the framework and make it instable. So we don't export
   our asap method.
*/
function endMicroTickScope() {
    var callbacks, i, l;
    do {
        while (microtickQueue.length > 0) {
            callbacks = microtickQueue;
            microtickQueue = [];
            l = callbacks.length;
            for (i = 0; i < l; ++i) {
                var item = callbacks[i];
                item[0].apply(null, item[1]);
            }
        }
    } while (microtickQueue.length > 0);
    isOutsideMicroTick = true;
    needsNewPhysicalTick = true;
}
function finalizePhysicalTick() {
    var unhandledErrs = unhandledErrors;
    unhandledErrors = [];
    unhandledErrs.forEach(function (p) {
        p._PSD.onunhandled.call(null, p._value, p);
    });
    var finalizers = tickFinalizers.slice(0); // Clone first because finalizer may remove itself from list.
    var i = finalizers.length;
    while (i)
        finalizers[--i]();
}
function run_at_end_of_this_or_next_physical_tick(fn) {
    function finalizer() {
        fn();
        tickFinalizers.splice(tickFinalizers.indexOf(finalizer), 1);
    }
    tickFinalizers.push(finalizer);
    ++numScheduledCalls;
    asap$1(function () {
        if (--numScheduledCalls === 0)
            finalizePhysicalTick();
    }, []);
}
function addPossiblyUnhandledError(promise) {
    // Only add to unhandledErrors if not already there. The first one to add to this list
    // will be upon the first rejection so that the root cause (first promise in the
    // rejection chain) is the one listed.
    if (!unhandledErrors.some(function (p) { return p._value === promise._value; }))
        unhandledErrors.push(promise);
}
function markErrorAsHandled(promise) {
    // Called when a reject handled is actually being called.
    // Search in unhandledErrors for any promise whos _value is this promise_value (list
    // contains only rejected promises, and only one item per error)
    var i = unhandledErrors.length;
    while (i)
        if (unhandledErrors[--i]._value === promise._value) {
            // Found a promise that failed with this same error object pointer,
            // Remove that since there is a listener that actually takes care of it.
            unhandledErrors.splice(i, 1);
            return;
        }
}
function PromiseReject(reason) {
    return new Promise(INTERNAL, false, reason);
}
function wrap(fn, errorCatcher) {
    var psd = PSD;
    return function () {
        var wasRootExec = beginMicroTickScope(), outerScope = PSD;
        try {
            switchToZone(psd, true);
            return fn.apply(this, arguments);
        }
        catch (e) {
            errorCatcher && errorCatcher(e);
        }
        finally {
            switchToZone(outerScope, false);
            if (wasRootExec)
                endMicroTickScope();
        }
    };
}
//
// variables used for native await support
//
var task = { awaits: 0, echoes: 0, id: 0 }; // The ongoing macro-task when using zone-echoing.
var taskCounter = 0; // ID counter for macro tasks.
var zoneStack = []; // Stack of left zones to restore asynchronically.
var zoneEchoes = 0; // zoneEchoes is a must in order to persist zones between native await expressions.
var totalEchoes = 0; // ID counter for micro-tasks. Used to detect possible native await in our Promise.prototype.then.
var zone_id_counter = 0;
function newScope(fn, props$$1, a1, a2) {
    var parent = PSD, psd = Object.create(parent);
    psd.parent = parent;
    psd.ref = 0;
    psd.global = false;
    psd.id = ++zone_id_counter;
    // Prepare for promise patching (done in usePSD):
    var globalEnv = globalPSD.env;
    psd.env = patchGlobalPromise ? {
        Promise: Promise,
        PromiseProp: { value: Promise, configurable: true, writable: true },
        all: Promise.all,
        race: Promise.race,
        resolve: Promise.resolve,
        reject: Promise.reject,
        nthen: getPatchedPromiseThen(globalEnv.nthen, psd),
        gthen: getPatchedPromiseThen(globalEnv.gthen, psd) // global then
    } : {};
    if (props$$1)
        extend(psd, props$$1);
    // unhandleds and onunhandled should not be specifically set here.
    // Leave them on parent prototype.
    // unhandleds.push(err) will push to parent's prototype
    // onunhandled() will call parents onunhandled (with this scope's this-pointer though!)
    ++parent.ref;
    psd.finalize = function () {
        --this.parent.ref || this.parent.finalize();
    };
    var rv = usePSD(psd, fn, a1, a2);
    if (psd.ref === 0)
        psd.finalize();
    return rv;
}
// Function to call if scopeFunc returns NativePromise
// Also for each NativePromise in the arguments to Promise.all()
function incrementExpectedAwaits() {
    if (!task.id)
        task.id = ++taskCounter;
    ++task.awaits;
    task.echoes += ZONE_ECHO_LIMIT;
    return task.id;
}
// Function to call when 'then' calls back on a native promise where onAwaitExpected() had been called.
// Also call this when a native await calls then method on a promise. In that case, don't supply
// sourceTaskId because we already know it refers to current task.
function decrementExpectedAwaits(sourceTaskId) {
    if (!task.awaits || (sourceTaskId && sourceTaskId !== task.id))
        return;
    if (--task.awaits === 0)
        task.id = 0;
    task.echoes = task.awaits * ZONE_ECHO_LIMIT; // Will reset echoes to 0 if awaits is 0.
}
// Call from Promise.all() and Promise.race()
function onPossibleParallellAsync(possiblePromise) {
    if (task.echoes && possiblePromise && possiblePromise.constructor === NativePromise) {
        incrementExpectedAwaits();
        return possiblePromise.then(function (x) {
            decrementExpectedAwaits();
            return x;
        }, function (e) {
            decrementExpectedAwaits();
            return rejection(e);
        });
    }
    return possiblePromise;
}
function zoneEnterEcho(targetZone) {
    ++totalEchoes;
    if (!task.echoes || --task.echoes === 0) {
        task.echoes = task.id = 0; // Cancel zone echoing.
    }
    zoneStack.push(PSD);
    switchToZone(targetZone, true);
}
function zoneLeaveEcho() {
    var zone = zoneStack[zoneStack.length - 1];
    zoneStack.pop();
    switchToZone(zone, false);
}
function switchToZone(targetZone, bEnteringZone) {
    var currentZone = PSD;
    if (bEnteringZone ? task.echoes && (!zoneEchoes++ || targetZone !== PSD) : zoneEchoes && (!--zoneEchoes || targetZone !== PSD)) {
        // Enter or leave zone asynchronically as well, so that tasks initiated during current tick
        // will be surrounded by the zone when they are invoked.
        enqueueNativeMicroTask(bEnteringZone ? zoneEnterEcho.bind(null, targetZone) : zoneLeaveEcho);
    }
    if (targetZone === PSD)
        return;
    PSD = targetZone; // The actual zone switch occurs at this line.
    // Snapshot on every leave from global zone.
    if (currentZone === globalPSD)
        globalPSD.env = snapShot();
    if (patchGlobalPromise) {
        // Let's patch the global and native Promises (may be same or may be different)
        var GlobalPromise = globalPSD.env.Promise;
        // Swich environments (may be PSD-zone or the global zone. Both apply.)
        var targetEnv = targetZone.env;
        // Change Promise.prototype.then for native and global Promise (they MAY differ on polyfilled environments, but both can be accessed)
        // Must be done on each zone change because the patched method contains targetZone in its closure.
        nativePromiseProto.then = targetEnv.nthen;
        GlobalPromise.prototype.then = targetEnv.gthen;
        if (currentZone.global || targetZone.global) {
            // Leaving or entering global zone. It's time to patch / restore global Promise.
            // Set this Promise to window.Promise so that transiled async functions will work on Firefox, Safari and IE, as well as with Zonejs and angular.
            Object.defineProperty(_global, 'Promise', targetEnv.PromiseProp);
            // Support Promise.all() etc to work indexedDB-safe also when people are including es6-promise as a module (they might
            // not be accessing global.Promise but a local reference to it)
            GlobalPromise.all = targetEnv.all;
            GlobalPromise.race = targetEnv.race;
            GlobalPromise.resolve = targetEnv.resolve;
            GlobalPromise.reject = targetEnv.reject;
        }
    }
}
function snapShot() {
    var GlobalPromise = _global.Promise;
    return patchGlobalPromise ? {
        Promise: GlobalPromise,
        PromiseProp: Object.getOwnPropertyDescriptor(_global, "Promise"),
        all: GlobalPromise.all,
        race: GlobalPromise.race,
        resolve: GlobalPromise.resolve,
        reject: GlobalPromise.reject,
        nthen: nativePromiseProto.then,
        gthen: GlobalPromise.prototype.then
    } : {};
}
function usePSD(psd, fn, a1, a2, a3) {
    var outerScope = PSD;
    try {
        switchToZone(psd, true);
        return fn(a1, a2, a3);
    }
    finally {
        switchToZone(outerScope, false);
    }
}
function enqueueNativeMicroTask(job) {
    //
    // Precondition: nativePromiseThen !== undefined
    //
    nativePromiseThen.call(resolvedNativePromise, job);
}
function nativeAwaitCompatibleWrap(fn, zone, possibleAwait) {
    return typeof fn !== 'function' ? fn : function () {
        var outerZone = PSD;
        if (possibleAwait)
            incrementExpectedAwaits();
        switchToZone(zone, true);
        try {
            return fn.apply(this, arguments);
        }
        finally {
            switchToZone(outerZone, false);
        }
    };
}
function getPatchedPromiseThen(origThen, zone) {
    return function (onResolved, onRejected) {
        return origThen.call(this, nativeAwaitCompatibleWrap(onResolved, zone, false), nativeAwaitCompatibleWrap(onRejected, zone, false));
    };
}
var UNHANDLEDREJECTION = "unhandledrejection";
function globalError(err, promise) {
    var rv;
    try {
        rv = promise.onuncatched(err);
    }
    catch (e) { }
    if (rv !== false)
        try {
            var event, eventData = { promise: promise, reason: err };
            if (_global.document && document.createEvent) {
                event = document.createEvent('Event');
                event.initEvent(UNHANDLEDREJECTION, true, true);
                extend(event, eventData);
            }
            else if (_global.CustomEvent) {
                event = new CustomEvent(UNHANDLEDREJECTION, { detail: eventData });
                extend(event, eventData);
            }
            if (event && _global.dispatchEvent) {
                dispatchEvent(event);
                if (!_global.PromiseRejectionEvent && _global.onunhandledrejection)
                    // No native support for PromiseRejectionEvent but user has set window.onunhandledrejection. Manually call it.
                    try {
                        _global.onunhandledrejection(event);
                    }
                    catch (_) { }
            }
            if (!event.defaultPrevented) {
                console.warn("Unhandled rejection: " + (err.stack || err));
            }
        }
        catch (e) { }
}
var rejection = Promise.reject;

function Events(ctx) {
    var evs = {};
    var rv = function (eventName, subscriber) {
        if (subscriber) {
            // Subscribe. If additional arguments than just the subscriber was provided, forward them as well.
            var i = arguments.length, args = new Array(i - 1);
            while (--i)
                args[i - 1] = arguments[i];
            evs[eventName].subscribe.apply(null, args);
            return ctx;
        }
        else if (typeof (eventName) === 'string') {
            // Return interface allowing to fire or unsubscribe from event
            return evs[eventName];
        }
    };
    rv.addEventType = add;
    for (var i = 1, l = arguments.length; i < l; ++i) {
        add(arguments[i]);
    }
    return rv;
    function add(eventName, chainFunction, defaultFunction) {
        if (typeof eventName === 'object')
            return addConfiguredEvents(eventName);
        if (!chainFunction)
            chainFunction = reverseStoppableEventChain;
        if (!defaultFunction)
            defaultFunction = nop;
        var context = {
            subscribers: [],
            fire: defaultFunction,
            subscribe: function (cb) {
                if (context.subscribers.indexOf(cb) === -1) {
                    context.subscribers.push(cb);
                    context.fire = chainFunction(context.fire, cb);
                }
            },
            unsubscribe: function (cb) {
                context.subscribers = context.subscribers.filter(function (fn) { return fn !== cb; });
                context.fire = context.subscribers.reduce(chainFunction, defaultFunction);
            }
        };
        evs[eventName] = rv[eventName] = context;
        return context;
    }
    function addConfiguredEvents(cfg) {
        // events(this, {reading: [functionChain, nop]});
        keys(cfg).forEach(function (eventName) {
            var args = cfg[eventName];
            if (isArray(args)) {
                add(eventName, cfg[eventName][0], cfg[eventName][1]);
            }
            else if (args === 'asap') {
                // Rather than approaching event subscription using a functional approach, we here do it in a for-loop where subscriber is executed in its own stack
                // enabling that any exception that occur wont disturb the initiator and also not nescessary be catched and forgotten.
                var context = add(eventName, mirror, function fire() {
                    // Optimazation-safe cloning of arguments into args.
                    var i = arguments.length, args = new Array(i);
                    while (i--)
                        args[i] = arguments[i];
                    // All each subscriber:
                    context.subscribers.forEach(function (fn) {
                        asap(function fireEvent() {
                            fn.apply(null, args);
                        });
                    });
                });
            }
            else
                throw new exceptions.InvalidArgument("Invalid event config");
        });
    }
}

/*
 * Dexie.js - a minimalistic wrapper for IndexedDB
 * ===============================================
 *
 * Copyright (c) 2014-2017 David Fahlander
 *
 * Version {version}, {date}
 *
 * http://dexie.org
 *
 * Apache License Version 2.0, January 2004, http://www.apache.org/licenses/LICENSE-2.0
 *
 */
var DEXIE_VERSION = '{version}';
var maxString = String.fromCharCode(65535);
var maxKey = (function () { try {
    IDBKeyRange.only([[]]);
    return [[]];
}
catch (e) {
    return maxString;
} })();
var minKey = -Infinity;
var INVALID_KEY_ARGUMENT = "Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.";
var STRING_EXPECTED = "String expected.";
var connections = [];
var isIEOrEdge = typeof navigator !== 'undefined' && /(MSIE|Trident|Edge)/.test(navigator.userAgent);
var hasIEDeleteObjectStoreBug = isIEOrEdge;
var hangsOnDeleteLargeKeyRange = isIEOrEdge;
var dexieStackFrameFilter = function (frame) { return !/(dexie\.js|dexie\.min\.js)/.test(frame); };
var dbNamesDB; // Global database for backing Dexie.getDatabaseNames() on browser without indexedDB.webkitGetDatabaseNames() 
// Init debug
setDebug(debug, dexieStackFrameFilter);
function Dexie(dbName, options) {
    /// <param name="options" type="Object" optional="true">Specify only if you wich to control which addons that should run on this instance</param>
    var deps = Dexie.dependencies;
    var opts = extend({
        // Default Options
        addons: Dexie.addons,
        autoOpen: true,
        indexedDB: deps.indexedDB,
        IDBKeyRange: deps.IDBKeyRange // Backend IDBKeyRange api. Default to browser env.
    }, options);
    var addons = opts.addons, autoOpen = opts.autoOpen, indexedDB = opts.indexedDB, IDBKeyRange = opts.IDBKeyRange;
    var globalSchema = this._dbSchema = {};
    var versions = [];
    var dbStoreNames = [];
    var allTables = {};
    ///<var type="IDBDatabase" />
    var idbdb = null; // Instance of IDBDatabase
    var dbOpenError = null;
    var isBeingOpened = false;
    var onReadyBeingFired = null;
    var openComplete = false;
    var READONLY = "readonly", READWRITE = "readwrite";
    var db = this;
    var dbReadyResolve, dbReadyPromise = new Promise(function (resolve) {
        dbReadyResolve = resolve;
    }), cancelOpen, openCanceller = new Promise(function (_, reject) {
        cancelOpen = reject;
    });
    var autoSchema = true;
    var hasNativeGetDatabaseNames = !!getNativeGetDatabaseNamesFn(indexedDB), hasGetAll;
    function init() {
        // Default subscribers to "versionchange" and "blocked".
        // Can be overridden by custom handlers. If custom handlers return false, these default
        // behaviours will be prevented.
        db.on("versionchange", function (ev) {
            // Default behavior for versionchange event is to close database connection.
            // Caller can override this behavior by doing db.on("versionchange", function(){ return false; });
            // Let's not block the other window from making it's delete() or open() call.
            // NOTE! This event is never fired in IE,Edge or Safari.
            if (ev.newVersion > 0)
                console.warn("Another connection wants to upgrade database '" + db.name + "'. Closing db now to resume the upgrade.");
            else
                console.warn("Another connection wants to delete database '" + db.name + "'. Closing db now to resume the delete request.");
            db.close();
            // In many web applications, it would be recommended to force window.reload()
            // when this event occurs. To do that, subscribe to the versionchange event
            // and call window.location.reload(true) if ev.newVersion > 0 (not a deletion)
            // The reason for this is that your current web app obviously has old schema code that needs
            // to be updated. Another window got a newer version of the app and needs to upgrade DB but
            // your window is blocking it unless we close it here.
        });
        db.on("blocked", function (ev) {
            if (!ev.newVersion || ev.newVersion < ev.oldVersion)
                console.warn("Dexie.delete('" + db.name + "') was blocked");
            else
                console.warn("Upgrade '" + db.name + "' blocked by other connection holding version " + ev.oldVersion / 10);
        });
    }
    //
    //
    //
    // ------------------------- Versioning Framework---------------------------
    //
    //
    //
    this.version = function (versionNumber) {
        /// <param name="versionNumber" type="Number"></param>
        /// <returns type="Version"></returns>
        if (idbdb || isBeingOpened)
            throw new exceptions.Schema("Cannot add version when database is open");
        this.verno = Math.max(this.verno, versionNumber);
        var versionInstance = versions.filter(function (v) { return v._cfg.version === versionNumber; })[0];
        if (versionInstance)
            return versionInstance;
        versionInstance = new Version(versionNumber);
        versions.push(versionInstance);
        versions.sort(lowerVersionFirst);
        // Disable autoschema mode, as at least one version is specified.
        autoSchema = false;
        return versionInstance;
    };
    function Version(versionNumber) {
        this._cfg = {
            version: versionNumber,
            storesSource: null,
            dbschema: {},
            tables: {},
            contentUpgrade: null
        };
        this.stores({}); // Derive earlier schemas by default.
    }
    extend(Version.prototype, {
        stores: function (stores) {
            /// <summary>
            ///   Defines the schema for a particular version
            /// </summary>
            /// <param name="stores" type="Object">
            /// Example: <br/>
            ///   {users: "id++,first,last,&amp;username,*email", <br/>
            ///   passwords: "id++,&amp;username"}<br/>
            /// <br/>
            /// Syntax: {Table: "[primaryKey][++],[&amp;][*]index1,[&amp;][*]index2,..."}<br/><br/>
            /// Special characters:<br/>
            ///  "&amp;"  means unique key, <br/>
            ///  "*"  means value is multiEntry, <br/>
            ///  "++" means auto-increment and only applicable for primary key <br/>
            /// </param>
            this._cfg.storesSource = this._cfg.storesSource ? extend(this._cfg.storesSource, stores) : stores;
            // Derive stores from earlier versions if they are not explicitely specified as null or a new syntax.
            var storesSpec = {};
            versions.forEach(function (version) {
                extend(storesSpec, version._cfg.storesSource);
            });
            var dbschema = (this._cfg.dbschema = {});
            this._parseStoresSpec(storesSpec, dbschema);
            // Update the latest schema to this version
            // Update API
            globalSchema = db._dbSchema = dbschema;
            removeTablesApi([allTables, db, Transaction.prototype]); // Keep Transaction.prototype even though it should be depr.
            setApiOnPlace([allTables, db, Transaction.prototype, this._cfg.tables], keys(dbschema), dbschema);
            dbStoreNames = keys(dbschema);
            return this;
        },
        upgrade: function (upgradeFunction) {
            this._cfg.contentUpgrade = upgradeFunction;
            return this;
        },
        _parseStoresSpec: function (stores, outSchema) {
            keys(stores).forEach(function (tableName) {
                if (stores[tableName] !== null) {
                    var instanceTemplate = {};
                    var indexes = parseIndexSyntax(stores[tableName]);
                    var primKey = indexes.shift();
                    if (primKey.multi)
                        throw new exceptions.Schema("Primary key cannot be multi-valued");
                    if (primKey.keyPath)
                        setByKeyPath(instanceTemplate, primKey.keyPath, primKey.auto ? 0 : primKey.keyPath);
                    indexes.forEach(function (idx) {
                        if (idx.auto)
                            throw new exceptions.Schema("Only primary key can be marked as autoIncrement (++)");
                        if (!idx.keyPath)
                            throw new exceptions.Schema("Index must have a name and cannot be an empty string");
                        setByKeyPath(instanceTemplate, idx.keyPath, idx.compound ? idx.keyPath.map(function () { return ""; }) : "");
                    });
                    outSchema[tableName] = new TableSchema(tableName, primKey, indexes, instanceTemplate);
                }
            });
        }
    });
    function runUpgraders(oldVersion, idbtrans, reject) {
        var trans = db._createTransaction(READWRITE, dbStoreNames, globalSchema);
        trans.create(idbtrans);
        trans._completion.catch(reject);
        var rejectTransaction = trans._reject.bind(trans);
        newScope(function () {
            PSD.trans = trans;
            if (oldVersion === 0) {
                // Create tables:
                keys(globalSchema).forEach(function (tableName) {
                    createTable(idbtrans, tableName, globalSchema[tableName].primKey, globalSchema[tableName].indexes);
                });
                Promise.follow(function () { return db.on.populate.fire(trans); }).catch(rejectTransaction);
            }
            else
                updateTablesAndIndexes(oldVersion, trans, idbtrans).catch(rejectTransaction);
        });
    }
    function updateTablesAndIndexes(oldVersion, trans, idbtrans) {
        // Upgrade version to version, step-by-step from oldest to newest version.
        // Each transaction object will contain the table set that was current in that version (but also not-yet-deleted tables from its previous version)
        var queue = [];
        var oldVersionStruct = versions.filter(function (version) { return version._cfg.version === oldVersion; })[0];
        if (!oldVersionStruct)
            throw new exceptions.Upgrade("Dexie specification of currently installed DB version is missing");
        globalSchema = db._dbSchema = oldVersionStruct._cfg.dbschema;
        var anyContentUpgraderHasRun = false;
        var versToRun = versions.filter(function (v) { return v._cfg.version > oldVersion; });
        versToRun.forEach(function (version) {
            /// <param name="version" type="Version"></param>
            queue.push(function () {
                var oldSchema = globalSchema;
                var newSchema = version._cfg.dbschema;
                adjustToExistingIndexNames(oldSchema, idbtrans);
                adjustToExistingIndexNames(newSchema, idbtrans);
                globalSchema = db._dbSchema = newSchema;
                var diff = getSchemaDiff(oldSchema, newSchema);
                // Add tables           
                diff.add.forEach(function (tuple) {
                    createTable(idbtrans, tuple[0], tuple[1].primKey, tuple[1].indexes);
                });
                // Change tables
                diff.change.forEach(function (change) {
                    if (change.recreate) {
                        throw new exceptions.Upgrade("Not yet support for changing primary key");
                    }
                    else {
                        var store = idbtrans.objectStore(change.name);
                        // Add indexes
                        change.add.forEach(function (idx) {
                            addIndex(store, idx);
                        });
                        // Update indexes
                        change.change.forEach(function (idx) {
                            store.deleteIndex(idx.name);
                            addIndex(store, idx);
                        });
                        // Delete indexes
                        change.del.forEach(function (idxName) {
                            store.deleteIndex(idxName);
                        });
                    }
                });
                if (version._cfg.contentUpgrade) {
                    anyContentUpgraderHasRun = true;
                    return Promise.follow(function () {
                        version._cfg.contentUpgrade(trans);
                    });
                }
            });
            queue.push(function (idbtrans) {
                if (!anyContentUpgraderHasRun || !hasIEDeleteObjectStoreBug) {
                    var newSchema = version._cfg.dbschema;
                    // Delete old tables
                    deleteRemovedTables(newSchema, idbtrans);
                }
            });
        });
        // Now, create a queue execution engine
        function runQueue() {
            return queue.length ? Promise.resolve(queue.shift()(trans.idbtrans)).then(runQueue) :
                Promise.resolve();
        }
        return runQueue().then(function () {
            createMissingTables(globalSchema, idbtrans); // At last, make sure to create any missing tables. (Needed by addons that add stores to DB without specifying version)
        });
    }
    function getSchemaDiff(oldSchema, newSchema) {
        var diff = {
            del: [],
            add: [],
            change: [] // Array of {name: tableName, recreate: newDefinition, del: delIndexNames, add: newIndexDefs, change: changedIndexDefs}
        };
        for (var table in oldSchema) {
            if (!newSchema[table])
                diff.del.push(table);
        }
        for (table in newSchema) {
            var oldDef = oldSchema[table], newDef = newSchema[table];
            if (!oldDef) {
                diff.add.push([table, newDef]);
            }
            else {
                var change = {
                    name: table,
                    def: newDef,
                    recreate: false,
                    del: [],
                    add: [],
                    change: []
                };
                if (oldDef.primKey.src !== newDef.primKey.src) {
                    // Primary key has changed. Remove and re-add table.
                    change.recreate = true;
                    diff.change.push(change);
                }
                else {
                    // Same primary key. Just find out what differs:
                    var oldIndexes = oldDef.idxByName;
                    var newIndexes = newDef.idxByName;
                    for (var idxName in oldIndexes) {
                        if (!newIndexes[idxName])
                            change.del.push(idxName);
                    }
                    for (idxName in newIndexes) {
                        var oldIdx = oldIndexes[idxName], newIdx = newIndexes[idxName];
                        if (!oldIdx)
                            change.add.push(newIdx);
                        else if (oldIdx.src !== newIdx.src)
                            change.change.push(newIdx);
                    }
                    if (change.del.length > 0 || change.add.length > 0 || change.change.length > 0) {
                        diff.change.push(change);
                    }
                }
            }
        }
        return diff;
    }
    function createTable(idbtrans, tableName, primKey, indexes) {
        /// <param name="idbtrans" type="IDBTransaction"></param>
        var store = idbtrans.db.createObjectStore(tableName, primKey.keyPath ? { keyPath: primKey.keyPath, autoIncrement: primKey.auto } : { autoIncrement: primKey.auto });
        indexes.forEach(function (idx) { addIndex(store, idx); });
        return store;
    }
    function createMissingTables(newSchema, idbtrans) {
        keys(newSchema).forEach(function (tableName) {
            if (!idbtrans.db.objectStoreNames.contains(tableName)) {
                createTable(idbtrans, tableName, newSchema[tableName].primKey, newSchema[tableName].indexes);
            }
        });
    }
    function deleteRemovedTables(newSchema, idbtrans) {
        for (var i = 0; i < idbtrans.db.objectStoreNames.length; ++i) {
            var storeName = idbtrans.db.objectStoreNames[i];
            if (newSchema[storeName] == null) {
                idbtrans.db.deleteObjectStore(storeName);
            }
        }
    }
    function addIndex(store, idx) {
        store.createIndex(idx.name, idx.keyPath, { unique: idx.unique, multiEntry: idx.multi });
    }
    //
    //
    //      Dexie Protected API
    //
    //
    this._allTables = allTables;
    this._createTransaction = function (mode, storeNames, dbschema, parentTransaction) {
        return new Transaction(mode, storeNames, dbschema, parentTransaction);
    };
    /* Generate a temporary transaction when db operations are done outside a transaction scope.
    */
    function tempTransaction(mode, storeNames, fn) {
        if (!openComplete && (!PSD.letThrough)) {
            if (!isBeingOpened) {
                if (!autoOpen)
                    return rejection(new exceptions.DatabaseClosed());
                db.open().catch(nop); // Open in background. If if fails, it will be catched by the final promise anyway.
            }
            return dbReadyPromise.then(function () { return tempTransaction(mode, storeNames, fn); });
        }
        else {
            var trans = db._createTransaction(mode, storeNames, globalSchema);
            try {
                trans.create();
            }
            catch (ex) {
                return rejection(ex);
            }
            return trans._promise(mode, function (resolve, reject) {
                return newScope(function () {
                    PSD.trans = trans;
                    return fn(resolve, reject, trans);
                });
            }).then(function (result) {
                // Instead of resolving value directly, wait with resolving it until transaction has completed.
                // Otherwise the data would not be in the DB if requesting it in the then() operation.
                // Specifically, to ensure that the following expression will work:
                //
                //   db.friends.put({name: "Arne"}).then(function () {
                //       db.friends.where("name").equals("Arne").count(function(count) {
                //           assert (count === 1);
                //       });
                //   });
                //
                return trans._completion.then(function () { return result; });
            }); /*.catch(err => { // Don't do this as of now. If would affect bulk- and modify methods in a way that could be more intuitive. But wait! Maybe change in next major.
                trans._reject(err);
                return rejection(err);
            });*/
        }
    }
    this._whenReady = function (fn) {
        return openComplete || PSD.letThrough ? fn() : new Promise(function (resolve, reject) {
            if (!isBeingOpened) {
                if (!autoOpen) {
                    reject(new exceptions.DatabaseClosed());
                    return;
                }
                db.open().catch(nop); // Open in background. If if fails, it will be catched by the final promise anyway.
            }
            dbReadyPromise.then(resolve, reject);
        }).then(fn);
    };
    //
    //
    //
    //
    //      Dexie API
    //
    //
    //
    this.verno = 0;
    this.open = function () {
        if (isBeingOpened || idbdb)
            return dbReadyPromise.then(function () { return dbOpenError ? rejection(dbOpenError) : db; });
        debug && (openCanceller._stackHolder = getErrorWithStack()); // Let stacks point to when open() was called rather than where new Dexie() was called.
        isBeingOpened = true;
        dbOpenError = null;
        openComplete = false;
        // Function pointers to call when the core opening process completes.
        var resolveDbReady = dbReadyResolve, 
        // upgradeTransaction to abort on failure.
        upgradeTransaction = null;
        return Promise.race([openCanceller, new Promise(function (resolve, reject) {
                // Multiply db.verno with 10 will be needed to workaround upgrading bug in IE:
                // IE fails when deleting objectStore after reading from it.
                // A future version of Dexie.js will stopover an intermediate version to workaround this.
                // At that point, we want to be backward compatible. Could have been multiplied with 2, but by using 10, it is easier to map the number to the real version number.
                // If no API, throw!
                if (!indexedDB)
                    throw new exceptions.MissingAPI("indexedDB API not found. If using IE10+, make sure to run your code on a server URL " +
                        "(not locally). If using old Safari versions, make sure to include indexedDB polyfill.");
                var req = autoSchema ? indexedDB.open(dbName) : indexedDB.open(dbName, Math.round(db.verno * 10));
                if (!req)
                    throw new exceptions.MissingAPI("IndexedDB API not available"); // May happen in Safari private mode, see https://github.com/dfahlander/Dexie.js/issues/134
                req.onerror = eventRejectHandler(reject);
                req.onblocked = wrap(fireOnBlocked);
                req.onupgradeneeded = wrap(function (e) {
                    upgradeTransaction = req.transaction;
                    if (autoSchema && !db._allowEmptyDB) {
                        // Caller did not specify a version or schema. Doing that is only acceptable for opening alread existing databases.
                        // If onupgradeneeded is called it means database did not exist. Reject the open() promise and make sure that we
                        // do not create a new database by accident here.
                        req.onerror = preventDefault; // Prohibit onabort error from firing before we're done!
                        upgradeTransaction.abort(); // Abort transaction (would hope that this would make DB disappear but it doesnt.)
                        // Close database and delete it.
                        req.result.close();
                        var delreq = indexedDB.deleteDatabase(dbName); // The upgrade transaction is atomic, and javascript is single threaded - meaning that there is no risk that we delete someone elses database here!
                        delreq.onsuccess = delreq.onerror = wrap(function () {
                            reject(new exceptions.NoSuchDatabase("Database " + dbName + " doesnt exist"));
                        });
                    }
                    else {
                        upgradeTransaction.onerror = eventRejectHandler(reject);
                        var oldVer = e.oldVersion > Math.pow(2, 62) ? 0 : e.oldVersion; // Safari 8 fix.
                        runUpgraders(oldVer / 10, upgradeTransaction, reject, req);
                    }
                }, reject);
                req.onsuccess = wrap(function () {
                    // Core opening procedure complete. Now let's just record some stuff.
                    upgradeTransaction = null;
                    idbdb = req.result;
                    connections.push(db); // Used for emulating versionchange event on IE/Edge/Safari.
                    if (autoSchema)
                        readGlobalSchema();
                    else if (idbdb.objectStoreNames.length > 0) {
                        try {
                            adjustToExistingIndexNames(globalSchema, idbdb.transaction(safariMultiStoreFix(idbdb.objectStoreNames), READONLY));
                        }
                        catch (e) {
                            // Safari may bail out if > 1 store names. However, this shouldnt be a showstopper. Issue #120.
                        }
                    }
                    idbdb.onversionchange = wrap(function (ev) {
                        db._vcFired = true; // detect implementations that not support versionchange (IE/Edge/Safari)
                        db.on("versionchange").fire(ev);
                    });
                    if (!hasNativeGetDatabaseNames && dbName !== '__dbnames') {
                        dbNamesDB.dbnames.put({ name: dbName }).catch(nop);
                    }
                    resolve();
                }, reject);
            })]).then(function () {
            // Before finally resolving the dbReadyPromise and this promise,
            // call and await all on('ready') subscribers:
            // Dexie.vip() makes subscribers able to use the database while being opened.
            // This is a must since these subscribers take part of the opening procedure.
            onReadyBeingFired = [];
            return Promise.resolve(Dexie.vip(db.on.ready.fire)).then(function fireRemainders() {
                if (onReadyBeingFired.length > 0) {
                    // In case additional subscribers to db.on('ready') were added during the time db.on.ready.fire was executed.
                    var remainders = onReadyBeingFired.reduce(promisableChain, nop);
                    onReadyBeingFired = [];
                    return Promise.resolve(Dexie.vip(remainders)).then(fireRemainders);
                }
            });
        }).finally(function () {
            onReadyBeingFired = null;
        }).then(function () {
            // Resolve the db.open() with the db instance.
            isBeingOpened = false;
            return db;
        }).catch(function (err) {
            try {
                // Did we fail within onupgradeneeded? Make sure to abort the upgrade transaction so it doesnt commit.
                upgradeTransaction && upgradeTransaction.abort();
            }
            catch (e) { }
            isBeingOpened = false; // Set before calling db.close() so that it doesnt reject openCanceller again (leads to unhandled rejection event).
            db.close(); // Closes and resets idbdb, removes connections, resets dbReadyPromise and openCanceller so that a later db.open() is fresh.
            // A call to db.close() may have made on-ready subscribers fail. Use dbOpenError if set, since err could be a follow-up error on that.
            dbOpenError = err; // Record the error. It will be used to reject further promises of db operations.
            return rejection(dbOpenError);
        }).finally(function () {
            openComplete = true;
            resolveDbReady(); // dbReadyPromise is resolved no matter if open() rejects or resolved. It's just to wake up waiters.
        });
    };
    this.close = function () {
        var idx = connections.indexOf(db);
        if (idx >= 0)
            connections.splice(idx, 1);
        if (idbdb) {
            try {
                idbdb.close();
            }
            catch (e) { }
            idbdb = null;
        }
        autoOpen = false;
        dbOpenError = new exceptions.DatabaseClosed();
        if (isBeingOpened)
            cancelOpen(dbOpenError);
        // Reset dbReadyPromise promise:
        dbReadyPromise = new Promise(function (resolve) {
            dbReadyResolve = resolve;
        });
        openCanceller = new Promise(function (_, reject) {
            cancelOpen = reject;
        });
    };
    this.delete = function () {
        var hasArguments = arguments.length > 0;
        return new Promise(function (resolve, reject) {
            if (hasArguments)
                throw new exceptions.InvalidArgument("Arguments not allowed in db.delete()");
            if (isBeingOpened) {
                dbReadyPromise.then(doDelete);
            }
            else {
                doDelete();
            }
            function doDelete() {
                db.close();
                var req = indexedDB.deleteDatabase(dbName);
                req.onsuccess = wrap(function () {
                    if (!hasNativeGetDatabaseNames) {
                        dbNamesDB.dbnames.delete(dbName).catch(nop);
                    }
                    resolve();
                });
                req.onerror = eventRejectHandler(reject);
                req.onblocked = fireOnBlocked;
            }
        });
    };
    this.backendDB = function () {
        return idbdb;
    };
    this.isOpen = function () {
        return idbdb !== null;
    };
    this.hasBeenClosed = function () {
        return dbOpenError && (dbOpenError instanceof exceptions.DatabaseClosed);
    };
    this.hasFailed = function () {
        return dbOpenError !== null;
    };
    this.dynamicallyOpened = function () {
        return autoSchema;
    };
    //
    // Properties
    //
    this.name = dbName;
    // db.tables - an array of all Table instances.
    props(this, {
        tables: {
            get: function () {
                /// <returns type="Array" elementType="Table" />
                return keys(allTables).map(function (name) { return allTables[name]; });
            }
        }
    });
    //
    // Events
    //
    this.on = Events(this, "populate", "blocked", "versionchange", { ready: [promisableChain, nop] });
    this.on.ready.subscribe = override(this.on.ready.subscribe, function (subscribe) {
        return function (subscriber, bSticky) {
            Dexie.vip(function () {
                if (openComplete) {
                    // Database already open. Call subscriber asap.
                    if (!dbOpenError)
                        Promise.resolve().then(subscriber);
                    // bSticky: Also subscribe to future open sucesses (after close / reopen) 
                    if (bSticky)
                        subscribe(subscriber);
                }
                else if (onReadyBeingFired) {
                    // db.on('ready') subscribers are currently being executed and have not yet resolved or rejected
                    onReadyBeingFired.push(subscriber);
                    if (bSticky)
                        subscribe(subscriber);
                }
                else {
                    // Database not yet open. Subscribe to it.
                    subscribe(subscriber);
                    // If bSticky is falsy, make sure to unsubscribe subscriber when fired once.
                    if (!bSticky)
                        subscribe(function unsubscribe() {
                            db.on.ready.unsubscribe(subscriber);
                            db.on.ready.unsubscribe(unsubscribe);
                        });
                }
            });
        };
    });
    this.transaction = function () {
        /// <summary>
        ///
        /// </summary>
        /// <param name="mode" type="String">"r" for readonly, or "rw" for readwrite</param>
        /// <param name="tableInstances">Table instance, Array of Table instances, String or String Array of object stores to include in the transaction</param>
        /// <param name="scopeFunc" type="Function">Function to execute with transaction</param>
        var args = extractTransactionArgs.apply(this, arguments);
        return this._transaction.apply(this, args);
    };
    function extractTransactionArgs(mode, _tableArgs_, scopeFunc) {
        // Let table arguments be all arguments between mode and last argument.
        var i = arguments.length;
        if (i < 2)
            throw new exceptions.InvalidArgument("Too few arguments");
        // Prevent optimzation killer (https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments)
        // and clone arguments except the first one into local var 'args'.
        var args = new Array(i - 1);
        while (--i)
            args[i - 1] = arguments[i];
        // Let scopeFunc be the last argument and pop it so that args now only contain the table arguments.
        scopeFunc = args.pop();
        var tables = flatten(args); // Support using array as middle argument, or a mix of arrays and non-arrays.
        return [mode, tables, scopeFunc];
    }
    this._transaction = function (mode, tables, scopeFunc) {
        var parentTransaction = PSD.trans;
        // Check if parent transactions is bound to this db instance, and if caller wants to reuse it
        if (!parentTransaction || parentTransaction.db !== db || mode.indexOf('!') !== -1)
            parentTransaction = null;
        var onlyIfCompatible = mode.indexOf('?') !== -1;
        mode = mode.replace('!', '').replace('?', ''); // Ok. Will change arguments[0] as well but we wont touch arguments henceforth.
        try {
            //
            // Get storeNames from arguments. Either through given table instances, or through given table names.
            //
            var storeNames = tables.map(function (table) {
                var storeName = table instanceof Table ? table.name : table;
                if (typeof storeName !== 'string')
                    throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");
                return storeName;
            });
            //
            // Resolve mode. Allow shortcuts "r" and "rw".
            //
            if (mode == "r" || mode == READONLY)
                mode = READONLY;
            else if (mode == "rw" || mode == READWRITE)
                mode = READWRITE;
            else
                throw new exceptions.InvalidArgument("Invalid transaction mode: " + mode);
            if (parentTransaction) {
                // Basic checks
                if (parentTransaction.mode === READONLY && mode === READWRITE) {
                    if (onlyIfCompatible) {
                        // Spawn new transaction instead.
                        parentTransaction = null;
                    }
                    else
                        throw new exceptions.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");
                }
                if (parentTransaction) {
                    storeNames.forEach(function (storeName) {
                        if (parentTransaction && parentTransaction.storeNames.indexOf(storeName) === -1) {
                            if (onlyIfCompatible) {
                                // Spawn new transaction instead.
                                parentTransaction = null;
                            }
                            else
                                throw new exceptions.SubTransaction("Table " + storeName +
                                    " not included in parent transaction.");
                        }
                    });
                }
                if (onlyIfCompatible && parentTransaction && !parentTransaction.active) {
                    // '?' mode should not keep using an inactive transaction.
                    parentTransaction = null;
                }
            }
        }
        catch (e) {
            return parentTransaction ?
                parentTransaction._promise(null, function (_, reject) { reject(e); }) :
                rejection(e);
        }
        // If this is a sub-transaction, lock the parent and then launch the sub-transaction.
        return (parentTransaction ?
            parentTransaction._promise(mode, enterTransactionScope, "lock") :
            PSD.trans ?
                // no parent transaction despite PSD.trans exists. Make sure also
                // that the zone we create is not a sub-zone of current, because
                // Promise.follow() should not wait for it if so.
                usePSD(PSD.transless, function () { return db._whenReady(enterTransactionScope); }) :
                db._whenReady(enterTransactionScope));
        function enterTransactionScope() {
            return Promise.resolve().then(function () {
                // Keep a pointer to last non-transactional PSD to use if someone calls Dexie.ignoreTransaction().
                var transless = PSD.transless || PSD;
                // Our transaction.
                //return new Promise((resolve, reject) => {
                var trans = db._createTransaction(mode, storeNames, globalSchema, parentTransaction);
                // Let the transaction instance be part of a Promise-specific data (PSD) value.
                var zoneProps = {
                    trans: trans,
                    transless: transless
                };
                if (parentTransaction) {
                    // Emulate transaction commit awareness for inner transaction (must 'commit' when the inner transaction has no more operations ongoing)
                    trans.idbtrans = parentTransaction.idbtrans;
                }
                else {
                    trans.create(); // Create the backend transaction so that complete() or error() will trigger even if no operation is made upon it.
                }
                // Support for native async await.
                if (scopeFunc.constructor === AsyncFunction) {
                    incrementExpectedAwaits();
                }
                var returnValue;
                var promiseFollowed = Promise.follow(function () {
                    // Finally, call the scope function with our table and transaction arguments.
                    returnValue = scopeFunc.call(trans, trans);
                    if (returnValue) {
                        if (returnValue.constructor === NativePromise) {
                            var decrementor = decrementExpectedAwaits.bind(null, null);
                            returnValue.then(decrementor, decrementor);
                        }
                        else if (typeof returnValue.next === 'function' && typeof returnValue.throw === 'function') {
                            // scopeFunc returned an iterator with throw-support. Handle yield as await.
                            returnValue = awaitIterator(returnValue);
                        }
                    }
                }, zoneProps);
                return (returnValue && typeof returnValue.then === 'function' ?
                    // Promise returned. User uses promise-style transactions.
                    Promise.resolve(returnValue).then(function (x) { return trans.active ?
                        x // Transaction still active. Continue.
                        : rejection(new exceptions.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn")); })
                    // No promise returned. Wait for all outstanding promises before continuing. 
                    : promiseFollowed.then(function () { return returnValue; })).then(function (x) {
                    // sub transactions don't react to idbtrans.oncomplete. We must trigger a completion:
                    if (parentTransaction)
                        trans._resolve();
                    // wait for trans._completion
                    // (if root transaction, this means 'complete' event. If sub-transaction, we've just fired it ourselves)
                    return trans._completion.then(function () { return x; });
                }).catch(function (e) {
                    trans._reject(e); // Yes, above then-handler were maybe not called because of an unhandled rejection in scopeFunc!
                    return rejection(e);
                });
            });
        }
    };
    this.table = function (tableName) {
        /// <returns type="Table"></returns>
        if (!hasOwn(allTables, tableName)) {
            throw new exceptions.InvalidTable("Table " + tableName + " does not exist");
        }
        return allTables[tableName];
    };
    //
    //
    //
    // Table Class
    //
    //
    //
    function Table(name, tableSchema, optionalTrans) {
        /// <param name="name" type="String"></param>
        this.name = name;
        this.schema = tableSchema;
        this._tx = optionalTrans;
        this.hook = allTables[name] ? allTables[name].hook : Events(null, {
            "creating": [hookCreatingChain, nop],
            "reading": [pureFunctionChain, mirror],
            "updating": [hookUpdatingChain, nop],
            "deleting": [hookDeletingChain, nop]
        });
    }
    function BulkErrorHandlerCatchAll(errorList, done, supportHooks) {
        return (supportHooks ? hookedEventRejectHandler : eventRejectHandler)(function (e) {
            errorList.push(e);
            done && done();
        });
    }
    function bulkDelete(idbstore, trans, keysOrTuples, hasDeleteHook, deletingHook) {
        // If hasDeleteHook, keysOrTuples must be an array of tuples: [[key1, value2],[key2,value2],...],
        // else keysOrTuples must be just an array of keys: [key1, key2, ...].
        return new Promise(function (resolve, reject) {
            var len = keysOrTuples.length, lastItem = len - 1;
            if (len === 0)
                return resolve();
            if (!hasDeleteHook) {
                for (var i = 0; i < len; ++i) {
                    var req = idbstore.delete(keysOrTuples[i]);
                    req.onerror = eventRejectHandler(reject);
                    if (i === lastItem)
                        req.onsuccess = wrap(function () { return resolve(); });
                }
            }
            else {
                var hookCtx, errorHandler = hookedEventRejectHandler(reject), successHandler = hookedEventSuccessHandler(null);
                tryCatch(function () {
                    for (var i = 0; i < len; ++i) {
                        hookCtx = { onsuccess: null, onerror: null };
                        var tuple = keysOrTuples[i];
                        deletingHook.call(hookCtx, tuple[0], tuple[1], trans);
                        var req = idbstore.delete(tuple[0]);
                        req._hookCtx = hookCtx;
                        req.onerror = errorHandler;
                        if (i === lastItem)
                            req.onsuccess = hookedEventSuccessHandler(resolve);
                        else
                            req.onsuccess = successHandler;
                    }
                }, function (err) {
                    hookCtx.onerror && hookCtx.onerror(err);
                    throw err;
                });
            }
        });
    }
    props(Table.prototype, {
        //
        // Table Protected Methods
        //
        _trans: function getTransaction(mode, fn, writeLocked) {
            var trans = this._tx || PSD.trans;
            return trans && trans.db === db ?
                trans === PSD.trans ?
                    trans._promise(mode, fn, writeLocked) :
                    newScope(function () { return trans._promise(mode, fn, writeLocked); }, { trans: trans, transless: PSD.transless || PSD }) :
                tempTransaction(mode, [this.name], fn);
        },
        _idbstore: function getIDBObjectStore(mode, fn, writeLocked) {
            var tableName = this.name;
            function supplyIdbStore(resolve, reject, trans) {
                if (trans.storeNames.indexOf(tableName) === -1)
                    throw new exceptions.NotFound("Table" + tableName + " not part of transaction");
                return fn(resolve, reject, trans.idbtrans.objectStore(tableName), trans);
            }
            return this._trans(mode, supplyIdbStore, writeLocked);
        },
        //
        // Table Public Methods
        //
        get: function (keyOrCrit, cb) {
            if (keyOrCrit && keyOrCrit.constructor === Object)
                return this.where(keyOrCrit).first(cb);
            var self = this;
            return this._idbstore(READONLY, function (resolve, reject, idbstore) {
                var req = idbstore.get(keyOrCrit);
                req.onerror = eventRejectHandler(reject);
                req.onsuccess = wrap(function () {
                    resolve(self.hook.reading.fire(req.result));
                }, reject);
            }).then(cb);
        },
        where: function (indexOrCrit) {
            if (typeof indexOrCrit === 'string')
                return new WhereClause(this, indexOrCrit);
            if (isArray(indexOrCrit))
                return new WhereClause(this, "[" + indexOrCrit.join('+') + "]");
            // indexOrCrit is an object map of {[keyPath]:value} 
            var keyPaths = keys(indexOrCrit);
            if (keyPaths.length === 1)
                // Only one critera. This was the easy case:
                return this
                    .where(keyPaths[0])
                    .equals(indexOrCrit[keyPaths[0]]);
            // Multiple criterias.
            // Let's try finding a compound index that matches all keyPaths in
            // arbritary order:
            var compoundIndex = this.schema.indexes.concat(this.schema.primKey).filter(function (ix) {
                return ix.compound &&
                    keyPaths.every(function (keyPath) { return ix.keyPath.indexOf(keyPath) >= 0; }) &&
                    ix.keyPath.every(function (keyPath) { return keyPaths.indexOf(keyPath) >= 0; });
            })[0];
            if (compoundIndex && maxKey !== maxString)
                // Cool! We found such compound index
                // and this browser supports compound indexes (maxKey !== maxString)!
                return this
                    .where(compoundIndex.name)
                    .equals(compoundIndex.keyPath.map(function (kp) { return indexOrCrit[kp]; }));
            if (!compoundIndex)
                console.warn("The query " + JSON.stringify(indexOrCrit) + " on " + this.name + " would benefit of a " +
                    ("compound index [" + keyPaths.join('+') + "]"));
            // Ok, now let's fallback to finding at least one matching index
            // and filter the rest.
            var idxByName = this.schema.idxByName;
            var simpleIndex = keyPaths.reduce(function (r, keyPath) { return [
                r[0] || idxByName[keyPath],
                r[0] || !idxByName[keyPath] ?
                    combine(r[1], function (x) { return '' + getByKeyPath(x, keyPath) ==
                        '' + indexOrCrit[keyPath]; })
                    : r[1]
            ]; }, [null, null]);
            var idx = simpleIndex[0];
            return idx ?
                this.where(idx.name).equals(indexOrCrit[idx.keyPath])
                    .filter(simpleIndex[1]) :
                compoundIndex ?
                    this.filter(simpleIndex[1]) : // Has compound but browser bad. Allow filter.
                    this.where(keyPaths).equals(''); // No index at all. Fail lazily.
        },
        count: function (cb) {
            return this.toCollection().count(cb);
        },
        offset: function (offset) {
            return this.toCollection().offset(offset);
        },
        limit: function (numRows) {
            return this.toCollection().limit(numRows);
        },
        reverse: function () {
            return this.toCollection().reverse();
        },
        filter: function (filterFunction) {
            return this.toCollection().and(filterFunction);
        },
        each: function (fn) {
            return this.toCollection().each(fn);
        },
        toArray: function (cb) {
            return this.toCollection().toArray(cb);
        },
        orderBy: function (index) {
            return new Collection(new WhereClause(this, isArray(index) ?
                "[" + index.join('+') + "]" :
                index));
        },
        toCollection: function () {
            return new Collection(new WhereClause(this));
        },
        mapToClass: function (constructor, structure) {
            /// <summary>
            ///     Map table to a javascript constructor function. Objects returned from the database will be instances of this class, making
            ///     it possible to the instanceOf operator as well as extending the class using constructor.prototype.method = function(){...}.
            /// </summary>
            /// <param name="constructor">Constructor function representing the class.</param>
            /// <param name="structure" optional="true">Helps IDE code completion by knowing the members that objects contain and not just the indexes. Also
            /// know what type each member has. Example: {name: String, emailAddresses: [String], password}</param>
            this.schema.mappedClass = constructor;
            var instanceTemplate = Object.create(constructor.prototype);
            if (structure) {
                // structure and instanceTemplate is for IDE code competion only while constructor.prototype is for actual inheritance.
                applyStructure(instanceTemplate, structure);
            }
            this.schema.instanceTemplate = instanceTemplate;
            // Now, subscribe to the when("reading") event to make all objects that come out from this table inherit from given class
            // no matter which method to use for reading (Table.get() or Table.where(...)... )
            var readHook = function (obj) {
                if (!obj)
                    return obj; // No valid object. (Value is null). Return as is.
                // Create a new object that derives from constructor:
                var res = Object.create(constructor.prototype);
                // Clone members:
                for (var m in obj)
                    if (hasOwn(obj, m))
                        try {
                            res[m] = obj[m];
                        }
                        catch (_) { }
                return res;
            };
            if (this.schema.readHook) {
                this.hook.reading.unsubscribe(this.schema.readHook);
            }
            this.schema.readHook = readHook;
            this.hook("reading", readHook);
            return constructor;
        },
        defineClass: function (structure) {
            /// <summary>
            ///     Define all members of the class that represents the table. This will help code completion of when objects are read from the database
            ///     as well as making it possible to extend the prototype of the returned constructor function.
            /// </summary>
            /// <param name="structure">Helps IDE code completion by knowing the members that objects contain and not just the indexes. Also
            /// know what type each member has. Example: {name: String, emailAddresses: [String], properties: {shoeSize: Number}}</param>
            return this.mapToClass(Dexie.defineClass(structure), structure);
        },
        bulkDelete: function (keys$$1) {
            if (this.hook.deleting.fire === nop) {
                return this._idbstore(READWRITE, function (resolve, reject, idbstore, trans) {
                    resolve(bulkDelete(idbstore, trans, keys$$1, false, nop));
                });
            }
            else {
                return this
                    .where(':id')
                    .anyOf(keys$$1)
                    .delete()
                    .then(function () { }); // Resolve with undefined.
            }
        },
        bulkPut: function (objects, keys$$1) {
            var _this = this;
            return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
                if (!idbstore.keyPath && !_this.schema.primKey.auto && !keys$$1)
                    throw new exceptions.InvalidArgument("bulkPut() with non-inbound keys requires keys array in second argument");
                if (idbstore.keyPath && keys$$1)
                    throw new exceptions.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");
                if (keys$$1 && keys$$1.length !== objects.length)
                    throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
                if (objects.length === 0)
                    return resolve(); // Caller provided empty list.
                var done = function (result) {
                    if (errorList.length === 0)
                        resolve(result);
                    else
                        reject(new BulkError(_this.name + ".bulkPut(): " + errorList.length + " of " + numObjs + " operations failed", errorList));
                };
                var req, errorList = [], errorHandler, numObjs = objects.length, table = _this;
                if (_this.hook.creating.fire === nop && _this.hook.updating.fire === nop) {
                    //
                    // Standard Bulk (no 'creating' or 'updating' hooks to care about)
                    //
                    errorHandler = BulkErrorHandlerCatchAll(errorList);
                    for (var i = 0, l = objects.length; i < l; ++i) {
                        req = keys$$1 ? idbstore.put(objects[i], keys$$1[i]) : idbstore.put(objects[i]);
                        req.onerror = errorHandler;
                    }
                    // Only need to catch success or error on the last operation
                    // according to the IDB spec.
                    req.onerror = BulkErrorHandlerCatchAll(errorList, done);
                    req.onsuccess = eventSuccessHandler(done);
                }
                else {
                    var effectiveKeys = keys$$1 || idbstore.keyPath && objects.map(function (o) { return getByKeyPath(o, idbstore.keyPath); });
                    // Generate map of {[key]: object}
                    var objectLookup = effectiveKeys && arrayToObject(effectiveKeys, function (key, i) { return key != null && [key, objects[i]]; });
                    var promise = !effectiveKeys ?
                        // Auto-incremented key-less objects only without any keys argument.
                        table.bulkAdd(objects) :
                        // Keys provided. Either as inbound in provided objects, or as a keys argument.
                        // Begin with updating those that exists in DB:
                        table.where(':id').anyOf(effectiveKeys.filter(function (key) { return key != null; })).modify(function () {
                            this.value = objectLookup[this.primKey];
                            objectLookup[this.primKey] = null; // Mark as "don't add this"
                        }).catch(ModifyError, function (e) {
                            errorList = e.failures; // No need to concat here. These are the first errors added.
                        }).then(function () {
                            // Now, let's examine which items didnt exist so we can add them:
                            var objsToAdd = [], keysToAdd = keys$$1 && [];
                            // Iterate backwards. Why? Because if same key was used twice, just add the last one.
                            for (var i = effectiveKeys.length - 1; i >= 0; --i) {
                                var key = effectiveKeys[i];
                                if (key == null || objectLookup[key]) {
                                    objsToAdd.push(objects[i]);
                                    keys$$1 && keysToAdd.push(key);
                                    if (key != null)
                                        objectLookup[key] = null; // Mark as "dont add again"
                                }
                            }
                            // The items are in reverse order so reverse them before adding.
                            // Could be important in order to get auto-incremented keys the way the caller
                            // would expect. Could have used unshift instead of push()/reverse(),
                            // but: http://jsperf.com/unshift-vs-reverse
                            objsToAdd.reverse();
                            keys$$1 && keysToAdd.reverse();
                            return table.bulkAdd(objsToAdd, keysToAdd);
                        }).then(function (lastAddedKey) {
                            // Resolve with key of the last object in given arguments to bulkPut():
                            var lastEffectiveKey = effectiveKeys[effectiveKeys.length - 1]; // Key was provided.
                            return lastEffectiveKey != null ? lastEffectiveKey : lastAddedKey;
                        });
                    promise.then(done).catch(BulkError, function (e) {
                        // Concat failure from ModifyError and reject using our 'done' method.
                        errorList = errorList.concat(e.failures);
                        done();
                    }).catch(reject);
                }
            }, "locked"); // If called from transaction scope, lock transaction til all steps are done.
        },
        bulkAdd: function (objects, keys$$1) {
            var self = this, creatingHook = this.hook.creating.fire;
            return this._idbstore(READWRITE, function (resolve, reject, idbstore, trans) {
                if (!idbstore.keyPath && !self.schema.primKey.auto && !keys$$1)
                    throw new exceptions.InvalidArgument("bulkAdd() with non-inbound keys requires keys array in second argument");
                if (idbstore.keyPath && keys$$1)
                    throw new exceptions.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");
                if (keys$$1 && keys$$1.length !== objects.length)
                    throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
                if (objects.length === 0)
                    return resolve(); // Caller provided empty list.
                function done(result) {
                    if (errorList.length === 0)
                        resolve(result);
                    else
                        reject(new BulkError(self.name + ".bulkAdd(): " + errorList.length + " of " + numObjs + " operations failed", errorList));
                }
                var req, errorList = [], errorHandler, successHandler, numObjs = objects.length;
                if (creatingHook !== nop) {
                    //
                    // There are subscribers to hook('creating')
                    // Must behave as documented.
                    //
                    var keyPath = idbstore.keyPath, hookCtx;
                    errorHandler = BulkErrorHandlerCatchAll(errorList, null, true);
                    successHandler = hookedEventSuccessHandler(null);
                    tryCatch(function () {
                        for (var i = 0, l = objects.length; i < l; ++i) {
                            hookCtx = { onerror: null, onsuccess: null };
                            var key = keys$$1 && keys$$1[i];
                            var obj = objects[i], effectiveKey = keys$$1 ? key : keyPath ? getByKeyPath(obj, keyPath) : undefined, keyToUse = creatingHook.call(hookCtx, effectiveKey, obj, trans);
                            if (effectiveKey == null && keyToUse != null) {
                                if (keyPath) {
                                    obj = deepClone(obj);
                                    setByKeyPath(obj, keyPath, keyToUse);
                                }
                                else {
                                    key = keyToUse;
                                }
                            }
                            req = key != null ? idbstore.add(obj, key) : idbstore.add(obj);
                            req._hookCtx = hookCtx;
                            if (i < l - 1) {
                                req.onerror = errorHandler;
                                if (hookCtx.onsuccess)
                                    req.onsuccess = successHandler;
                            }
                        }
                    }, function (err) {
                        hookCtx.onerror && hookCtx.onerror(err);
                        throw err;
                    });
                    req.onerror = BulkErrorHandlerCatchAll(errorList, done, true);
                    req.onsuccess = hookedEventSuccessHandler(done);
                }
                else {
                    //
                    // Standard Bulk (no 'creating' hook to care about)
                    //
                    errorHandler = BulkErrorHandlerCatchAll(errorList);
                    for (var i = 0, l = objects.length; i < l; ++i) {
                        req = keys$$1 ? idbstore.add(objects[i], keys$$1[i]) : idbstore.add(objects[i]);
                        req.onerror = errorHandler;
                    }
                    // Only need to catch success or error on the last operation
                    // according to the IDB spec.
                    req.onerror = BulkErrorHandlerCatchAll(errorList, done);
                    req.onsuccess = eventSuccessHandler(done);
                }
            });
        },
        add: function (obj, key) {
            /// <summary>
            ///   Add an object to the database. In case an object with same primary key already exists, the object will not be added.
            /// </summary>
            /// <param name="obj" type="Object">A javascript object to insert</param>
            /// <param name="key" optional="true">Primary key</param>
            var creatingHook = this.hook.creating.fire;
            return this._idbstore(READWRITE, function (resolve, reject, idbstore, trans) {
                var hookCtx = { onsuccess: null, onerror: null };
                if (creatingHook !== nop) {
                    var effectiveKey = (key != null) ? key : (idbstore.keyPath ? getByKeyPath(obj, idbstore.keyPath) : undefined);
                    var keyToUse = creatingHook.call(hookCtx, effectiveKey, obj, trans); // Allow subscribers to when("creating") to generate the key.
                    if (effectiveKey == null && keyToUse != null) {
                        if (idbstore.keyPath)
                            setByKeyPath(obj, idbstore.keyPath, keyToUse);
                        else
                            key = keyToUse;
                    }
                }
                try {
                    var req = key != null ? idbstore.add(obj, key) : idbstore.add(obj);
                    req._hookCtx = hookCtx;
                    req.onerror = hookedEventRejectHandler(reject);
                    req.onsuccess = hookedEventSuccessHandler(function (result) {
                        // TODO: Remove these two lines in next major release (2.0?)
                        // It's no good practice to have side effects on provided parameters
                        var keyPath = idbstore.keyPath;
                        if (keyPath)
                            setByKeyPath(obj, keyPath, result);
                        resolve(result);
                    });
                }
                catch (e) {
                    if (hookCtx.onerror)
                        hookCtx.onerror(e);
                    throw e;
                }
            });
        },
        put: function (obj, key) {
            var _this = this;
            /// <summary>
            ///   Add an object to the database but in case an object with same primary key alread exists, the existing one will get updated.
            /// </summary>
            /// <param name="obj" type="Object">A javascript object to insert or update</param>
            /// <param name="key" optional="true">Primary key</param>
            var creatingHook = this.hook.creating.fire, updatingHook = this.hook.updating.fire;
            if (creatingHook !== nop || updatingHook !== nop) {
                //
                // People listens to when("creating") or when("updating") events!
                // We must know whether the put operation results in an CREATE or UPDATE.
                //
                var keyPath = this.schema.primKey.keyPath;
                var effectiveKey = (key !== undefined) ? key : (keyPath && getByKeyPath(obj, keyPath));
                if (effectiveKey == null)
                    return this.add(obj);
                // Since key is optional, make sure we get it from obj if not provided
                // Primary key exist. Lock transaction and try modifying existing. If nothing modified, call add().
                // clone obj before this async call. If caller modifies obj the line after put(), the IDB spec requires that it should not affect operation.
                obj = deepClone(obj);
                return this._trans(READWRITE, function () {
                    return _this.where(":id").equals(effectiveKey).modify(function () {
                        // Replace extisting value with our object
                        // CRUD event firing handled in Collection.modify()
                        this.value = obj;
                    }).then(function (count) { return count === 0 ? _this.add(obj, key) : effectiveKey; });
                }, "locked"); // Lock needed because operation is splitted into modify() and add().
            }
            else {
                // Use the standard IDB put() method.
                return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
                    var req = key !== undefined ? idbstore.put(obj, key) : idbstore.put(obj);
                    req.onerror = eventRejectHandler(reject);
                    req.onsuccess = wrap(function (ev) {
                        var keyPath = idbstore.keyPath;
                        if (keyPath)
                            setByKeyPath(obj, keyPath, ev.target.result);
                        resolve(req.result);
                    });
                });
            }
        },
        'delete': function (key) {
            /// <param name="key">Primary key of the object to delete</param>
            if (this.hook.deleting.subscribers.length) {
                // People listens to when("deleting") event. Must implement delete using Collection.delete() that will
                // call the CRUD event. Only Collection.delete() will know whether an object was actually deleted.
                return this.where(":id").equals(key).delete();
            }
            else {
                // No one listens. Use standard IDB delete() method.
                return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
                    var req = idbstore.delete(key);
                    req.onerror = eventRejectHandler(reject);
                    req.onsuccess = wrap(function () {
                        resolve(req.result);
                    });
                });
            }
        },
        clear: function () {
            if (this.hook.deleting.subscribers.length) {
                // People listens to when("deleting") event. Must implement delete using Collection.delete() that will
                // call the CRUD event. Only Collection.delete() will knows which objects that are actually deleted.
                return this.toCollection().delete();
            }
            else {
                return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
                    var req = idbstore.clear();
                    req.onerror = eventRejectHandler(reject);
                    req.onsuccess = wrap(function () {
                        resolve(req.result);
                    });
                });
            }
        },
        update: function (keyOrObject, modifications) {
            if (typeof modifications !== 'object' || isArray(modifications))
                throw new exceptions.InvalidArgument("Modifications must be an object.");
            if (typeof keyOrObject === 'object' && !isArray(keyOrObject)) {
                // object to modify. Also modify given object with the modifications:
                keys(modifications).forEach(function (keyPath) {
                    setByKeyPath(keyOrObject, keyPath, modifications[keyPath]);
                });
                var key = getByKeyPath(keyOrObject, this.schema.primKey.keyPath);
                if (key === undefined)
                    return rejection(new exceptions.InvalidArgument("Given object does not contain its primary key"));
                return this.where(":id").equals(key).modify(modifications);
            }
            else {
                // key to modify
                return this.where(":id").equals(keyOrObject).modify(modifications);
            }
        }
    });
    //
    //
    //
    // Transaction Class
    //
    //
    //
    function Transaction(mode, storeNames, dbschema, parent) {
        var _this = this;
        /// <summary>
        ///    Transaction class. Represents a database transaction. All operations on db goes through a Transaction.
        /// </summary>
        /// <param name="mode" type="String">Any of "readwrite" or "readonly"</param>
        /// <param name="storeNames" type="Array">Array of table names to operate on</param>
        this.db = db;
        this.mode = mode;
        this.storeNames = storeNames;
        this.idbtrans = null;
        this.on = Events(this, "complete", "error", "abort");
        this.parent = parent || null;
        this.active = true;
        this._reculock = 0;
        this._blockedFuncs = [];
        this._resolve = null;
        this._reject = null;
        this._waitingFor = null;
        this._waitingQueue = null;
        this._spinCount = 0; // Just for debugging waitFor()
        this._completion = new Promise(function (resolve, reject) {
            _this._resolve = resolve;
            _this._reject = reject;
        });
        this._completion.then(function () {
            _this.active = false;
            _this.on.complete.fire();
        }, function (e) {
            var wasActive = _this.active;
            _this.active = false;
            _this.on.error.fire(e);
            _this.parent ?
                _this.parent._reject(e) :
                wasActive && _this.idbtrans && _this.idbtrans.abort();
            return rejection(e); // Indicate we actually DO NOT catch this error.
        });
    }
    props(Transaction.prototype, {
        //
        // Transaction Protected Methods (not required by API users, but needed internally and eventually by dexie extensions)
        //
        _lock: function () {
            assert(!PSD.global); // Locking and unlocking reuires to be within a PSD scope.
            // Temporary set all requests into a pending queue if they are called before database is ready.
            ++this._reculock; // Recursive read/write lock pattern using PSD (Promise Specific Data) instead of TLS (Thread Local Storage)
            if (this._reculock === 1 && !PSD.global)
                PSD.lockOwnerFor = this;
            return this;
        },
        _unlock: function () {
            assert(!PSD.global); // Locking and unlocking reuires to be within a PSD scope.
            if (--this._reculock === 0) {
                if (!PSD.global)
                    PSD.lockOwnerFor = null;
                while (this._blockedFuncs.length > 0 && !this._locked()) {
                    var fnAndPSD = this._blockedFuncs.shift();
                    try {
                        usePSD(fnAndPSD[1], fnAndPSD[0]);
                    }
                    catch (e) { }
                }
            }
            return this;
        },
        _locked: function () {
            // Checks if any write-lock is applied on this transaction.
            // To simplify the Dexie API for extension implementations, we support recursive locks.
            // This is accomplished by using "Promise Specific Data" (PSD).
            // PSD data is bound to a Promise and any child Promise emitted through then() or resolve( new Promise() ).
            // PSD is local to code executing on top of the call stacks of any of any code executed by Promise():
            //         * callback given to the Promise() constructor  (function (resolve, reject){...})
            //         * callbacks given to then()/catch()/finally() methods (function (value){...})
            // If creating a new independant Promise instance from within a Promise call stack, the new Promise will derive the PSD from the call stack of the parent Promise.
            // Derivation is done so that the inner PSD __proto__ points to the outer PSD.
            // PSD.lockOwnerFor will point to current transaction object if the currently executing PSD scope owns the lock.
            return this._reculock && PSD.lockOwnerFor !== this;
        },
        create: function (idbtrans) {
            var _this = this;
            if (!this.mode)
                return this;
            assert(!this.idbtrans);
            if (!idbtrans && !idbdb) {
                switch (dbOpenError && dbOpenError.name) {
                    case "DatabaseClosedError":
                        // Errors where it is no difference whether it was caused by the user operation or an earlier call to db.open()
                        throw new exceptions.DatabaseClosed(dbOpenError);
                    case "MissingAPIError":
                        // Errors where it is no difference whether it was caused by the user operation or an earlier call to db.open()
                        throw new exceptions.MissingAPI(dbOpenError.message, dbOpenError);
                    default:
                        // Make it clear that the user operation was not what caused the error - the error had occurred earlier on db.open()!
                        throw new exceptions.OpenFailed(dbOpenError);
                }
            }
            if (!this.active)
                throw new exceptions.TransactionInactive();
            assert(this._completion._state === null);
            idbtrans = this.idbtrans = idbtrans || idbdb.transaction(safariMultiStoreFix(this.storeNames), this.mode);
            idbtrans.onerror = wrap(function (ev) {
                preventDefault(ev); // Prohibit default bubbling to window.error
                _this._reject(idbtrans.error);
            });
            idbtrans.onabort = wrap(function (ev) {
                preventDefault(ev);
                _this.active && _this._reject(new exceptions.Abort(idbtrans.error));
                _this.active = false;
                _this.on("abort").fire(ev);
            });
            idbtrans.oncomplete = wrap(function () {
                _this.active = false;
                _this._resolve();
            });
            return this;
        },
        _promise: function (mode, fn, bWriteLock) {
            var _this = this;
            if (mode === READWRITE && this.mode !== READWRITE)
                return rejection(new exceptions.ReadOnly("Transaction is readonly"));
            if (!this.active)
                return rejection(new exceptions.TransactionInactive());
            if (this._locked()) {
                return new Promise(function (resolve, reject) {
                    _this._blockedFuncs.push([function () {
                            _this._promise(mode, fn, bWriteLock).then(resolve, reject);
                        }, PSD]);
                });
            }
            else if (bWriteLock) {
                return newScope(function () {
                    var p = new Promise(function (resolve, reject) {
                        _this._lock();
                        var rv = fn(resolve, reject, _this);
                        if (rv && rv.then)
                            rv.then(resolve, reject);
                    });
                    p.finally(function () { return _this._unlock(); });
                    p._lib = true;
                    return p;
                });
            }
            else {
                var p = new Promise(function (resolve, reject) {
                    var rv = fn(resolve, reject, _this);
                    if (rv && rv.then)
                        rv.then(resolve, reject);
                });
                p._lib = true;
                return p;
            }
        },
        _root: function () {
            return this.parent ? this.parent._root() : this;
        },
        waitFor: function (promise) {
            // Always operate on the root transaction (in case this is a sub stransaction)
            var root = this._root();
            // For stability reasons, convert parameter to promise no matter what type is passed to waitFor().
            // (We must be able to call .then() on it.)
            promise = Promise.resolve(promise);
            if (root._waitingFor) {
                // Already called waitFor(). Wait for both to complete.
                root._waitingFor = root._waitingFor.then(function () { return promise; });
            }
            else {
                // We're not in waiting state. Start waiting state.
                root._waitingFor = promise;
                root._waitingQueue = [];
                // Start interacting with indexedDB until promise completes:
                var store = root.idbtrans.objectStore(root.storeNames[0]);
                (function spin() {
                    ++root._spinCount; // For debugging only
                    while (root._waitingQueue.length)
                        (root._waitingQueue.shift())();
                    if (root._waitingFor)
                        store.get(-Infinity).onsuccess = spin;
                }());
            }
            var currentWaitPromise = root._waitingFor;
            return new Promise(function (resolve, reject) {
                promise.then(function (res) { return root._waitingQueue.push(wrap(resolve.bind(null, res))); }, function (err) { return root._waitingQueue.push(wrap(reject.bind(null, err))); }).finally(function () {
                    if (root._waitingFor === currentWaitPromise) {
                        // No one added a wait after us. Safe to stop the spinning.
                        root._waitingFor = null;
                    }
                });
            });
        },
        //
        // Transaction Public Properties and Methods
        //
        abort: function () {
            this.active && this._reject(new exceptions.Abort());
            this.active = false;
        },
        tables: {
            get: deprecated("Transaction.tables", function () { return allTables; })
        },
        table: function (name) {
            var table = db.table(name); // Don't check that table is part of transaction. It must fail lazily!
            return new Table(name, table.schema, this);
        }
    });
    //
    //
    //
    // WhereClause
    //
    //
    //
    function WhereClause(table, index, orCollection) {
        /// <param name="table" type="Table"></param>
        /// <param name="index" type="String" optional="true"></param>
        /// <param name="orCollection" type="Collection" optional="true"></param>
        this._ctx = {
            table: table,
            index: index === ":id" ? null : index,
            or: orCollection
        };
    }
    props(WhereClause.prototype, function () {
        // WhereClause private methods
        function fail(collectionOrWhereClause, err, T) {
            var collection = collectionOrWhereClause instanceof WhereClause ?
                new Collection(collectionOrWhereClause) :
                collectionOrWhereClause;
            collection._ctx.error = T ? new T(err) : new TypeError(err);
            return collection;
        }
        function emptyCollection(whereClause) {
            return new Collection(whereClause, function () { return IDBKeyRange.only(""); }).limit(0);
        }
        function upperFactory(dir) {
            return dir === "next" ? function (s) { return s.toUpperCase(); } : function (s) { return s.toLowerCase(); };
        }
        function lowerFactory(dir) {
            return dir === "next" ? function (s) { return s.toLowerCase(); } : function (s) { return s.toUpperCase(); };
        }
        function nextCasing(key, lowerKey, upperNeedle, lowerNeedle, cmp, dir) {
            var length = Math.min(key.length, lowerNeedle.length);
            var llp = -1;
            for (var i = 0; i < length; ++i) {
                var lwrKeyChar = lowerKey[i];
                if (lwrKeyChar !== lowerNeedle[i]) {
                    if (cmp(key[i], upperNeedle[i]) < 0)
                        return key.substr(0, i) + upperNeedle[i] + upperNeedle.substr(i + 1);
                    if (cmp(key[i], lowerNeedle[i]) < 0)
                        return key.substr(0, i) + lowerNeedle[i] + upperNeedle.substr(i + 1);
                    if (llp >= 0)
                        return key.substr(0, llp) + lowerKey[llp] + upperNeedle.substr(llp + 1);
                    return null;
                }
                if (cmp(key[i], lwrKeyChar) < 0)
                    llp = i;
            }
            if (length < lowerNeedle.length && dir === "next")
                return key + upperNeedle.substr(key.length);
            if (length < key.length && dir === "prev")
                return key.substr(0, upperNeedle.length);
            return (llp < 0 ? null : key.substr(0, llp) + lowerNeedle[llp] + upperNeedle.substr(llp + 1));
        }
        function addIgnoreCaseAlgorithm(whereClause, match, needles, suffix) {
            /// <param name="needles" type="Array" elementType="String"></param>
            var upper, lower, compare, upperNeedles, lowerNeedles, direction, nextKeySuffix, needlesLen = needles.length;
            if (!needles.every(function (s) { return typeof s === 'string'; })) {
                return fail(whereClause, STRING_EXPECTED);
            }
            function initDirection(dir) {
                upper = upperFactory(dir);
                lower = lowerFactory(dir);
                compare = (dir === "next" ? simpleCompare : simpleCompareReverse);
                var needleBounds = needles.map(function (needle) {
                    return { lower: lower(needle), upper: upper(needle) };
                }).sort(function (a, b) {
                    return compare(a.lower, b.lower);
                });
                upperNeedles = needleBounds.map(function (nb) { return nb.upper; });
                lowerNeedles = needleBounds.map(function (nb) { return nb.lower; });
                direction = dir;
                nextKeySuffix = (dir === "next" ? "" : suffix);
            }
            initDirection("next");
            var c = new Collection(whereClause, function () {
                return IDBKeyRange.bound(upperNeedles[0], lowerNeedles[needlesLen - 1] + suffix);
            });
            c._ondirectionchange = function (direction) {
                // This event onlys occur before filter is called the first time.
                initDirection(direction);
            };
            var firstPossibleNeedle = 0;
            c._addAlgorithm(function (cursor, advance, resolve) {
                /// <param name="cursor" type="IDBCursor"></param>
                /// <param name="advance" type="Function"></param>
                /// <param name="resolve" type="Function"></param>
                var key = cursor.key;
                if (typeof key !== 'string')
                    return false;
                var lowerKey = lower(key);
                if (match(lowerKey, lowerNeedles, firstPossibleNeedle)) {
                    return true;
                }
                else {
                    var lowestPossibleCasing = null;
                    for (var i = firstPossibleNeedle; i < needlesLen; ++i) {
                        var casing = nextCasing(key, lowerKey, upperNeedles[i], lowerNeedles[i], compare, direction);
                        if (casing === null && lowestPossibleCasing === null)
                            firstPossibleNeedle = i + 1;
                        else if (lowestPossibleCasing === null || compare(lowestPossibleCasing, casing) > 0) {
                            lowestPossibleCasing = casing;
                        }
                    }
                    if (lowestPossibleCasing !== null) {
                        advance(function () { cursor.continue(lowestPossibleCasing + nextKeySuffix); });
                    }
                    else {
                        advance(resolve);
                    }
                    return false;
                }
            });
            return c;
        }
        //
        // WhereClause public methods
        //
        return {
            between: function (lower, upper, includeLower, includeUpper) {
                /// <summary>
                ///     Filter out records whose where-field lays between given lower and upper values. Applies to Strings, Numbers and Dates.
                /// </summary>
                /// <param name="lower"></param>
                /// <param name="upper"></param>
                /// <param name="includeLower" optional="true">Whether items that equals lower should be included. Default true.</param>
                /// <param name="includeUpper" optional="true">Whether items that equals upper should be included. Default false.</param>
                /// <returns type="Collection"></returns>
                includeLower = includeLower !== false; // Default to true
                includeUpper = includeUpper === true; // Default to false
                try {
                    if ((cmp(lower, upper) > 0) ||
                        (cmp(lower, upper) === 0 && (includeLower || includeUpper) && !(includeLower && includeUpper)))
                        return emptyCollection(this); // Workaround for idiotic W3C Specification that DataError must be thrown if lower > upper. The natural result would be to return an empty collection.
                    return new Collection(this, function () { return IDBKeyRange.bound(lower, upper, !includeLower, !includeUpper); });
                }
                catch (e) {
                    return fail(this, INVALID_KEY_ARGUMENT);
                }
            },
            equals: function (value) {
                return new Collection(this, function () { return IDBKeyRange.only(value); });
            },
            above: function (value) {
                return new Collection(this, function () { return IDBKeyRange.lowerBound(value, true); });
            },
            aboveOrEqual: function (value) {
                return new Collection(this, function () { return IDBKeyRange.lowerBound(value); });
            },
            below: function (value) {
                return new Collection(this, function () { return IDBKeyRange.upperBound(value, true); });
            },
            belowOrEqual: function (value) {
                return new Collection(this, function () { return IDBKeyRange.upperBound(value); });
            },
            startsWith: function (str) {
                /// <param name="str" type="String"></param>
                if (typeof str !== 'string')
                    return fail(this, STRING_EXPECTED);
                return this.between(str, str + maxString, true, true);
            },
            startsWithIgnoreCase: function (str) {
                /// <param name="str" type="String"></param>
                if (str === "")
                    return this.startsWith(str);
                return addIgnoreCaseAlgorithm(this, function (x, a) { return x.indexOf(a[0]) === 0; }, [str], maxString);
            },
            equalsIgnoreCase: function (str) {
                /// <param name="str" type="String"></param>
                return addIgnoreCaseAlgorithm(this, function (x, a) { return x === a[0]; }, [str], "");
            },
            anyOfIgnoreCase: function () {
                var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
                if (set.length === 0)
                    return emptyCollection(this);
                return addIgnoreCaseAlgorithm(this, function (x, a) { return a.indexOf(x) !== -1; }, set, "");
            },
            startsWithAnyOfIgnoreCase: function () {
                var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
                if (set.length === 0)
                    return emptyCollection(this);
                return addIgnoreCaseAlgorithm(this, function (x, a) {
                    return a.some(function (n) {
                        return x.indexOf(n) === 0;
                    });
                }, set, maxString);
            },
            anyOf: function () {
                var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
                var compare = ascending;
                try {
                    set.sort(compare);
                }
                catch (e) {
                    return fail(this, INVALID_KEY_ARGUMENT);
                }
                if (set.length === 0)
                    return emptyCollection(this);
                var c = new Collection(this, function () { return IDBKeyRange.bound(set[0], set[set.length - 1]); });
                c._ondirectionchange = function (direction) {
                    compare = (direction === "next" ? ascending : descending);
                    set.sort(compare);
                };
                var i = 0;
                c._addAlgorithm(function (cursor, advance, resolve) {
                    var key = cursor.key;
                    while (compare(key, set[i]) > 0) {
                        // The cursor has passed beyond this key. Check next.
                        ++i;
                        if (i === set.length) {
                            // There is no next. Stop searching.
                            advance(resolve);
                            return false;
                        }
                    }
                    if (compare(key, set[i]) === 0) {
                        // The current cursor value should be included and we should continue a single step in case next item has the same key or possibly our next key in set.
                        return true;
                    }
                    else {
                        // cursor.key not yet at set[i]. Forward cursor to the next key to hunt for.
                        advance(function () { cursor.continue(set[i]); });
                        return false;
                    }
                });
                return c;
            },
            notEqual: function (value) {
                return this.inAnyRange([[minKey, value], [value, maxKey]], { includeLowers: false, includeUppers: false });
            },
            noneOf: function () {
                var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
                if (set.length === 0)
                    return new Collection(this); // Return entire collection.
                try {
                    set.sort(ascending);
                }
                catch (e) {
                    return fail(this, INVALID_KEY_ARGUMENT);
                }
                // Transform ["a","b","c"] to a set of ranges for between/above/below: [[minKey,"a"], ["a","b"], ["b","c"], ["c",maxKey]]
                var ranges = set.reduce(function (res, val) { return res ? res.concat([[res[res.length - 1][1], val]]) : [[minKey, val]]; }, null);
                ranges.push([set[set.length - 1], maxKey]);
                return this.inAnyRange(ranges, { includeLowers: false, includeUppers: false });
            },
            /** Filter out values withing given set of ranges.
            * Example, give children and elders a rebate of 50%:
            *
            *   db.friends.where('age').inAnyRange([[0,18],[65,Infinity]]).modify({Rebate: 1/2});
            *
            * @param {(string|number|Date|Array)[][]} ranges
            * @param {{includeLowers: boolean, includeUppers: boolean}} options
            */
            inAnyRange: function (ranges, options) {
                if (ranges.length === 0)
                    return emptyCollection(this);
                if (!ranges.every(function (range) { return range[0] !== undefined && range[1] !== undefined && ascending(range[0], range[1]) <= 0; })) {
                    return fail(this, "First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower", exceptions.InvalidArgument);
                }
                var includeLowers = !options || options.includeLowers !== false; // Default to true
                var includeUppers = options && options.includeUppers === true; // Default to false
                function addRange(ranges, newRange) {
                    for (var i = 0, l = ranges.length; i < l; ++i) {
                        var range = ranges[i];
                        if (cmp(newRange[0], range[1]) < 0 && cmp(newRange[1], range[0]) > 0) {
                            range[0] = min(range[0], newRange[0]);
                            range[1] = max(range[1], newRange[1]);
                            break;
                        }
                    }
                    if (i === l)
                        ranges.push(newRange);
                    return ranges;
                }
                var sortDirection = ascending;
                function rangeSorter(a, b) { return sortDirection(a[0], b[0]); }
                // Join overlapping ranges
                var set;
                try {
                    set = ranges.reduce(addRange, []);
                    set.sort(rangeSorter);
                }
                catch (ex) {
                    return fail(this, INVALID_KEY_ARGUMENT);
                }
                var i = 0;
                var keyIsBeyondCurrentEntry = includeUppers ?
                    function (key) { return ascending(key, set[i][1]) > 0; } :
                    function (key) { return ascending(key, set[i][1]) >= 0; };
                var keyIsBeforeCurrentEntry = includeLowers ?
                    function (key) { return descending(key, set[i][0]) > 0; } :
                    function (key) { return descending(key, set[i][0]) >= 0; };
                function keyWithinCurrentRange(key) {
                    return !keyIsBeyondCurrentEntry(key) && !keyIsBeforeCurrentEntry(key);
                }
                var checkKey = keyIsBeyondCurrentEntry;
                var c = new Collection(this, function () {
                    return IDBKeyRange.bound(set[0][0], set[set.length - 1][1], !includeLowers, !includeUppers);
                });
                c._ondirectionchange = function (direction) {
                    if (direction === "next") {
                        checkKey = keyIsBeyondCurrentEntry;
                        sortDirection = ascending;
                    }
                    else {
                        checkKey = keyIsBeforeCurrentEntry;
                        sortDirection = descending;
                    }
                    set.sort(rangeSorter);
                };
                c._addAlgorithm(function (cursor, advance, resolve) {
                    var key = cursor.key;
                    while (checkKey(key)) {
                        // The cursor has passed beyond this key. Check next.
                        ++i;
                        if (i === set.length) {
                            // There is no next. Stop searching.
                            advance(resolve);
                            return false;
                        }
                    }
                    if (keyWithinCurrentRange(key)) {
                        // The current cursor value should be included and we should continue a single step in case next item has the same key or possibly our next key in set.
                        return true;
                    }
                    else if (cmp(key, set[i][1]) === 0 || cmp(key, set[i][0]) === 0) {
                        // includeUpper or includeLower is false so keyWithinCurrentRange() returns false even though we are at range border.
                        // Continue to next key but don't include this one.
                        return false;
                    }
                    else {
                        // cursor.key not yet at set[i]. Forward cursor to the next key to hunt for.
                        advance(function () {
                            if (sortDirection === ascending)
                                cursor.continue(set[i][0]);
                            else
                                cursor.continue(set[i][1]);
                        });
                        return false;
                    }
                });
                return c;
            },
            startsWithAnyOf: function () {
                var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
                if (!set.every(function (s) { return typeof s === 'string'; })) {
                    return fail(this, "startsWithAnyOf() only works with strings");
                }
                if (set.length === 0)
                    return emptyCollection(this);
                return this.inAnyRange(set.map(function (str) {
                    return [str, str + maxString];
                }));
            }
        };
    });
    //
    //
    //
    // Collection Class
    //
    //
    //
    function Collection(whereClause, keyRangeGenerator) {
        /// <summary>
        ///
        /// </summary>
        /// <param name="whereClause" type="WhereClause">Where clause instance</param>
        /// <param name="keyRangeGenerator" value="function(){ return IDBKeyRange.bound(0,1);}" optional="true"></param>
        var keyRange = null, error = null;
        if (keyRangeGenerator)
            try {
                keyRange = keyRangeGenerator();
            }
            catch (ex) {
                error = ex;
            }
        var whereCtx = whereClause._ctx, table = whereCtx.table;
        this._ctx = {
            table: table,
            index: whereCtx.index,
            isPrimKey: (!whereCtx.index || (table.schema.primKey.keyPath && whereCtx.index === table.schema.primKey.name)),
            range: keyRange,
            keysOnly: false,
            dir: "next",
            unique: "",
            algorithm: null,
            filter: null,
            replayFilter: null,
            justLimit: true,
            isMatch: null,
            offset: 0,
            limit: Infinity,
            error: error,
            or: whereCtx.or,
            valueMapper: table.hook.reading.fire
        };
    }
    function isPlainKeyRange(ctx, ignoreLimitFilter) {
        return !(ctx.filter || ctx.algorithm || ctx.or) &&
            (ignoreLimitFilter ? ctx.justLimit : !ctx.replayFilter);
    }
    props(Collection.prototype, function () {
        //
        // Collection Private Functions
        //
        function addFilter(ctx, fn) {
            ctx.filter = combine(ctx.filter, fn);
        }
        function addReplayFilter(ctx, factory, isLimitFilter) {
            var curr = ctx.replayFilter;
            ctx.replayFilter = curr ? function () { return combine(curr(), factory()); } : factory;
            ctx.justLimit = isLimitFilter && !curr;
        }
        function addMatchFilter(ctx, fn) {
            ctx.isMatch = combine(ctx.isMatch, fn);
        }
        /** @param ctx {
         *      isPrimKey: boolean,
         *      table: Table,
         *      index: string
         * }
         * @param store IDBObjectStore
         **/
        function getIndexOrStore(ctx, store) {
            if (ctx.isPrimKey)
                return store;
            var indexSpec = ctx.table.schema.idxByName[ctx.index];
            if (!indexSpec)
                throw new exceptions.Schema("KeyPath " + ctx.index + " on object store " + store.name + " is not indexed");
            return store.index(indexSpec.name);
        }
        /** @param ctx {
         *      isPrimKey: boolean,
         *      table: Table,
         *      index: string,
         *      keysOnly: boolean,
         *      range?: IDBKeyRange,
         *      dir: "next" | "prev"
         * }
         */
        function openCursor(ctx, store) {
            var idxOrStore = getIndexOrStore(ctx, store);
            return ctx.keysOnly && 'openKeyCursor' in idxOrStore ?
                idxOrStore.openKeyCursor(ctx.range || null, ctx.dir + ctx.unique) :
                idxOrStore.openCursor(ctx.range || null, ctx.dir + ctx.unique);
        }
        function iter(ctx, fn, resolve, reject, idbstore) {
            var filter = ctx.replayFilter ? combine(ctx.filter, ctx.replayFilter()) : ctx.filter;
            if (!ctx.or) {
                iterate(openCursor(ctx, idbstore), combine(ctx.algorithm, filter), fn, resolve, reject, !ctx.keysOnly && ctx.valueMapper);
            }
            else
                (function () {
                    var set = {};
                    var resolved = 0;
                    function resolveboth() {
                        if (++resolved === 2)
                            resolve(); // Seems like we just support or btwn max 2 expressions, but there are no limit because we do recursion.
                    }
                    function union(item, cursor, advance) {
                        if (!filter || filter(cursor, advance, resolveboth, reject)) {
                            var primaryKey = cursor.primaryKey;
                            var key = '' + primaryKey;
                            if (key === '[object ArrayBuffer]')
                                key = '' + new Uint8Array(primaryKey);
                            if (!hasOwn(set, key)) {
                                set[key] = true;
                                fn(item, cursor, advance);
                            }
                        }
                    }
                    ctx.or._iterate(union, resolveboth, reject, idbstore);
                    iterate(openCursor(ctx, idbstore), ctx.algorithm, union, resolveboth, reject, !ctx.keysOnly && ctx.valueMapper);
                })();
        }
        return {
            //
            // Collection Protected Functions
            //
            _read: function (fn, cb) {
                var ctx = this._ctx;
                return ctx.error ?
                    ctx.table._trans(null, rejection.bind(null, ctx.error)) :
                    ctx.table._idbstore(READONLY, fn).then(cb);
            },
            _write: function (fn) {
                var ctx = this._ctx;
                return ctx.error ?
                    ctx.table._trans(null, rejection.bind(null, ctx.error)) :
                    ctx.table._idbstore(READWRITE, fn, "locked"); // When doing write operations on collections, always lock the operation so that upcoming operations gets queued.
            },
            _addAlgorithm: function (fn) {
                var ctx = this._ctx;
                ctx.algorithm = combine(ctx.algorithm, fn);
            },
            _iterate: function (fn, resolve, reject, idbstore) {
                return iter(this._ctx, fn, resolve, reject, idbstore);
            },
            clone: function (props$$1) {
                var rv = Object.create(this.constructor.prototype), ctx = Object.create(this._ctx);
                if (props$$1)
                    extend(ctx, props$$1);
                rv._ctx = ctx;
                return rv;
            },
            raw: function () {
                this._ctx.valueMapper = null;
                return this;
            },
            //
            // Collection Public methods
            //
            each: function (fn) {
                var ctx = this._ctx;
                return this._read(function (resolve, reject, idbstore) {
                    iter(ctx, fn, resolve, reject, idbstore);
                });
            },
            count: function (cb) {
                var ctx = this._ctx;
                if (isPlainKeyRange(ctx, true)) {
                    // This is a plain key range. We can use the count() method if the index.
                    return this._read(function (resolve, reject, idbstore) {
                        var idx = getIndexOrStore(ctx, idbstore);
                        var req = (ctx.range ? idx.count(ctx.range) : idx.count());
                        req.onerror = eventRejectHandler(reject);
                        req.onsuccess = function (e) {
                            resolve(Math.min(e.target.result, ctx.limit));
                        };
                    }, cb);
                }
                else {
                    // Algorithms, filters or expressions are applied. Need to count manually.
                    var count = 0;
                    return this._read(function (resolve, reject, idbstore) {
                        iter(ctx, function () { ++count; return false; }, function () { resolve(count); }, reject, idbstore);
                    }, cb);
                }
            },
            sortBy: function (keyPath, cb) {
                /// <param name="keyPath" type="String"></param>
                var parts = keyPath.split('.').reverse(), lastPart = parts[0], lastIndex = parts.length - 1;
                function getval(obj, i) {
                    if (i)
                        return getval(obj[parts[i]], i - 1);
                    return obj[lastPart];
                }
                var order = this._ctx.dir === "next" ? 1 : -1;
                function sorter(a, b) {
                    var aVal = getval(a, lastIndex), bVal = getval(b, lastIndex);
                    return aVal < bVal ? -order : aVal > bVal ? order : 0;
                }
                return this.toArray(function (a) {
                    return a.sort(sorter);
                }).then(cb);
            },
            toArray: function (cb) {
                var ctx = this._ctx;
                return this._read(function (resolve, reject, idbstore) {
                    if (hasGetAll && ctx.dir === 'next' && isPlainKeyRange(ctx, true) && ctx.limit > 0) {
                        // Special optimation if we could use IDBObjectStore.getAll() or
                        // IDBKeyRange.getAll():
                        var readingHook = ctx.table.hook.reading.fire;
                        var idxOrStore = getIndexOrStore(ctx, idbstore);
                        var req = ctx.limit < Infinity ?
                            idxOrStore.getAll(ctx.range, ctx.limit) :
                            idxOrStore.getAll(ctx.range);
                        req.onerror = eventRejectHandler(reject);
                        req.onsuccess = readingHook === mirror ?
                            eventSuccessHandler(resolve) :
                            eventSuccessHandler(function (res) {
                                try {
                                    resolve(res.map(readingHook));
                                }
                                catch (e) {
                                    reject(e);
                                }
                            });
                    }
                    else {
                        // Getting array through a cursor.
                        var a = [];
                        iter(ctx, function (item) { a.push(item); }, function arrayComplete() {
                            resolve(a);
                        }, reject, idbstore);
                    }
                }, cb);
            },
            offset: function (offset) {
                var ctx = this._ctx;
                if (offset <= 0)
                    return this;
                ctx.offset += offset; // For count()
                if (isPlainKeyRange(ctx)) {
                    addReplayFilter(ctx, function () {
                        var offsetLeft = offset;
                        return function (cursor, advance) {
                            if (offsetLeft === 0)
                                return true;
                            if (offsetLeft === 1) {
                                --offsetLeft;
                                return false;
                            }
                            advance(function () {
                                cursor.advance(offsetLeft);
                                offsetLeft = 0;
                            });
                            return false;
                        };
                    });
                }
                else {
                    addReplayFilter(ctx, function () {
                        var offsetLeft = offset;
                        return function () { return (--offsetLeft < 0); };
                    });
                }
                return this;
            },
            limit: function (numRows) {
                this._ctx.limit = Math.min(this._ctx.limit, numRows); // For count()
                addReplayFilter(this._ctx, function () {
                    var rowsLeft = numRows;
                    return function (cursor, advance, resolve) {
                        if (--rowsLeft <= 0)
                            advance(resolve); // Stop after this item has been included
                        return rowsLeft >= 0; // If numRows is already below 0, return false because then 0 was passed to numRows initially. Otherwise we wouldnt come here.
                    };
                }, true);
                return this;
            },
            until: function (filterFunction, bIncludeStopEntry) {
                addFilter(this._ctx, function (cursor, advance, resolve) {
                    if (filterFunction(cursor.value)) {
                        advance(resolve);
                        return bIncludeStopEntry;
                    }
                    else {
                        return true;
                    }
                });
                return this;
            },
            first: function (cb) {
                return this.limit(1).toArray(function (a) { return a[0]; }).then(cb);
            },
            last: function (cb) {
                return this.reverse().first(cb);
            },
            filter: function (filterFunction) {
                /// <param name="jsFunctionFilter" type="Function">function(val){return true/false}</param>
                addFilter(this._ctx, function (cursor) {
                    return filterFunction(cursor.value);
                });
                // match filters not used in Dexie.js but can be used by 3rd part libraries to test a
                // collection for a match without querying DB. Used by Dexie.Observable.
                addMatchFilter(this._ctx, filterFunction);
                return this;
            },
            and: function (filterFunction) {
                return this.filter(filterFunction);
            },
            or: function (indexName) {
                return new WhereClause(this._ctx.table, indexName, this);
            },
            reverse: function () {
                this._ctx.dir = (this._ctx.dir === "prev" ? "next" : "prev");
                if (this._ondirectionchange)
                    this._ondirectionchange(this._ctx.dir);
                return this;
            },
            desc: function () {
                return this.reverse();
            },
            eachKey: function (cb) {
                var ctx = this._ctx;
                ctx.keysOnly = !ctx.isMatch;
                return this.each(function (val, cursor) { cb(cursor.key, cursor); });
            },
            eachUniqueKey: function (cb) {
                this._ctx.unique = "unique";
                return this.eachKey(cb);
            },
            eachPrimaryKey: function (cb) {
                var ctx = this._ctx;
                ctx.keysOnly = !ctx.isMatch;
                return this.each(function (val, cursor) { cb(cursor.primaryKey, cursor); });
            },
            keys: function (cb) {
                var ctx = this._ctx;
                ctx.keysOnly = !ctx.isMatch;
                var a = [];
                return this.each(function (item, cursor) {
                    a.push(cursor.key);
                }).then(function () {
                    return a;
                }).then(cb);
            },
            primaryKeys: function (cb) {
                var ctx = this._ctx;
                if (hasGetAll && ctx.dir === 'next' && isPlainKeyRange(ctx, true) && ctx.limit > 0) {
                    // Special optimation if we could use IDBObjectStore.getAllKeys() or
                    // IDBKeyRange.getAllKeys():
                    return this._read(function (resolve, reject, idbstore) {
                        var idxOrStore = getIndexOrStore(ctx, idbstore);
                        var req = ctx.limit < Infinity ?
                            idxOrStore.getAllKeys(ctx.range, ctx.limit) :
                            idxOrStore.getAllKeys(ctx.range);
                        req.onerror = eventRejectHandler(reject);
                        req.onsuccess = eventSuccessHandler(resolve);
                    }).then(cb);
                }
                ctx.keysOnly = !ctx.isMatch;
                var a = [];
                return this.each(function (item, cursor) {
                    a.push(cursor.primaryKey);
                }).then(function () {
                    return a;
                }).then(cb);
            },
            uniqueKeys: function (cb) {
                this._ctx.unique = "unique";
                return this.keys(cb);
            },
            firstKey: function (cb) {
                return this.limit(1).keys(function (a) { return a[0]; }).then(cb);
            },
            lastKey: function (cb) {
                return this.reverse().firstKey(cb);
            },
            distinct: function () {
                var ctx = this._ctx, idx = ctx.index && ctx.table.schema.idxByName[ctx.index];
                if (!idx || !idx.multi)
                    return this; // distinct() only makes differencies on multiEntry indexes.
                var set = {};
                addFilter(this._ctx, function (cursor) {
                    var strKey = cursor.primaryKey.toString(); // Converts any Date to String, String to String, Number to String and Array to comma-separated string
                    var found = hasOwn(set, strKey);
                    set[strKey] = true;
                    return !found;
                });
                return this;
            },
            //
            // Methods that mutate storage
            //
            modify: function (changes) {
                var self = this, ctx = this._ctx, hook = ctx.table.hook, updatingHook = hook.updating.fire, deletingHook = hook.deleting.fire;
                return this._write(function (resolve, reject, idbstore, trans) {
                    var modifyer;
                    if (typeof changes === 'function') {
                        // Changes is a function that may update, add or delete propterties or even require a deletion the object itself (delete this.item)
                        if (updatingHook === nop && deletingHook === nop) {
                            // Noone cares about what is being changed. Just let the modifier function be the given argument as is.
                            modifyer = changes;
                        }
                        else {
                            // People want to know exactly what is being modified or deleted.
                            // Let modifyer be a proxy function that finds out what changes the caller is actually doing
                            // and call the hooks accordingly!
                            modifyer = function (item) {
                                var origItem = deepClone(item); // Clone the item first so we can compare laters.
                                if (changes.call(this, item, this) === false)
                                    return false; // Call the real modifyer function (If it returns false explicitely, it means it dont want to modify anyting on this object)
                                if (!hasOwn(this, "value")) {
                                    // The real modifyer function requests a deletion of the object. Inform the deletingHook that a deletion is taking place.
                                    deletingHook.call(this, this.primKey, item, trans);
                                }
                                else {
                                    // No deletion. Check what was changed
                                    var objectDiff = getObjectDiff(origItem, this.value);
                                    var additionalChanges = updatingHook.call(this, objectDiff, this.primKey, origItem, trans);
                                    if (additionalChanges) {
                                        // Hook want to apply additional modifications. Make sure to fullfill the will of the hook.
                                        item = this.value;
                                        keys(additionalChanges).forEach(function (keyPath) {
                                            setByKeyPath(item, keyPath, additionalChanges[keyPath]); // Adding {keyPath: undefined} means that the keyPath should be deleted. Handled by setByKeyPath
                                        });
                                    }
                                }
                            };
                        }
                    }
                    else if (updatingHook === nop) {
                        // changes is a set of {keyPath: value} and no one is listening to the updating hook.
                        var keyPaths = keys(changes);
                        var numKeys = keyPaths.length;
                        modifyer = function (item) {
                            var anythingModified = false;
                            for (var i = 0; i < numKeys; ++i) {
                                var keyPath = keyPaths[i], val = changes[keyPath];
                                if (getByKeyPath(item, keyPath) !== val) {
                                    setByKeyPath(item, keyPath, val); // Adding {keyPath: undefined} means that the keyPath should be deleted. Handled by setByKeyPath
                                    anythingModified = true;
                                }
                            }
                            return anythingModified;
                        };
                    }
                    else {
                        // changes is a set of {keyPath: value} and people are listening to the updating hook so we need to call it and
                        // allow it to add additional modifications to make.
                        var origChanges = changes;
                        changes = shallowClone(origChanges); // Let's work with a clone of the changes keyPath/value set so that we can restore it in case a hook extends it.
                        modifyer = function (item) {
                            var anythingModified = false;
                            var additionalChanges = updatingHook.call(this, changes, this.primKey, deepClone(item), trans);
                            if (additionalChanges)
                                extend(changes, additionalChanges);
                            keys(changes).forEach(function (keyPath) {
                                var val = changes[keyPath];
                                if (getByKeyPath(item, keyPath) !== val) {
                                    setByKeyPath(item, keyPath, val);
                                    anythingModified = true;
                                }
                            });
                            if (additionalChanges)
                                changes = shallowClone(origChanges); // Restore original changes for next iteration
                            return anythingModified;
                        };
                    }
                    var count = 0;
                    var successCount = 0;
                    var iterationComplete = false;
                    var failures = [];
                    var failKeys = [];
                    var currentKey = null;
                    function modifyItem(item, cursor) {
                        currentKey = cursor.primaryKey;
                        var thisContext = {
                            primKey: cursor.primaryKey,
                            value: item,
                            onsuccess: null,
                            onerror: null
                        };
                        function onerror(e) {
                            failures.push(e);
                            failKeys.push(thisContext.primKey);
                            checkFinished();
                            return true; // Catch these errors and let a final rejection decide whether or not to abort entire transaction
                        }
                        if (modifyer.call(thisContext, item, thisContext) !== false) {
                            var bDelete = !hasOwn(thisContext, "value");
                            ++count;
                            tryCatch(function () {
                                var req = (bDelete ? cursor.delete() : cursor.update(thisContext.value));
                                req._hookCtx = thisContext;
                                req.onerror = hookedEventRejectHandler(onerror);
                                req.onsuccess = hookedEventSuccessHandler(function () {
                                    ++successCount;
                                    checkFinished();
                                });
                            }, onerror);
                        }
                        else if (thisContext.onsuccess) {
                            // Hook will expect either onerror or onsuccess to always be called!
                            thisContext.onsuccess(thisContext.value);
                        }
                    }
                    function doReject(e) {
                        if (e) {
                            failures.push(e);
                            failKeys.push(currentKey);
                        }
                        return reject(new ModifyError("Error modifying one or more objects", failures, successCount, failKeys));
                    }
                    function checkFinished() {
                        if (iterationComplete && successCount + failures.length === count) {
                            if (failures.length > 0)
                                doReject();
                            else
                                resolve(successCount);
                        }
                    }
                    self.clone().raw()._iterate(modifyItem, function () {
                        iterationComplete = true;
                        checkFinished();
                    }, doReject, idbstore);
                });
            },
            'delete': function () {
                var _this = this;
                var ctx = this._ctx, range = ctx.range, deletingHook = ctx.table.hook.deleting.fire, hasDeleteHook = deletingHook !== nop;
                if (!hasDeleteHook &&
                    isPlainKeyRange(ctx) &&
                    ((ctx.isPrimKey && !hangsOnDeleteLargeKeyRange) || !range)) {
                    // May use IDBObjectStore.delete(IDBKeyRange) in this case (Issue #208)
                    // For chromium, this is the way most optimized version.
                    // For IE/Edge, this could hang the indexedDB engine and make operating system instable
                    // (https://gist.github.com/dfahlander/5a39328f029de18222cf2125d56c38f7)
                    return this._write(function (resolve, reject, idbstore) {
                        // Our API contract is to return a count of deleted items, so we have to count() before delete().
                        var onerror = eventRejectHandler(reject), countReq = (range ? idbstore.count(range) : idbstore.count());
                        countReq.onerror = onerror;
                        countReq.onsuccess = function () {
                            var count = countReq.result;
                            tryCatch(function () {
                                var delReq = (range ? idbstore.delete(range) : idbstore.clear());
                                delReq.onerror = onerror;
                                delReq.onsuccess = function () { return resolve(count); };
                            }, function (err) { return reject(err); });
                        };
                    });
                }
                // Default version to use when collection is not a vanilla IDBKeyRange on the primary key.
                // Divide into chunks to not starve RAM.
                // If has delete hook, we will have to collect not just keys but also objects, so it will use
                // more memory and need lower chunk size.
                var CHUNKSIZE = hasDeleteHook ? 2000 : 10000;
                return this._write(function (resolve, reject, idbstore, trans) {
                    var totalCount = 0;
                    // Clone collection and change its table and set a limit of CHUNKSIZE on the cloned Collection instance.
                    var collection = _this
                        .clone({
                        keysOnly: !ctx.isMatch && !hasDeleteHook
                    }) // load just keys (unless filter() or and() or deleteHook has subscribers)
                        .distinct() // In case multiEntry is used, never delete same key twice because resulting count
                        .limit(CHUNKSIZE)
                        .raw(); // Don't filter through reading-hooks (like mapped classes etc)
                    var keysOrTuples = [];
                    // We're gonna do things on as many chunks that are needed.
                    // Use recursion of nextChunk function:
                    var nextChunk = function () { return collection.each(hasDeleteHook ? function (val, cursor) {
                        // Somebody subscribes to hook('deleting'). Collect all primary keys and their values,
                        // so that the hook can be called with its values in bulkDelete().
                        keysOrTuples.push([cursor.primaryKey, cursor.value]);
                    } : function (val, cursor) {
                        // No one subscribes to hook('deleting'). Collect only primary keys:
                        keysOrTuples.push(cursor.primaryKey);
                    }).then(function () {
                        // Chromium deletes faster when doing it in sort order.
                        hasDeleteHook ?
                            keysOrTuples.sort(function (a, b) { return ascending(a[0], b[0]); }) :
                            keysOrTuples.sort(ascending);
                        return bulkDelete(idbstore, trans, keysOrTuples, hasDeleteHook, deletingHook);
                    }).then(function () {
                        var count = keysOrTuples.length;
                        totalCount += count;
                        keysOrTuples = [];
                        return count < CHUNKSIZE ? totalCount : nextChunk();
                    }); };
                    resolve(nextChunk());
                });
            }
        };
    });
    //
    //
    //
    // ------------------------- Help functions ---------------------------
    //
    //
    //
    function lowerVersionFirst(a, b) {
        return a._cfg.version - b._cfg.version;
    }
    function setApiOnPlace(objs, tableNames, dbschema) {
        tableNames.forEach(function (tableName) {
            var schema = dbschema[tableName];
            objs.forEach(function (obj) {
                if (!(tableName in obj)) {
                    if (obj === Transaction.prototype || obj instanceof Transaction) {
                        // obj is a Transaction prototype (or prototype of a subclass to Transaction)
                        // Make the API a getter that returns this.table(tableName)
                        setProp(obj, tableName, { get: function () { return this.table(tableName); } });
                    }
                    else {
                        // Table will not be bound to a transaction (will use Dexie.currentTransaction)
                        obj[tableName] = new Table(tableName, schema);
                    }
                }
            });
        });
    }
    function removeTablesApi(objs) {
        objs.forEach(function (obj) {
            for (var key in obj) {
                if (obj[key] instanceof Table)
                    delete obj[key];
            }
        });
    }
    function iterate(req, filter, fn, resolve, reject, valueMapper) {
        // Apply valueMapper (hook('reading') or mappped class)
        var mappedFn = valueMapper ? function (x, c, a) { return fn(valueMapper(x), c, a); } : fn;
        // Wrap fn with PSD and microtick stuff from Promise.
        var wrappedFn = wrap(mappedFn, reject);
        if (!req.onerror)
            req.onerror = eventRejectHandler(reject);
        if (filter) {
            req.onsuccess = trycatcher(function filter_record() {
                var cursor = req.result;
                if (cursor) {
                    var c = function () { cursor.continue(); };
                    if (filter(cursor, function (advancer) { c = advancer; }, resolve, reject))
                        wrappedFn(cursor.value, cursor, function (advancer) { c = advancer; });
                    c();
                }
                else {
                    resolve();
                }
            }, reject);
        }
        else {
            req.onsuccess = trycatcher(function filter_record() {
                var cursor = req.result;
                if (cursor) {
                    var c = function () { cursor.continue(); };
                    wrappedFn(cursor.value, cursor, function (advancer) { c = advancer; });
                    c();
                }
                else {
                    resolve();
                }
            }, reject);
        }
    }
    function parseIndexSyntax(indexes) {
        /// <param name="indexes" type="String"></param>
        /// <returns type="Array" elementType="IndexSpec"></returns>
        var rv = [];
        indexes.split(',').forEach(function (index) {
            index = index.trim();
            var name = index.replace(/([&*]|\+\+)/g, ""); // Remove "&", "++" and "*"
            // Let keyPath of "[a+b]" be ["a","b"]:
            var keyPath = /^\[/.test(name) ? name.match(/^\[(.*)\]$/)[1].split('+') : name;
            rv.push(new IndexSpec(name, keyPath || null, /\&/.test(index), /\*/.test(index), /\+\+/.test(index), isArray(keyPath), /\./.test(index)));
        });
        return rv;
    }
    function cmp(key1, key2) {
        return indexedDB.cmp(key1, key2);
    }
    function min(a, b) {
        return cmp(a, b) < 0 ? a : b;
    }
    function max(a, b) {
        return cmp(a, b) > 0 ? a : b;
    }
    function ascending(a, b) {
        return indexedDB.cmp(a, b);
    }
    function descending(a, b) {
        return indexedDB.cmp(b, a);
    }
    function simpleCompare(a, b) {
        return a < b ? -1 : a === b ? 0 : 1;
    }
    function simpleCompareReverse(a, b) {
        return a > b ? -1 : a === b ? 0 : 1;
    }
    function combine(filter1, filter2) {
        return filter1 ?
            filter2 ?
                function () { return filter1.apply(this, arguments) && filter2.apply(this, arguments); } :
                filter1 :
            filter2;
    }
    function readGlobalSchema() {
        db.verno = idbdb.version / 10;
        db._dbSchema = globalSchema = {};
        dbStoreNames = slice(idbdb.objectStoreNames, 0);
        if (dbStoreNames.length === 0)
            return; // Database contains no stores.
        var trans = idbdb.transaction(safariMultiStoreFix(dbStoreNames), 'readonly');
        dbStoreNames.forEach(function (storeName) {
            var store = trans.objectStore(storeName), keyPath = store.keyPath, dotted = keyPath && typeof keyPath === 'string' && keyPath.indexOf('.') !== -1;
            var primKey = new IndexSpec(keyPath, keyPath || "", false, false, !!store.autoIncrement, keyPath && typeof keyPath !== 'string', dotted);
            var indexes = [];
            for (var j = 0; j < store.indexNames.length; ++j) {
                var idbindex = store.index(store.indexNames[j]);
                keyPath = idbindex.keyPath;
                dotted = keyPath && typeof keyPath === 'string' && keyPath.indexOf('.') !== -1;
                var index = new IndexSpec(idbindex.name, keyPath, !!idbindex.unique, !!idbindex.multiEntry, false, keyPath && typeof keyPath !== 'string', dotted);
                indexes.push(index);
            }
            globalSchema[storeName] = new TableSchema(storeName, primKey, indexes, {});
        });
        setApiOnPlace([allTables], keys(globalSchema), globalSchema);
    }
    function adjustToExistingIndexNames(schema, idbtrans) {
        /// <summary>
        /// Issue #30 Problem with existing db - adjust to existing index names when migrating from non-dexie db
        /// </summary>
        /// <param name="schema" type="Object">Map between name and TableSchema</param>
        /// <param name="idbtrans" type="IDBTransaction"></param>
        var storeNames = idbtrans.db.objectStoreNames;
        for (var i = 0; i < storeNames.length; ++i) {
            var storeName = storeNames[i];
            var store = idbtrans.objectStore(storeName);
            hasGetAll = 'getAll' in store;
            for (var j = 0; j < store.indexNames.length; ++j) {
                var indexName = store.indexNames[j];
                var keyPath = store.index(indexName).keyPath;
                var dexieName = typeof keyPath === 'string' ? keyPath : "[" + slice(keyPath).join('+') + "]";
                if (schema[storeName]) {
                    var indexSpec = schema[storeName].idxByName[dexieName];
                    if (indexSpec)
                        indexSpec.name = indexName;
                }
            }
        }
        // Bug with getAll() on Safari ver<604 on Workers only, see discussion following PR #579
        if (/Safari/.test(navigator.userAgent) &&
            !/(Chrome\/|Edge\/)/.test(navigator.userAgent) &&
            _global.WorkerGlobalScope && _global instanceof _global.WorkerGlobalScope &&
            [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604) {
            hasGetAll = false;
        }
    }
    function fireOnBlocked(ev) {
        db.on("blocked").fire(ev);
        // Workaround (not fully*) for missing "versionchange" event in IE,Edge and Safari:
        connections
            .filter(function (c) { return c.name === db.name && c !== db && !c._vcFired; })
            .map(function (c) { return c.on("versionchange").fire(ev); });
    }
    extend(this, {
        Collection: Collection,
        Table: Table,
        Transaction: Transaction,
        Version: Version,
        WhereClause: WhereClause
    });
    init();
    addons.forEach(function (fn) {
        fn(db);
    });
}
function parseType(type) {
    if (typeof type === 'function') {
        return new type();
    }
    else if (isArray(type)) {
        return [parseType(type[0])];
    }
    else if (type && typeof type === 'object') {
        var rv = {};
        applyStructure(rv, type);
        return rv;
    }
    else {
        return type;
    }
}
function applyStructure(obj, structure) {
    keys(structure).forEach(function (member) {
        var value = parseType(structure[member]);
        obj[member] = value;
    });
    return obj;
}
function hookedEventSuccessHandler(resolve) {
    // wrap() is needed when calling hooks because the rare scenario of:
    //  * hook does a db operation that fails immediately (IDB throws exception)
    //    For calling db operations on correct transaction, wrap makes sure to set PSD correctly.
    //    wrap() will also execute in a virtual tick.
    //  * If not wrapped in a virtual tick, direct exception will launch a new physical tick.
    //  * If this was the last event in the bulk, the promise will resolve after a physical tick
    //    and the transaction will have committed already.
    // If no hook, the virtual tick will be executed in the reject()/resolve of the final promise,
    // because it is always marked with _lib = true when created using Transaction._promise().
    return wrap(function (event) {
        var req = event.target, ctx = req._hookCtx, // Contains the hook error handler. Put here instead of closure to boost performance.
        result = ctx.value || req.result, // Pass the object value on updates. The result from IDB is the primary key.
        hookSuccessHandler = ctx && ctx.onsuccess;
        hookSuccessHandler && hookSuccessHandler(result);
        resolve && resolve(result);
    }, resolve);
}
function eventRejectHandler(reject) {
    return wrap(function (event) {
        preventDefault(event);
        reject(event.target.error);
        return false;
    });
}
function eventSuccessHandler(resolve) {
    return wrap(function (event) {
        resolve(event.target.result);
    });
}
function hookedEventRejectHandler(reject) {
    return wrap(function (event) {
        // See comment on hookedEventSuccessHandler() why wrap() is needed only when supporting hooks.
        var req = event.target, err = req.error, ctx = req._hookCtx, // Contains the hook error handler. Put here instead of closure to boost performance.
        hookErrorHandler = ctx && ctx.onerror;
        hookErrorHandler && hookErrorHandler(err);
        preventDefault(event);
        reject(err);
        return false;
    });
}
function preventDefault(event) {
    if (event.stopPropagation)
        event.stopPropagation();
    if (event.preventDefault)
        event.preventDefault();
}
function awaitIterator(iterator) {
    var callNext = function (result) { return iterator.next(result); }, doThrow = function (error) { return iterator.throw(error); }, onSuccess = step(callNext), onError = step(doThrow);
    function step(getNext) {
        return function (val) {
            var next = getNext(val), value = next.value;
            return next.done ? value :
                (!value || typeof value.then !== 'function' ?
                    isArray(value) ? Promise.all(value).then(onSuccess, onError) : onSuccess(value) :
                    value.then(onSuccess, onError));
        };
    }
    return step(callNext)();
}
//
// IndexSpec struct
//
function IndexSpec(name, keyPath, unique, multi, auto, compound, dotted) {
    /// <param name="name" type="String"></param>
    /// <param name="keyPath" type="String"></param>
    /// <param name="unique" type="Boolean"></param>
    /// <param name="multi" type="Boolean"></param>
    /// <param name="auto" type="Boolean"></param>
    /// <param name="compound" type="Boolean"></param>
    /// <param name="dotted" type="Boolean"></param>
    this.name = name;
    this.keyPath = keyPath;
    this.unique = unique;
    this.multi = multi;
    this.auto = auto;
    this.compound = compound;
    this.dotted = dotted;
    var keyPathSrc = typeof keyPath === 'string' ? keyPath : keyPath && ('[' + [].join.call(keyPath, '+') + ']');
    this.src = (unique ? '&' : '') + (multi ? '*' : '') + (auto ? "++" : "") + keyPathSrc;
}
//
// TableSchema struct
//
function TableSchema(name, primKey, indexes, instanceTemplate) {
    /// <param name="name" type="String"></param>
    /// <param name="primKey" type="IndexSpec"></param>
    /// <param name="indexes" type="Array" elementType="IndexSpec"></param>
    /// <param name="instanceTemplate" type="Object"></param>
    this.name = name;
    this.primKey = primKey || new IndexSpec();
    this.indexes = indexes || [new IndexSpec()];
    this.instanceTemplate = instanceTemplate;
    this.mappedClass = null;
    this.idxByName = arrayToObject(indexes, function (index) { return [index.name, index]; });
}
function safariMultiStoreFix(storeNames) {
    return storeNames.length === 1 ? storeNames[0] : storeNames;
}
function getNativeGetDatabaseNamesFn(indexedDB) {
    var fn = indexedDB && (indexedDB.getDatabaseNames || indexedDB.webkitGetDatabaseNames);
    return fn && fn.bind(indexedDB);
}
// Export Error classes
props(Dexie, fullNameExceptions); // Dexie.XXXError = class XXXError {...};
//
// Static methods and properties
// 
props(Dexie, {
    //
    // Static delete() method.
    //
    delete: function (databaseName) {
        var db = new Dexie(databaseName), promise = db.delete();
        promise.onblocked = function (fn) {
            db.on("blocked", fn);
            return this;
        };
        return promise;
    },
    //
    // Static exists() method.
    //
    exists: function (name) {
        return new Dexie(name).open().then(function (db) {
            db.close();
            return true;
        }).catch(Dexie.NoSuchDatabaseError, function () { return false; });
    },
    //
    // Static method for retrieving a list of all existing databases at current host.
    //
    getDatabaseNames: function (cb) {
        var getDatabaseNames = getNativeGetDatabaseNamesFn(Dexie.dependencies.indexedDB);
        return getDatabaseNames ? new Promise(function (resolve, reject) {
            var req = getDatabaseNames();
            req.onsuccess = function (event) {
                resolve(slice(event.target.result, 0)); // Converst DOMStringList to Array<String>
            };
            req.onerror = eventRejectHandler(reject);
        }).then(cb) : dbNamesDB.dbnames.toCollection().primaryKeys(cb);
    },
    defineClass: function () {
        // Default constructor able to copy given properties into this object.
        function Class(properties) {
            /// <param name="properties" type="Object" optional="true">Properties to initialize object with.
            /// </param>
            if (properties)
                extend(this, properties);
        }
        return Class;
    },
    applyStructure: applyStructure,
    ignoreTransaction: function (scopeFunc) {
        // In case caller is within a transaction but needs to create a separate transaction.
        // Example of usage:
        //
        // Let's say we have a logger function in our app. Other application-logic should be unaware of the
        // logger function and not need to include the 'logentries' table in all transaction it performs.
        // The logging should always be done in a separate transaction and not be dependant on the current
        // running transaction context. Then you could use Dexie.ignoreTransaction() to run code that starts a new transaction.
        //
        //     Dexie.ignoreTransaction(function() {
        //         db.logentries.add(newLogEntry);
        //     });
        //
        // Unless using Dexie.ignoreTransaction(), the above example would try to reuse the current transaction
        // in current Promise-scope.
        //
        // An alternative to Dexie.ignoreTransaction() would be setImmediate() or setTimeout(). The reason we still provide an
        // API for this because
        //  1) The intention of writing the statement could be unclear if using setImmediate() or setTimeout().
        //  2) setTimeout() would wait unnescessary until firing. This is however not the case with setImmediate().
        //  3) setImmediate() is not supported in the ES standard.
        //  4) You might want to keep other PSD state that was set in a parent PSD, such as PSD.letThrough.
        return PSD.trans ?
            usePSD(PSD.transless, scopeFunc) : // Use the closest parent that was non-transactional.
            scopeFunc(); // No need to change scope because there is no ongoing transaction.
    },
    vip: function (fn) {
        // To be used by subscribers to the on('ready') event.
        // This will let caller through to access DB even when it is blocked while the db.ready() subscribers are firing.
        // This would have worked automatically if we were certain that the Provider was using Dexie.Promise for all asyncronic operations. The promise PSD
        // from the provider.connect() call would then be derived all the way to when provider would call localDatabase.applyChanges(). But since
        // the provider more likely is using non-promise async APIs or other thenable implementations, we cannot assume that.
        // Note that this method is only useful for on('ready') subscribers that is returning a Promise from the event. If not using vip()
        // the database could deadlock since it wont open until the returned Promise is resolved, and any non-VIPed operation started by
        // the caller will not resolve until database is opened.
        return newScope(function () {
            PSD.letThrough = true; // Make sure we are let through if still blocking db due to onready is firing.
            return fn();
        });
    },
    async: function (generatorFn) {
        return function () {
            try {
                var rv = awaitIterator(generatorFn.apply(this, arguments));
                if (!rv || typeof rv.then !== 'function')
                    return Promise.resolve(rv);
                return rv;
            }
            catch (e) {
                return rejection(e);
            }
        };
    },
    spawn: function (generatorFn, args, thiz) {
        try {
            var rv = awaitIterator(generatorFn.apply(thiz, args || []));
            if (!rv || typeof rv.then !== 'function')
                return Promise.resolve(rv);
            return rv;
        }
        catch (e) {
            return rejection(e);
        }
    },
    // Dexie.currentTransaction property
    currentTransaction: {
        get: function () { return PSD.trans || null; }
    },
    waitFor: function (promiseOrFunction, optionalTimeout) {
        // If a function is provided, invoke it and pass the returning value to Transaction.waitFor()
        var promise = Promise.resolve(typeof promiseOrFunction === 'function' ? Dexie.ignoreTransaction(promiseOrFunction) : promiseOrFunction)
            .timeout(optionalTimeout || 60000); // Default the timeout to one minute. Caller may specify Infinity if required.       
        // Run given promise on current transaction. If no current transaction, just return a Dexie promise based
        // on given value.
        return PSD.trans ? PSD.trans.waitFor(promise) : promise;
    },
    // Export our Promise implementation since it can be handy as a standalone Promise implementation
    Promise: Promise,
    // Dexie.debug proptery:
    // Dexie.debug = false
    // Dexie.debug = true
    // Dexie.debug = "dexie" - don't hide dexie's stack frames.
    debug: {
        get: function () { return debug; },
        set: function (value) {
            setDebug(value, value === 'dexie' ? function () { return true; } : dexieStackFrameFilter);
        }
    },
    // Export our derive/extend/override methodology
    derive: derive,
    extend: extend,
    props: props,
    override: override,
    // Export our Events() function - can be handy as a toolkit
    Events: Events,
    // Utilities
    getByKeyPath: getByKeyPath,
    setByKeyPath: setByKeyPath,
    delByKeyPath: delByKeyPath,
    shallowClone: shallowClone,
    deepClone: deepClone,
    getObjectDiff: getObjectDiff,
    asap: asap,
    maxKey: maxKey,
    minKey: minKey,
    // Addon registry
    addons: [],
    // Global DB connection list
    connections: connections,
    MultiModifyError: exceptions.Modify,
    errnames: errnames,
    // Export other static classes
    IndexSpec: IndexSpec,
    TableSchema: TableSchema,
    //
    // Dependencies
    //
    // These will automatically work in browsers with indexedDB support, or where an indexedDB polyfill has been included.
    //
    // In node.js, however, these properties must be set "manually" before instansiating a new Dexie().
    // For node.js, you need to require indexeddb-js or similar and then set these deps.
    //
    dependencies: (function () {
        try {
            return {
                // Required:
                indexedDB: _global.indexedDB || _global.mozIndexedDB || _global.webkitIndexedDB || _global.msIndexedDB,
                IDBKeyRange: _global.IDBKeyRange || _global.webkitIDBKeyRange
            };
        }
        catch (e) {
            return {
                indexedDB: null,
                IDBKeyRange: null
            };
        }
    })(),
    // API Version Number: Type Number, make sure to always set a version number that can be comparable correctly. Example: 0.9, 0.91, 0.92, 1.0, 1.01, 1.1, 1.2, 1.21, etc.
    semVer: DEXIE_VERSION,
    version: DEXIE_VERSION.split('.')
        .map(function (n) { return parseInt(n); })
        .reduce(function (p, c, i) { return p + (c / Math.pow(10, i * 2)); }),
    // https://github.com/dfahlander/Dexie.js/issues/186
    // typescript compiler tsc in mode ts-->es5 & commonJS, will expect require() to return
    // x.default. Workaround: Set Dexie.default = Dexie.
    default: Dexie,
    // Make it possible to import {Dexie} (non-default import)
    // Reason 1: May switch to that in future.
    // Reason 2: We declare it both default and named exported in d.ts to make it possible
    // to let addons extend the Dexie interface with Typescript 2.1 (works only when explicitely
    // exporting the symbol, not just default exporting)
    Dexie: Dexie
});
// Map DOMErrors and DOMExceptions to corresponding Dexie errors. May change in Dexie v2.0.
Promise.rejectionMapper = mapError;
// Initialize dbNamesDB (won't ever be opened on chromium browsers')
dbNamesDB = new Dexie('__dbnames');
dbNamesDB.version(1).stores({ dbnames: 'name' });
(function () {
    // Migrate from Dexie 1.x database names stored in localStorage:
    var DBNAMES = 'Dexie.DatabaseNames';
    try {
        if (typeof localStorage !== undefined && _global.document !== undefined) {
            // Have localStorage and is not executing in a worker. Lets migrate from Dexie 1.x.
            JSON.parse(localStorage.getItem(DBNAMES) || "[]")
                .forEach(function (name) { return dbNamesDB.dbnames.put({ name: name }).catch(nop); });
            localStorage.removeItem(DBNAMES);
        }
    }
    catch (_e) { }
})();

/* harmony default export */ __webpack_exports__["a"] = Dexie;
//# sourceMappingURL=dexie.es.js.map

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(39), __webpack_require__(134).setImmediate))

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(93), __esModule: true };

/***/ }),
/* 25 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
var document = __webpack_require__(1).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(19);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(4);
var dPs = __webpack_require__(109);
var enumBugKeys = __webpack_require__(27);
var IE_PROTO = __webpack_require__(31)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(26)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(44).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(32)('keys');
var uid = __webpack_require__(22);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var global = __webpack_require__(1);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(15) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 33 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(33);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(7);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(15);
var wksExt = __webpack_require__(37);
var defineProperty = __webpack_require__(5).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(2);


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(114)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(49)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 39 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_dexie__ = __webpack_require__(23);
/* ========================================================================== 
 *                           dexie-observable.js
 * ==========================================================================
 *
 * Dexie addon for observing database changes not just on local db instance
 * but also on other instances, tabs and windows.
 *
 * Comprises a base framework for dexie-syncable.js
 *
 * By David Fahlander, david.fahlander@gmail.com,
 *    Nikolas Poniros, https://github.com/nponiros
 *
 * ==========================================================================
 *
 * Version {version}, {date}
 *
 * http://dexie.org
 *
 * Apache License Version 2.0, January 2004, http://www.apache.org/licenses/
 * 
 */



function nop() { }
function promisableChain(f1, f2) {
    if (f1 === nop)
        return f2;
    return function () {
        var res = f1.apply(this, arguments);
        if (res && typeof res.then === 'function') {
            var thiz = this, args = arguments;
            return res.then(function () {
                return f2.apply(thiz, args);
            });
        }
        return f2.apply(this, arguments);
    };
}
function createUUID() {
    // Decent solution from http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    var d = Date.now();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    return uuid;
}

function initOverrideCreateTransaction(db, wakeupObservers) {
    return function overrideCreateTransaction(origFunc) {
        return function (mode, storenames, dbschema, parent) {
            if (db.dynamicallyOpened())
                return origFunc.apply(this, arguments); // Don't observe dynamically opened databases.
            var addChanges = false;
            if (mode === 'readwrite' && storenames.some(function (storeName) {
                return dbschema[storeName] && dbschema[storeName].observable;
            })) {
                // At least one included store is a observable store. Make sure to also include the _changes store.
                addChanges = true;
                storenames = storenames.slice(0); // Clone
                if (storenames.indexOf("_changes") === -1)
                    storenames.push("_changes"); // Otherwise, firefox will hang... (I've reported the bug to Mozilla@Bugzilla)
            }
            // Call original db._createTransaction()
            var trans = origFunc.call(this, mode, storenames, dbschema, parent);
            // If this transaction is bound to any observable table, make sure to add changes when transaction completes.
            if (addChanges) {
                trans._lastWrittenRevision = 0;
                trans.on('complete', function () {
                    if (trans._lastWrittenRevision) {
                        // Changes were written in this transaction.
                        if (!parent) {
                            // This is root-level transaction, i.e. a physical commit has happened.
                            // Delay-trigger a wakeup call:
                            if (wakeupObservers.timeoutHandle)
                                clearTimeout(wakeupObservers.timeoutHandle);
                            wakeupObservers.timeoutHandle = setTimeout(function () {
                                delete wakeupObservers.timeoutHandle;
                                wakeupObservers(trans._lastWrittenRevision);
                            }, 25);
                        }
                        else {
                            // This is just a virtual commit of a sub transaction.
                            // Wait with waking up observers until root transaction has committed.
                            // Make sure to mark root transaction so that it will wakeup observers upon commit.
                            var rootTransaction = (function findRootTransaction(trans) {
                                return trans.parent ? findRootTransaction(trans.parent) : trans;
                            })(parent);
                            rootTransaction._lastWrittenRevision = Math.max(trans._lastWrittenRevision, rootTransaction.lastWrittenRevision || 0);
                        }
                    }
                });
                // Derive "source" property from parent transaction by default
                if (trans.parent && trans.parent.source)
                    trans.source = trans.parent.source;
            }
            return trans;
        };
    };
}

function initWakeupObservers(db, Observable, localStorage) {
    return function wakeupObservers(lastWrittenRevision) {
        // Make sure Observable.latestRevision[db.name] is still below our value, now when some time has elapsed and other db instances in same window possibly could have made changes too.
        if (Observable.latestRevision[db.name] < lastWrittenRevision) {
            // Set the static property lastRevision[db.name] to the revision of the last written change.
            Observable.latestRevision[db.name] = lastWrittenRevision;
            // Wakeup ourselves, and any other db instances on this window:
            __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].ignoreTransaction(function () {
                Observable.on('latestRevisionIncremented').fire(db.name, lastWrittenRevision);
            });
            // Observable.on.latestRevisionIncremented will only wakeup db's in current window.
            // We need a storage event to wakeup other windwos.
            // Since indexedDB lacks storage events, let's use the storage event from WebStorage just for
            // the purpose to wakeup db instances in other windows.
            if (localStorage)
                localStorage.setItem('Dexie.Observable/latestRevision/' + db.name, lastWrittenRevision); // In IE, this will also wakeup our own window. However, onLatestRevisionIncremented will work around this by only running once per revision id.
        }
    };
}

// Change Types
// Change Types
var CREATE = 1;
var UPDATE = 2;
var DELETE = 3;

function initCreatingHook(db, table) {
    return function creatingHook(primKey, obj, trans) {
        /// <param name="trans" type="db.Transaction"></param>
        var rv = undefined;
        if (primKey === undefined && table.schema.primKey.uuid) {
            primKey = rv = createUUID();
            if (table.schema.primKey.keyPath) {
                __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].setByKeyPath(obj, table.schema.primKey.keyPath, primKey);
            }
        }
        var change = {
            source: trans.source || null,
            table: table.name,
            key: primKey === undefined ? null : primKey,
            type: CREATE,
            obj: obj
        };
        var promise = db._changes.add(change).then(function (rev) {
            trans._lastWrittenRevision = Math.max(trans._lastWrittenRevision, rev);
            return rev;
        });
        // Wait for onsuccess so that we have the primKey if it is auto-incremented and update the change item if so.
        this.onsuccess = function (resultKey) {
            if (primKey != resultKey)
                promise._then(function () {
                    change.key = resultKey;
                    db._changes.put(change);
                });
        };
        this.onerror = function () {
            // If the main operation fails, make sure to regret the change
            promise._then(function (rev) {
                // Will only happen if app code catches the main operation error to prohibit transaction from aborting.
                db._changes.delete(rev);
            });
        };
        return rv;
    };
}

function initUpdatingHook(db, tableName) {
    return function updatingHook(mods, primKey, oldObj, trans) {
        /// <param name="trans" type="db.Transaction"></param>
        // mods may contain property paths with undefined as value if the property
        // is being deleted. Since we cannot persist undefined we need to act
        // like those changes is setting the value to null instead.
        var modsWithoutUndefined = {};
        // As of current Dexie version (1.0.3) hook may be called even if it wouldn't really change.
        // Therefore we may do that kind of optimization here - to not add change entries if
        // there's nothing to change.
        var anythingChanged = false;
        var newObj = __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].deepClone(oldObj);
        for (var propPath in mods) {
            var mod = mods[propPath];
            if (typeof mod === 'undefined') {
                __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].delByKeyPath(newObj, propPath);
                modsWithoutUndefined[propPath] = null; // Null is as close we could come to deleting a property when not allowing undefined.
                anythingChanged = true;
            }
            else {
                var currentValue = __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].getByKeyPath(oldObj, propPath);
                if (mod !== currentValue && JSON.stringify(mod) !== JSON.stringify(currentValue)) {
                    __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].setByKeyPath(newObj, propPath, mod);
                    modsWithoutUndefined[propPath] = mod;
                    anythingChanged = true;
                }
            }
        }
        if (anythingChanged) {
            var change = {
                source: trans.source || null,
                table: tableName,
                key: primKey,
                type: UPDATE,
                mods: modsWithoutUndefined,
                oldObj: oldObj,
                obj: newObj
            };
            var promise = db._changes.add(change); // Just so we get the correct revision order of the update...
            this.onsuccess = function () {
                promise._then(function (rev) {
                    trans._lastWrittenRevision = Math.max(trans._lastWrittenRevision, rev);
                });
            };
            this.onerror = function () {
                // If the main operation fails, make sure to regret the change.
                promise._then(function (rev) {
                    // Will only happen if app code catches the main operation error to prohibit transaction from aborting.
                    db._changes.delete(rev);
                });
            };
        }
    };
}

function initDeletingHook(db, tableName) {
    return function deletingHook(primKey, obj, trans) {
        /// <param name="trans" type="db.Transaction"></param>
        var promise = db._changes.add({
            source: trans.source || null,
            table: tableName,
            key: primKey,
            type: DELETE,
            oldObj: obj
        }).then(function (rev) {
            trans._lastWrittenRevision = Math.max(trans._lastWrittenRevision, rev);
            return rev;
        })
            .catch(function (e) {
            console.log(obj);
            console.log(e.stack);
        });
        this.onerror = function () {
            // If the main operation fails, make sure to regret the change.
            // Using _then because if promise is already fullfilled, the standard then() would
            // do setTimeout() and we would loose the transaction.
            promise._then(function (rev) {
                // Will only happen if app code catches the main operation error to prohibit transaction from aborting.
                db._changes.delete(rev);
            });
        };
    };
}

function initCrudMonitor(db) {
    //
    // The Creating/Updating/Deleting hook will make sure any change is stored to the changes table
    //
    return function crudMonitor(table) {
        /// <param name="table" type="db.Table"></param>
        if (table.hook._observing)
            return;
        table.hook._observing = true;
        var tableName = table.name;
        table.hook('creating').subscribe(initCreatingHook(db, table));
        table.hook('updating').subscribe(initUpdatingHook(db, tableName));
        table.hook('deleting').subscribe(initDeletingHook(db, tableName));
    };
}

function initOnStorage(Observable) {
    return function onStorage(event) {
        // We use the onstorage event to trigger onLatestRevisionIncremented since we will wake up when other windows modify the DB as well!
        if (event.key.indexOf("Dexie.Observable/") === 0) {
            var parts = event.key.split('/');
            var prop = parts[1];
            var dbname = parts[2];
            if (prop === 'latestRevision') {
                var rev = parseInt(event.newValue, 10);
                if (!isNaN(rev) && rev > Observable.latestRevision[dbname]) {
                    Observable.latestRevision[dbname] = rev;
                    __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].ignoreTransaction(function () {
                        Observable.on('latestRevisionIncremented').fire(dbname, rev);
                    });
                }
            }
            else if (prop.indexOf("deadnode:") === 0) {
                var nodeID = parseInt(prop.split(':')[1], 10);
                if (event.newValue) {
                    Observable.on.suicideNurseCall.fire(dbname, nodeID);
                }
            }
            else if (prop === 'intercomm') {
                if (event.newValue) {
                    Observable.on.intercomm.fire(dbname);
                }
            }
        }
    };
}

function initOverrideOpen(db, SyncNode, crudMonitor) {
    return function overrideOpen(origOpen) {
        return function () {
            //
            // Make sure to subscribe to "creating", "updating" and "deleting" hooks for all observable tables that were created in the stores() method.
            //
            Object.keys(db._allTables).forEach(function (tableName) {
                var table = db._allTables[tableName];
                if (table.schema.observable) {
                    crudMonitor(table);
                }
                if (table.name === "_syncNodes") {
                    table.mapToClass(SyncNode);
                }
            });
            return origOpen.apply(this, arguments);
        };
    };
}

var Promise$1 = __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].Promise;
function initIntercomm(db, Observable, SyncNode, mySyncNode, localStorage) {
    //
    // Intercommunication between nodes
    //
    // Enable inter-process communication between browser windows using localStorage storage event (is registered in Dexie.Observable)
    var requestsWaitingForReply = {};
    /**
     * @param {string} type Type of message
     * @param message Message to send
     * @param {number} destinationNode ID of destination node
     * @param {{wantReply: boolean, isFailure: boolean, requestId: number}} options If {wantReply: true}, the returned promise will complete with the reply from remote. Otherwise it will complete when message has been successfully sent.</param>
     */
    db.observable.sendMessage = function (type, message, destinationNode, options) {
        /// <param name="type" type="String">Type of message</param>
        /// <param name="message">Message to send</param>
        /// <param name="destinationNode" type="Number">ID of destination node</param>
        /// <param name="options" type="Object" optional="true">{wantReply: Boolean, isFailure: Boolean, requestId: Number}. If wantReply, the returned promise will complete with the reply from remote. Otherwise it will complete when message has been successfully sent.</param>
        options = options || {};
        if (!mySyncNode.node)
            return options.wantReply ?
                Promise$1.reject(new __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].DatabaseClosedError()) :
                Promise$1.resolve(); // If caller doesn't want a reply, it won't catch errors either.
        var msg = { message: message, destinationNode: destinationNode, sender: mySyncNode.node.id, type: type };
        __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].extend(msg, options); // wantReply: wantReply, success: !isFailure, requestId: ...
        return __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].ignoreTransaction(function () {
            var tables = ["_intercomm"];
            if (options.wantReply)
                tables.push("_syncNodes"); // If caller wants a reply, include "_syncNodes" in transaction to check that there's a receiver there. Otherwise, new master will get it.
            var promise = db.transaction('rw', tables, function () {
                if (options.wantReply) {
                    // Check that there is a receiver there to take the request.
                    return db._syncNodes.where('id').equals(destinationNode).count(function (receiverAlive) {
                        if (receiverAlive)
                            return db._intercomm.add(msg);
                        else
                            return db._syncNodes.where('isMaster').above(0).first(function (masterNode) {
                                msg.destinationNode = masterNode.id;
                                return db._intercomm.add(msg);
                            });
                    });
                }
                else {
                    // If caller doesn't need a response, we don't have to make sure that it gets one.
                    return db._intercomm.add(msg);
                }
            }).then(function (messageId) {
                var rv = null;
                if (options.wantReply) {
                    rv = new Promise$1(function (resolve, reject) {
                        requestsWaitingForReply[messageId.toString()] = { resolve: resolve, reject: reject };
                    });
                }
                if (localStorage) {
                    localStorage.setItem("Dexie.Observable/intercomm/" + db.name, messageId.toString());
                }
                Observable.on.intercomm.fire(db.name);
                return rv;
            });
            if (!options.wantReply) {
                promise.catch(function () {
                });
                return;
            }
            else {
                // Forward rejection to caller if it waits for reply.
                return promise;
            }
        });
    };
    // Send a message to all local _syncNodes
    db.observable.broadcastMessage = function (type, message, bIncludeSelf) {
        if (!mySyncNode.node)
            return;
        var mySyncNodeId = mySyncNode.node.id;
        __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].ignoreTransaction(function () {
            db._syncNodes.toArray(function (nodes) {
                return Promise$1.all(nodes
                    .filter(function (node) { return node.type === 'local' && (bIncludeSelf || node.id !== mySyncNodeId); })
                    .map(function (node) { return db.observable.sendMessage(type, message, node.id); }));
            }).catch(function () {
            });
        });
    };
    function consumeIntercommMessages() {
        // Check if we got messages:
        if (!mySyncNode.node)
            return Promise$1.reject(new __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].DatabaseClosedError());
        return __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].ignoreTransaction(function () {
            return db.transaction('rw', '_intercomm', function () {
                return db._intercomm.where({ destinationNode: mySyncNode.node.id }).toArray(function (messages) {
                    messages.forEach(function (msg) { return consumeMessage(msg); });
                    return db._intercomm.where('id').anyOf(messages.map(function (msg) { return msg.id; })).delete();
                });
            });
        });
    }
    function consumeMessage(msg) {
        if (msg.type === 'response') {
            // This is a response. Lookup pending request and fulfill its promise.
            var request = requestsWaitingForReply[msg.requestId.toString()];
            if (request) {
                if (msg.isFailure) {
                    request.reject(msg.message.error);
                }
                else {
                    request.resolve(msg.message.result);
                }
                delete requestsWaitingForReply[msg.requestId.toString()];
            }
        }
        else {
            // This is a message or request. Fire the event and add an API for the subscriber to use if reply is requested
            msg.resolve = function (result) {
                db.observable.sendMessage('response', { result: result }, msg.sender, { requestId: msg.id });
            };
            msg.reject = function (error) {
                db.observable.sendMessage('response', { error: error.toString() }, msg.sender, { isFailure: true, requestId: msg.id });
            };
            db.on.message.fire(msg);
        }
    }
    // Listener for 'intercomm' events
    // Gets fired when we get a 'storage' event from local storage or when sendMessage is called
    // 'storage' is used to communicate between tabs (sendMessage changes the localStorage to trigger the event)
    // sendMessage is used to communicate in the same tab and to trigger a storage event
    function onIntercomm(dbname) {
        // When storage event trigger us to check
        if (dbname === db.name) {
            consumeIntercommMessages().catch('DatabaseClosedError', function () { });
        }
    }
    return {
        onIntercomm: onIntercomm,
        consumeIntercommMessages: consumeIntercommMessages
    };
}

function overrideParseStoresSpec(origFunc) {
    return function (stores, dbSchema) {
        // Create the _changes and _syncNodes tables
        stores["_changes"] = "++rev";
        stores["_syncNodes"] = "++id,myRevision,lastHeartBeat,&url,isMaster,type,status";
        stores["_intercomm"] = "++id,destinationNode";
        stores["_uncommittedChanges"] = "++id,node"; // For remote syncing when server returns a partial result.
        // Call default implementation. Will populate the dbSchema structures.
        origFunc.call(this, stores, dbSchema);
        // Allow UUID primary keys using $$ prefix on primary key or indexes
        Object.keys(dbSchema).forEach(function (tableName) {
            var schema = dbSchema[tableName];
            if (schema.primKey.name.indexOf('$$') === 0) {
                schema.primKey.uuid = true;
                schema.primKey.name = schema.primKey.name.substr(2);
                schema.primKey.keyPath = schema.primKey.keyPath.substr(2);
            }
        });
        // Now mark all observable tables
        Object.keys(dbSchema).forEach(function (tableName) {
            // Marked observable tables with "observable" in their TableSchema.
            if (tableName.indexOf('_') !== 0 && tableName.indexOf('$') !== 0) {
                dbSchema[tableName].observable = true;
            }
        });
    };
}

function deleteOldChanges(db) {
    // This is a background job and should never be done within
    // a caller's transaction. Use Dexie.ignoreTransaction() to ensure that.
    // We should not return the Promise but catch it ourselves instead.
    // To prohibit starving the database we want to lock transactions as short as possible
    // and since we're not in a hurry, we could do this job in chunks and reschedule a
    // continuation every 500 ms.
    var CHUNK_SIZE = 100;
    __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].ignoreTransaction(function () {
        return db._syncNodes.orderBy("myRevision").first(function (oldestNode) {
            return db._changes
                .where("rev").below(oldestNode.myRevision)
                .limit(CHUNK_SIZE)
                .primaryKeys();
        }).then(function (keysToDelete) {
            if (keysToDelete.length === 0)
                return; // Done.
            return db._changes.bulkDelete(keysToDelete).then(function () {
                // If not done garbage collecting, reschedule a continuation of it until done.
                if (keysToDelete.length === CHUNK_SIZE) {
                    // Limit reached. Changes are there are more job to do. Schedule again:
                    setTimeout(function () { return db.isOpen() && deleteOldChanges(db); }, 500);
                }
            });
        });
    }).catch(function () {
        // The operation is not crucial. A failure could almost only be due to that database has been closed.
        // No need to log this.
    });
}

/* ==========================================================================
 *                           dexie-observable.js
 * ==========================================================================
 *
 * Dexie addon for observing database changes not just on local db instance
 * but also on other instances, tabs and windows.
 *
 * Comprises a base framework for dexie-syncable.js
 *
 * By David Fahlander, david.fahlander@gmail.com,
 *    Nikolas Poniros, https://github.com/nponiros
 *
 * ==========================================================================
 *
 * Version {version}, {date}
 *
 * http://dexie.org
 *
 * Apache License Version 2.0, January 2004, http://www.apache.org/licenses/
 *
 */
var global = self;
/** class DatabaseChange
    *
    *  Object contained by the _changes table.
    */
var DatabaseChange = __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].defineClass({
    rev: Number,
    source: String,
    table: String,
    key: Object,
    type: Number,
    obj: Object,
    mods: Object,
    oldObj: Object // DELETE: oldObj contains the object deleted. UPDATE: oldObj contains the old object before updates applied.
});
// Import some usable helper functions
var override = __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].override;
var Promise = __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].Promise;
var browserIsShuttingDown = false;
function Observable(db) {
    /// <summary>
    ///   Extension to Dexie providing Syncronization capabilities to Dexie.
    /// </summary>
    /// <param name="db" type="Dexie"></param>
    var NODE_TIMEOUT = 20000, // 20 seconds before local db instances are timed out. This is so that old changes can be deleted when not needed and to garbage collect old _syncNodes objects.
    HIBERNATE_GRACE_PERIOD = 20000, // 20 seconds
    // LOCAL_POLL: The time to wait before polling local db for changes and cleaning up old nodes. 
    // Polling for changes is a fallback only needed in certain circomstances (when the onstorage event doesnt reach all listeners - when different browser windows doesnt share the same process)
    LOCAL_POLL = 500, // 500 ms. In real-world there will be this value + the time it takes to poll(). A small value is needed in Workers where we cannot rely on storage event.
    HEARTBEAT_INTERVAL = NODE_TIMEOUT - 5000;
    var localStorage = Observable.localStorageImpl;
    /** class SyncNode
        *
        * Object contained in the _syncNodes table.
        */
    var SyncNode = __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].defineClass({
        //id: Number,
        myRevision: Number,
        type: String,
        lastHeartBeat: Number,
        deleteTimeStamp: Number,
        url: String,
        isMaster: Number,
        // Below properties should be extended in Dexie.Syncable. Not here. They apply to remote nodes only (type == "remote"):
        syncProtocol: String,
        syncContext: null,
        syncOptions: Object,
        connected: false,
        status: Number,
        appliedRemoteRevision: null,
        remoteBaseRevisions: [{ local: Number, remote: null }],
        dbUploadState: {
            tablesToUpload: [String],
            currentTable: String,
            currentKey: null,
            localBaseRevision: Number
        }
    });
    db.observable = {};
    db.observable.SyncNode = SyncNode;
    var wakeupObservers = initWakeupObservers(db, Observable, localStorage);
    var overrideCreateTransaction = initOverrideCreateTransaction(db, wakeupObservers);
    var crudMonitor = initCrudMonitor(db);
    var overrideOpen = initOverrideOpen(db, SyncNode, crudMonitor);
    var mySyncNode = { node: null };
    var intercomm = initIntercomm(db, Observable, SyncNode, mySyncNode, localStorage);
    var onIntercomm = intercomm.onIntercomm;
    var consumeIntercommMessages = intercomm.consumeIntercommMessages;
    // Allow other addons to access the local sync node. May be needed by Dexie.Syncable.
    Object.defineProperty(db, "_localSyncNode", {
        get: function () { return mySyncNode.node; }
    });
    var pollHandle = null, heartbeatHandle = null;
    if (__WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].fake) {
        // This code will never run.
        // It's here just to enable auto-complete in visual studio - helps a lot when writing code.
        db.version(1).stores({
            _syncNodes: "++id,myRevision,lastHeartBeat",
            _changes: "++rev",
            _intercomm: "++id,destinationNode",
            _uncommittedChanges: "++id,node"
        });
        db._syncNodes.mapToClass(SyncNode);
        db._changes.mapToClass(DatabaseChange);
        mySyncNode.node = new SyncNode({
            myRevision: 0,
            type: "local",
            lastHeartBeat: Date.now(),
            deleteTimeStamp: null
        });
    }
    //
    // Override parsing the stores to add "_changes" and "_syncNodes" tables.
    // It also adds UUID support for the primary key and sets tables as observable tables.
    //
    db.Version.prototype._parseStoresSpec = override(db.Version.prototype._parseStoresSpec, overrideParseStoresSpec);
    // changes event on db:
    db.on.addEventType({
        changes: 'asap',
        cleanup: [promisableChain, nop],
        message: 'asap'
    });
    //
    // Override transaction creation to always include the "_changes" store when any observable store is involved.
    //
    db._createTransaction = override(db._createTransaction, overrideCreateTransaction);
    // If Observable.latestRevsion[db.name] is undefined, set it to 0 so that comparing against it always works.
    // You might think that it will always be undefined before this call, but in case another Dexie instance in the same
    // window with the same database name has been created already, this static property will already be set correctly.
    Observable.latestRevision[db.name] = Observable.latestRevision[db.name] || 0;
    //
    // Override open to setup hooks for db changes and map the _syncNodes table to class
    //
    db.open = override(db.open, overrideOpen);
    db.close = override(db.close, function (origClose) {
        return function () {
            if (db.dynamicallyOpened())
                return origClose.apply(this, arguments); // Don't observe dynamically opened databases.
            // Teardown our framework.
            if (wakeupObservers.timeoutHandle) {
                clearTimeout(wakeupObservers.timeoutHandle);
                delete wakeupObservers.timeoutHandle;
            }
            Observable.on('latestRevisionIncremented').unsubscribe(onLatestRevisionIncremented);
            Observable.on('suicideNurseCall').unsubscribe(onSuicide);
            Observable.on('intercomm').unsubscribe(onIntercomm);
            Observable.on('beforeunload').unsubscribe(onBeforeUnload);
            // Inform other db instances in same window that we are dying:
            if (mySyncNode.node && mySyncNode.node.id) {
                Observable.on.suicideNurseCall.fire(db.name, mySyncNode.node.id);
                // Inform other windows as well:
                if (localStorage) {
                    localStorage.setItem('Dexie.Observable/deadnode:' + mySyncNode.node.id.toString() + '/' + db.name, "dead"); // In IE, this will also wakeup our own window. cleanup() may trigger twice per other db instance. But that doesnt to anything.
                }
                mySyncNode.node.deleteTimeStamp = 1; // One millisecond after 1970. Makes it occur in the past but still keeps it truthy.
                mySyncNode.node.lastHeartBeat = 0;
                db._syncNodes.put(mySyncNode.node); // This async operation may be cancelled since the browser is closing down now.
                mySyncNode.node = null;
            }
            if (pollHandle)
                clearTimeout(pollHandle);
            pollHandle = null;
            if (heartbeatHandle)
                clearTimeout(heartbeatHandle);
            heartbeatHandle = null;
            return origClose.apply(this, arguments);
        };
    });
    // Override Dexie.delete() in order to delete Observable.latestRevision[db.name].
    db.delete = override(db.delete, function (origDelete) {
        return function () {
            return origDelete.apply(this, arguments).then(function (result) {
                // Reset Observable.latestRevision[db.name]
                Observable.latestRevision[db.name] = 0;
                return result;
            });
        };
    });
    // When db opens, make sure to start monitor any changes before other db operations will start.
    db.on("ready", function startObserving() {
        if (db.dynamicallyOpened())
            return db; // Don't observe dynamically opened databases.
        return db.table("_changes").orderBy("rev").last(function (lastChange) {
            // Since startObserving() is called before database open() method, this will be the first database operation enqueued to db.
            // Therefore we know that the retrieved value will be This query will
            var latestRevision = (lastChange ? lastChange.rev : 0);
            mySyncNode.node = new SyncNode({
                myRevision: latestRevision,
                type: "local",
                lastHeartBeat: Date.now(),
                deleteTimeStamp: null,
                isMaster: 0
            });
            if (Observable.latestRevision[db.name] < latestRevision) {
                // Side track . For correctness whenever setting Observable.latestRevision[db.name] we must make sure the event is fired if increased:
                // There are other db instances in same window that hasnt yet been informed about a new revision
                Observable.latestRevision[db.name] = latestRevision;
                __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].ignoreTransaction(function () {
                    Observable.on.latestRevisionIncremented.fire(latestRevision);
                });
            }
            // Add new sync node or if this is a reopening of the database after a close() call, update it.
            return db.transaction('rw', '_syncNodes', function () {
                return db._syncNodes
                    .where('isMaster').equals(1)
                    .first(function (currentMaster) {
                    if (!currentMaster) {
                        // There's no master. We must be the master
                        mySyncNode.node.isMaster = 1;
                    }
                    else if (currentMaster.lastHeartBeat < Date.now() - NODE_TIMEOUT) {
                        // Master have been inactive for too long
                        // Take over mastership
                        mySyncNode.node.isMaster = 1;
                        currentMaster.isMaster = 0;
                        return db._syncNodes.put(currentMaster);
                    }
                }).then(function () {
                    // Add our node to DB and start subscribing to events
                    return db._syncNodes.add(mySyncNode.node).then(function () {
                        Observable.on('latestRevisionIncremented', onLatestRevisionIncremented); // Wakeup when a new revision is available.
                        Observable.on('beforeunload', onBeforeUnload);
                        Observable.on('suicideNurseCall', onSuicide);
                        Observable.on('intercomm', onIntercomm);
                        // Start polling for changes and do cleanups:
                        pollHandle = setTimeout(poll, LOCAL_POLL);
                        // Start heartbeat
                        heartbeatHandle = setTimeout(heartbeat, HEARTBEAT_INTERVAL);
                    });
                });
            }).then(function () {
                cleanup();
            });
        });
    }, true); // True means the on(ready) event will survive a db reopening (db.close() / db.open()).
    var handledRevision = 0;
    function onLatestRevisionIncremented(dbname, latestRevision) {
        if (dbname === db.name) {
            if (handledRevision >= latestRevision)
                return; // Make sure to only run once per revision. (Workaround for IE triggering storage event on same window)
            handledRevision = latestRevision;
            __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].vip(function () {
                readChanges(latestRevision).catch('DatabaseClosedError', function () {
                    // Handle database closed error gracefully while reading changes.
                    // Don't trigger 'unhandledrejection'.
                    // Even though we intercept the close() method, it might be called when in the middle of
                    // reading changes and then that flow will cancel with DatabaseClosedError.
                });
            });
        }
    }
    function readChanges(latestRevision, recursion, wasPartial) {
        // Whenever changes are read, fire db.on("changes") with the array of changes. Eventually, limit the array to 1000 entries or so (an entire database is
        // downloaded from server AFTER we are initiated. For example, if first sync call fails, then after a while we get reconnected. However, that scenario
        // should be handled in case database is totally empty we should fail if sync is not available)
        if (!recursion && readChanges.ongoingOperation) {
            // We are already reading changes. Prohibit a parallell execution of this which would lead to duplicate trigging of 'changes' event.
            // Instead, the callback in toArray() will always check Observable.latestRevision[db.name] to see if it has changed and if so, re-launch readChanges().
            // The caller should get the Promise instance from the ongoing operation so that the then() method will resolve when operation is finished.
            return readChanges.ongoingOperation;
        }
        var partial = false;
        var ourSyncNode = mySyncNode.node; // Because mySyncNode can suddenly be set to null on database close, and worse, can be set to a new value if database is reopened.
        if (!ourSyncNode) {
            return Promise.reject(new __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].DatabaseClosedError());
        }
        var LIMIT = 1000;
        var promise = db._changes.where("rev").above(ourSyncNode.myRevision).limit(LIMIT).toArray(function (changes) {
            if (changes.length > 0) {
                var lastChange = changes[changes.length - 1];
                partial = (changes.length === LIMIT);
                db.on('changes').fire(changes, partial);
                ourSyncNode.myRevision = lastChange.rev;
            }
            else if (wasPartial) {
                // No more changes, BUT since we have triggered on('changes') with partial = true,
                // we HAVE TO trigger changes again with empty list and partial = false
                db.on('changes').fire([], false);
            }
            var ourNodeStillExists = false;
            return db._syncNodes.where(':id').equals(ourSyncNode.id).modify(function (syncNode) {
                ourNodeStillExists = true;
                syncNode.lastHeartBeat = Date.now(); // Update heart beat (not nescessary, but why not!)
                syncNode.deleteTimeStamp = null; // Reset "deleteTimeStamp" flag if it was there.
                syncNode.myRevision = Math.max(syncNode.myRevision, ourSyncNode.myRevision);
            }).then(function () { return ourNodeStillExists; });
        }).then(function (ourNodeStillExists) {
            if (!ourNodeStillExists) {
                // My node has been deleted. We must have been lazy and got removed by another node.
                if (browserIsShuttingDown) {
                    throw new Error("Browser is shutting down");
                }
                else {
                    db.close();
                    console.error("Out of sync"); // TODO: What to do? Reload the page?
                    if (global.location)
                        global.location.reload(true);
                    throw new Error("Out of sync"); // Will make current promise reject
                }
            }
            // Check if more changes have come since we started reading changes in the first place. If so, relaunch readChanges and let the ongoing promise not
            // resolve until all changes have been read.
            if (partial || Observable.latestRevision[db.name] > ourSyncNode.myRevision) {
                // Either there were more than 1000 changes or additional changes where added while we were reading these changes,
                // In either case, call readChanges() again until we're done.
                return readChanges(Observable.latestRevision[db.name], (recursion || 0) + 1, partial);
            }
        }).finally(function () {
            delete readChanges.ongoingOperation;
        });
        if (!recursion) {
            readChanges.ongoingOperation = promise;
        }
        return promise;
    }
    /**
     * The reason we need heartbeat in parallell with poll() is due to the risk of long-running
     * transactions while syncing changes from server to client in Dexie.Syncable. That transaction will
     * include _changes (which will block readChanges()) but not _syncNodes. So this heartbeat will go on
     * during that changes are being applied and update our lastHeartBeat property while poll() is waiting.
     * When cleanup() (who also is blocked by the sync) wakes up, it won't kill the master node because this
     * heartbeat job will have updated the master node's heartbeat during the long-running sync transaction.
     *
     * If we did not have this heartbeat, and a server send lots of changes that took more than NODE_TIMEOUT
     * (20 seconds), another node waking up after the sync would kill the master node and take over because
     * it would believe it was dead.
     */
    function heartbeat() {
        heartbeatHandle = null;
        var currentInstance = mySyncNode.node && mySyncNode.node.id;
        if (!currentInstance)
            return;
        db.transaction('rw!', db._syncNodes, function () {
            db._syncNodes.where({ id: currentInstance }).first(function (ourSyncNode) {
                if (!ourSyncNode) {
                    // We do not exist anymore. Call db.close() to teardown polls etc.
                    if (db.isOpen())
                        db.close();
                    return;
                }
                ourSyncNode.lastHeartBeat = Date.now();
                ourSyncNode.deleteTimeStamp = null; // Reset "deleteTimeStamp" flag if it was there.
                return db._syncNodes.put(ourSyncNode);
            });
        }).catch('DatabaseClosedError', function () {
            // Ignore silently
        }).finally(function () {
            if (mySyncNode.node && mySyncNode.node.id === currentInstance && db.isOpen()) {
                heartbeatHandle = setTimeout(heartbeat, HEARTBEAT_INTERVAL);
            }
        });
    }
    function poll() {
        pollHandle = null;
        var currentInstance = mySyncNode.node && mySyncNode.node.id;
        if (!currentInstance)
            return;
        __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].vip(function () {
            readChanges(Observable.latestRevision[db.name]).then(cleanup).then(consumeIntercommMessages)
                .catch('DatabaseClosedError', function () {
                // Handle database closed error gracefully while reading changes.
                // Don't trigger 'unhandledrejection'.
                // Even though we intercept the close() method, it might be called when in the middle of
                // reading changes and then that flow will cancel with DatabaseClosedError.
            })
                .finally(function () {
                // Poll again in given interval:
                if (mySyncNode.node && mySyncNode.node.id === currentInstance && db.isOpen()) {
                    pollHandle = setTimeout(poll, LOCAL_POLL);
                }
            });
        });
    }
    function cleanup() {
        var ourSyncNode = mySyncNode.node;
        if (!ourSyncNode)
            return Promise.reject(new __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].DatabaseClosedError());
        return db.transaction('rw', '_syncNodes', '_changes', '_intercomm', function () {
            // Cleanup dead local nodes that has no heartbeat for over a minute
            // Dont do the following:
            //nodes.where("lastHeartBeat").below(Date.now() - NODE_TIMEOUT).and(function (node) { return node.type == "local"; }).delete();
            // Because client may have been in hybernate mode and recently woken up. That would lead to deletion of all nodes.
            // Instead, we should mark any old nodes for deletion in a minute or so. If they still dont wakeup after that minute we could consider them dead.
            var weBecameMaster = false;
            db._syncNodes.where("lastHeartBeat").below(Date.now() - NODE_TIMEOUT).filter(function (node) { return node.type === 'local'; }).modify(function (node) {
                if (node.deleteTimeStamp && node.deleteTimeStamp < Date.now()) {
                    // Delete the node.
                    delete this.value;
                    // Cleanup localStorage "deadnode:" entry for this node (localStorage API was used to wakeup other windows (onstorage event) - an event type missing in indexedDB.)
                    if (localStorage) {
                        localStorage.removeItem('Dexie.Observable/deadnode:' + node.id + '/' + db.name);
                    }
                    // Check if we are deleting a master node
                    if (node.isMaster) {
                        // The node we are deleting is master. We must take over that role.
                        // OK to call nodes.update(). No need to call Dexie.vip() because nodes is opened in existing transaction!
                        db._syncNodes.update(ourSyncNode, { isMaster: 1 });
                        weBecameMaster = true;
                    }
                    // Cleanup intercomm messages destinated to the node being deleted.
                    // Those that waits for reply should be redirected to us.
                    db._intercomm.where({ destinationNode: node.id }).modify(function (msg) {
                        if (msg.wantReply)
                            msg.destinationNode = ourSyncNode.id;
                        else
                            // Delete the message from DB and if someone is waiting for reply, let ourselved answer the request.
                            delete this.value;
                    });
                }
                else if (!node.deleteTimeStamp) {
                    // Mark the node for deletion
                    node.deleteTimeStamp = Date.now() + HIBERNATE_GRACE_PERIOD;
                }
            }).then(function () {
                // Cleanup old revisions that no node is interested of.
                Observable.deleteOldChanges(db);
                return db.on("cleanup").fire(weBecameMaster);
            });
        });
    }
    function onBeforeUnload() {
        // Mark our own sync node for deletion.
        if (!mySyncNode.node)
            return;
        browserIsShuttingDown = true;
        mySyncNode.node.deleteTimeStamp = 1; // One millisecond after 1970. Makes it occur in the past but still keeps it truthy.
        mySyncNode.node.lastHeartBeat = 0;
        db._syncNodes.put(mySyncNode.node); // This async operation may be cancelled since the browser is closing down now.
        Observable.wereTheOneDying = true; // If other nodes in same window wakes up by this call, make sure they dont start taking over mastership and stuff...
        // Inform other windows that we're gone, so that they may take over our role if needed. Setting localStorage item below will trigger Observable.onStorage, which will trigger onSuicie() below:
        if (localStorage) {
            localStorage.setItem('Dexie.Observable/deadnode:' + mySyncNode.node.id.toString() + '/' + db.name, "dead"); // In IE, this will also wakeup our own window. However, that is doublechecked in nursecall subscriber below.
        }
    }
    function onSuicide(dbname, nodeID) {
        if (dbname === db.name && !Observable.wereTheOneDying) {
            // Make sure it's dead indeed. Second bullet. Why? Because it has marked itself for deletion in the onbeforeunload event, which is fired just before window dies.
            // It's own call to put() may have been cancelled.
            // Note also that in IE, this event may be called twice, but that doesnt harm!
            __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].vip(function () {
                db._syncNodes.update(nodeID, { deleteTimeStamp: 1, lastHeartBeat: 0 }).then(cleanup);
            });
        }
    }
}
//
// Static properties and methods
// 
Observable.latestRevision = {}; // Latest revision PER DATABASE. Example: Observable.latestRevision.FriendsDB = 37;
Observable.on = __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].Events(null, "latestRevisionIncremented", "suicideNurseCall", "intercomm", "beforeunload"); // fire(dbname, value);
Observable.createUUID = createUUID;
Observable.deleteOldChanges = deleteOldChanges;
Observable._onStorage = initOnStorage(Observable);
Observable._onBeforeUnload = function () {
    Observable.on.beforeunload.fire();
};
try {
    Observable.localStorageImpl = global.localStorage;
}
catch (ex) { }
//
// Map window events to static events in Dexie.Observable:
//
if (global.addEventListener) {
    global.addEventListener("storage", Observable._onStorage);
    global.addEventListener("beforeunload", Observable._onBeforeUnload);
}
// Register addon:
__WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].Observable = Observable;
__WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].addons.push(Observable);

/* harmony default export */ __webpack_exports__["a"] = Observable;
//# sourceMappingURL=dexie-observable.es.js.map


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(89), __esModule: true };

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(78);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(77);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(13);
var TAG = __webpack_require__(2)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(1).document;
module.exports = document && document.documentElement;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(11)(function () {
  return Object.defineProperty(__webpack_require__(26)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(13);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(14);
var ITERATOR = __webpack_require__(2)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(4);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(15);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(58);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(14);
var $iterCreate = __webpack_require__(104);
var setToStringTag = __webpack_require__(21);
var getPrototypeOf = __webpack_require__(53);
var ITERATOR = __webpack_require__(2)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(2)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(20);
var createDesc = __webpack_require__(17);
var toIObject = __webpack_require__(12);
var toPrimitive = __webpack_require__(35);
var has = __webpack_require__(8);
var IE8_DOM_DEFINE = __webpack_require__(45);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(54);
var hiddenKeys = __webpack_require__(27).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(8);
var toObject = __webpack_require__(18);
var IE_PROTO = __webpack_require__(31)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(8);
var toIObject = __webpack_require__(12);
var arrayIndexOf = __webpack_require__(98)(false);
var IE_PROTO = __webpack_require__(31)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(3);
var core = __webpack_require__(0);
var fails = __webpack_require__(11);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(4);
var isObject = __webpack_require__(7);
var newPromiseCapability = __webpack_require__(28);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(4);
var aFunction = __webpack_require__(19);
var SPECIES = __webpack_require__(2)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(10);
var invoke = __webpack_require__(102);
var html = __webpack_require__(44);
var cel = __webpack_require__(26);
var global = __webpack_require__(1);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(13)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(43);
var ITERATOR = __webpack_require__(2)('iterator');
var Iterators = __webpack_require__(14);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 62 */
/***/ (function(module, exports) {



/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(118);
var global = __webpack_require__(1);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(14);
var TO_STRING_TAG = __webpack_require__(2)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony export (immutable) */ __webpack_exports__["a"] = initConnectionStatus;

var CONNECTION_CHECK_PATH = 'check';

function initConnectionStatus(global) {
  function checkServerConnection(url) {
    return global.fetch(url, { method: 'HEAD' });
  }

  function isOnline(url) {
    // If we have no URL we are offline
    if (!url) {
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve(false);
    }
    var serverUrl = url[url.length - 1] === '/' ? '' + url + CONNECTION_CHECK_PATH : url + '/' + CONNECTION_CHECK_PATH;

    if (global.navigator.onLine) {
      return checkServerConnection(serverUrl).then(function () {
        return true;
      }).catch(function () {
        return false;
      });
    }
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.resolve(false);
  }

  function onlineStatusChanged(url, cb) {
    global.addEventListener('online', function () {
      isOnline(url).then(function (status) {
        cb(status);
      });
    });

    global.addEventListener('offline', function () {
      cb(false);
    });

    // Set initial status
    isOnline(url).then(function (status) {
      cb(status);
    });
  }

  return { isOnline: isOnline, onlineStatusChanged: onlineStatusChanged };
}

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* eslint guard-for-in:0, no-unused-vars: 0 */
/**
 * cuid.js
 * Collision-resistant UID generator for browsers and node.
 * Sequential for fast db lookups and recency sorting.
 * Safe for element IDs and server-side lookups.
 *
 * Extracted from CLCTR
 *
 * Copyright (c) Eric Elliott 2012
 * MIT License
 */
// The file was modified to use ES2015
var c = 0;
var blockSize = 4;
var base = 36;
var discreteValues = Math.pow(base, blockSize);

function pad(num, size) {
  var s = '000000000' + num;
  return s.substr(s.length - size);
}

function randomBlock() {
  return pad((Math.random() * discreteValues << 0).toString(base), blockSize);
}

function safeCounter() {
  c = c < discreteValues ? c : 0;
  c++; // this is not subliminal
  return c - 1;
}

// We want to cache the results of this
var cache = function calc() {
  var count = 0;

  for (var i in window) {
    count++;
  }

  return count;
}();

function globalCount() {
  return cache;
}

function browserPrint() {
  var mimeTypesUAString = (navigator.mimeTypes.length + navigator.userAgent.length).toString(base);
  return pad(mimeTypesUAString + globalCount().toString(base), 4);
}

function cuid() {
  // Starting with a lowercase letter makes
  // it HTML element ID friendly.
  var letter = 'c'; // hard-coded allows for sequential access

  // timestamp
  // warning: this exposes the exact date and time
  // that the uid was created.
  var timestamp = new Date().getTime().toString(base);

  // A few chars to generate distinct ids for different
  // clients (so different computers are far less
  // likely to generate the same id)
  var fingerprint = browserPrint();

  // Grab some more chars from Math.random()
  var random = randomBlock() + randomBlock();

  // Prevent same-machine collisions.
  var counter = pad(safeCounter().toString(base), blockSize);

  return letter + timestamp + counter + fingerprint + random;
}

/* harmony default export */ __webpack_exports__["a"] = cuid;

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initSync;
/*
 * Implementation of the ISyncProtocol
 * https://github.com/dfahlander/Dexie.js/wiki/Dexie.Syncable.ISyncProtocol
 */
function initSync(serverComm, isOnline) {
  return function sync(context, url, options, baseRevision, syncedRevision, changes, partial, applyRemoteChanges, onChangesAccepted, onSuccess, onError) {
    var observer = options.hasOwnProperty('observer') ? options.observer : false;

    var request = {
      // Will not be defined the first time we call the server
      clientIdentity: context.clientIdentity,
      baseRevision: options.baseRevision ? options.baseRevision : baseRevision,
      partial: partial,
      changes: observer ? [] : changes,
      syncedRevision: options.syncedRevision ? options.syncedRevision : syncedRevision
    };

    serverComm(url, request, options).then(function (remoteData) {
      // TODO: remove from data.changes array tables (table) that don't match options.tables

      if (!remoteData.success) {
        // Server didn't accept our changes. Stop trying to sync
        onError(remoteData.errorMessage, Infinity);
      } else {
        var data = remoteData;

        if (options.table) {
          data.changes = remoteData.changes.filter(function (change) {
            return change.table === options.table;
          });
        }
        // If we have no clientIdentity yet, then this was the first call
        // Make sure we save the clientIdentity and then schedule the next call
        if (!context.clientIdentity) {
          context.clientIdentity = data.clientIdentity;
          context.save().then(function () {
            applyRemoteChanges(data.changes, data.currentRevision, data.partial, false);
            onChangesAccepted();
            onSuccess({ again: options.pollInterval });
          }).catch(function (e) {
            // We failed to save the clientIdentity. Stop trying to sync
            // We would not be able to get/send any partial data
            onError(e, Infinity);
          });
          // This is a subsequent call.
          // We already have a clientIdentity so we can just schedule the next call
        } else {
          applyRemoteChanges(data.changes, data.currentRevision, data.partial, false);
          onChangesAccepted();
          onSuccess({ again: options.pollInterval });
        }
      }
    }).catch(function (e) {
      isOnline(url).then(function (status) {
        if (status) {
          // We were temporarily offline -> retry
          onError(e, options.pollInterval);
        } else {
          // Was probably not just a temp thing -> stop retrying
          // Synable will automatically disconnect us with an ERROR
          // and we will have to manually reconnect
          onError(e, Infinity);
        }
      });
    });
  };
}

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_fetch__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_fetch__);
/* harmony export (immutable) */ __webpack_exports__["a"] = serverComm;




function serverComm(url, data, options) {
  var headers = new Headers();
  headers.set('Content-Type', 'application/json');
  var opts = {
    headers: headers,
    method: 'POST',
    body: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(data),
    mode: 'cors',
    credentials: options.credentials
  };
  return __WEBPACK_IMPORTED_MODULE_2_isomorphic_fetch___default()(url, opts).then(function (response) {
    if (response.ok) {
      // status 200-299
      return response.json();
    }
    return {
      success: false,
      errorMessage: 'Some server error occurred'
    };
  }, function (error) {
    // Network failure
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject(error);
  });
}

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_assign__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_classCallCheck__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_runtime_helpers_inherits__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_babel_runtime_helpers_inherits__);
/* harmony export (immutable) */ __webpack_exports__["a"] = initSyncClient;










var SYNCABLE_PROTOCOL = 'sync_client_protocol';
var defaultSyncOptions = {
  pollInterval: 10000, // Poll every 10 seconds
  credentials: 'omit'
};

function initSyncClient(_ref) {
  var Dexie = _ref.Dexie,
      observable = _ref.observable,
      syncable = _ref.syncable,
      sync = _ref.sync,
      isOnline = _ref.isOnline,
      onlineStatusChanged = _ref.onlineStatusChanged,
      cuid = _ref.cuid;

  var SyncClient = function (_Dexie) {
    __WEBPACK_IMPORTED_MODULE_9_babel_runtime_helpers_inherits___default()(SyncClient, _Dexie);

    /*
     * dbName: string, name for the database
     * dbVersions: {version: number, stores: Array<Dexie.SchemaDefinition>}
     * https://github.com/dfahlander/Dexie.js/wiki/Version.stores()
     */
    function SyncClient(dbName, dbVersions) {
      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_classCallCheck___default()(this, SyncClient);

      var _this = __WEBPACK_IMPORTED_MODULE_8_babel_runtime_helpers_possibleConstructorReturn___default()(this, (SyncClient.__proto__ || __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_get_prototype_of___default()(SyncClient)).call(this, dbName, { addons: [observable, syncable].concat(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_toConsumableArray___default()(opts.addons ? opts.addons : [])) }));

      dbVersions.forEach(function (version) {
        if (version.upgrader) {
          _this.version(version.version).stores(version.stores).upgrade(version.upgrader);
        } else {
          _this.version(version.version).stores(version.stores);
        }
      });

      var protocolImplementation = {
        sync: sync,
        partialsThreshold: opts.partialsThreshold
      };
      Dexie.Syncable.registerSyncProtocol(SYNCABLE_PROTOCOL, protocolImplementation);

      _this.options = {};
      _this.urls = [];
      _this.statusChangeListeners = {};

      _this.syncable.on('statusChanged', function (status, url) {
        var cb = _this.statusChangeListeners[url];
        if (cb) {
          cb(Dexie.Syncable.StatusTexts[status]);
        }
      });
      return _this;
    }

    __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_createClass___default()(SyncClient, [{
      key: '_connect',
      value: function _connect(url, options) {
        var _this2 = this;

        return this.syncable.connect(SYNCABLE_PROTOCOL, url, options).catch(function (e) {
          // disconnect when onError is called
          _this2.disconnect(url);
          throw e;
        });
      }

      /*
       * options:
       *   pollInterval: number -> How often to resync
       */

    }, {
      key: 'connect',
      value: function connect(url, options) {
        var _this3 = this;

        // First call to connect
        // Setup onlineStatusChanged
        // Check isOnline before trying to connect using Dexie.Syncable
        if (this.urls.indexOf(url) === -1) {
          this.options[url] = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_assign___default()({}, options, defaultSyncOptions);

          return isOnline(url).then(function (status) {
            if (status) {
              return _this3._connect(url, _this3.options[url]).then(function () {
                // Make sure we managed to connect before adding URL
                // and listener
                _this3.urls.push(url);

                onlineStatusChanged(url, function (newStatus) {
                  if (newStatus) {
                    _this3._connect(url, _this3.options[url]);
                  } else {
                    _this3.disconnect(url);
                  }
                });
              });
            }
            return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise___default.a.reject(new Error('Is not online'));
          });
        }
        return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise___default.a.resolve();
      }
    }, {
      key: 'disconnect',
      value: function disconnect(url) {
        var _this4 = this;

        return this.syncable.disconnect(url).then(function () {
          _this4.urls = _this4.urls.filter(function (u) {
            return u !== url;
          });
        });
      }
    }, {
      key: 'removeUrl',
      value: function removeUrl(url) {
        var _this5 = this;

        return this.syncable.delete(url).then(function () {
          _this5.urls = _this5.urls.filter(function (u) {
            return u !== url;
          });
          _this5.statusChangeListeners[url] = undefined;
        });
      }
    }, {
      key: 'statusChange',
      value: function statusChange(url, cb) {
        this.statusChangeListeners[url] = cb;
      }

      /*
       * Returns a Promise<Array<{url, status}>>
       */

    }, {
      key: 'getStatuses',
      value: function getStatuses() {
        var _this6 = this;

        return this.syncable.list().then(function (urls) {
          var promises = urls.map(function (url) {
            return _this6.syncable.getStatus(url);
          });
          return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise___default.a.all(promises).then(function (statuses) {
            return urls.map(function (url, index) {
              return {
                url: url,
                status: Dexie.Syncable.StatusTexts[statuses[index]]
              };
            });
          });
        });
      }
    }, {
      key: 'getStatus',
      value: function getStatus(url) {
        return this.syncable.getStatus(url).then(function (status) {
          return Dexie.Syncable.StatusTexts[status];
        });
      }
    }, {
      key: 'getID',
      value: function getID() {
        return SyncClient.getID();
      }
    }], [{
      key: 'getID',
      value: function getID() {
        return cuid();
      }
    }]);

    return SyncClient;
  }(Dexie);

  SyncClient.statuses = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(Dexie.Syncable.Statuses).reduce(function (statuses, statusKey) {
    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_object_assign___default()(statuses, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, statusKey, statusKey));
  }, {});

  return SyncClient;
}

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_dexie__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_dexie_observable__ = __webpack_require__(40);
/* ========================================================================== 
 *                           dexie-syncable.js
 * ==========================================================================
 *
 * Dexie addon for syncing indexedDB with remote endpoints.
 *
 * By David Fahlander, david.fahlander@gmail.com,
 *    Nikolas Poniros, https://github.com/nponiros
 *
 * ==========================================================================
 *
 * Version {version}, {date}
 *
 * http://dexie.org
 *
 * Apache License Version 2.0, January 2004, http://www.apache.org/licenses/
 * 
 */




var Promise$1 = __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].Promise;
function initSyncableConnect(db, connect) {
    return function syncableConnect(protocolInstance, protocolName, url, options) {
        if (db.isOpen()) {
            // Database is open
            if (!db._localSyncNode)
                throw new Error("Precondition failed: local sync node is missing. Make sure Dexie.Observable is active!");
            if (db._localSyncNode.isMaster) {
                // We are master node
                return connect(protocolInstance, protocolName, url, options, db._localSyncNode.id);
            }
            else {
                // We are not master node
                // Request master node to do the connect:
                return db.table('_syncNodes').where('isMaster').above(0).first(function (masterNode) {
                    // There will always be a master node. In theory we may self have become master node when we come here. But that's ok. We'll request ourselves.
                    return db.observable.sendMessage('connect', {
                        protocolName: protocolName,
                        url: url,
                        options: options
                    }, masterNode.id, { wantReply: true });
                });
            }
        }
        else if (db.hasBeenClosed()) {
            // Database has been closed.
            return Promise$1.reject(new __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].DatabaseClosedError());
        }
        else if (db.hasFailed()) {
            // Database has failed to open
            return Promise$1.reject(new __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].InvalidStateError("Dexie.Syncable: Cannot connect. Database has failed to open"));
        }
        else {
            // Database not yet open. It may be on its way to open, or open() hasn't yet been called.
            // Wait for it to open, then connect.
            var promise = new Promise$1(function (resolve, reject) {
                db.on("ready", function () {
                    // First, check if this is the very first time we connect to given URL.
                    // Need to know, because if it is, we should stall the promise returned to
                    // db.on('ready') to not be fulfilled until the initial sync has succeeded.
                    return db._syncNodes.get({ url: url }, function (node) {
                        // Ok, now we know whether we should await the connect promise or not.
                        // No matter, we should now connect (will maybe create the SyncNode instance
                        // representing the given URL)
                        var connectPromise = db.syncable.connect(protocolName, url, options);
                        connectPromise.then(resolve, reject); // Resolve the returned promise when connected.
                        // Ok, so let's see if we should suspend DB queries until connected or not:
                        if (node && node.appliedRemoteRevision) {
                            // The very first initial sync has been done so we need not wait
                            // for the connect promise to complete. It can continue in background.
                            // Returning here will resume db.on('ready') and resume all queries that
                            // the application has put to the database.
                            return;
                        }
                        // This was the very first time we connect to the remote server,
                        // we must make sure that the initial sync request succeeeds before resuming
                        // database queries that the application code puts onto the database.
                        // If OFFLINE or other error, don't allow the application to proceed.
                        // We are assuming that an initial sync is essential for the application to
                        // function correctly.
                        return connectPromise;
                    });
                });
                // Force open() to happen. Otherwise connect() may stall forever.
                db.open().catch(function (ex) {
                    // If open fails, db.on('ready') may not have been called and we must
                    // reject promise with InvalidStateError
                    reject(new __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].InvalidStateError("Dexie.Syncable: Couldn't connect. Database failed to open", ex));
                });
            });
            return promise;
        }
    };
}

function initPersistedContext(node) {
    //
    // PersistedContext : IPersistedContext
    //
    return (function () {
        function PersistedContext(nodeID, otherProps) {
            this.nodeID = nodeID;
            if (otherProps)
                __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].extend(this, otherProps);
        }
        PersistedContext.prototype.save = function () {
            // Store this instance in the syncContext property of the node it belongs to.
            return __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].vip(function () {
                return node.save();
            });
        };
        return PersistedContext;
    }());
}

function initGetOrCreateSyncNode(db, protocolName, url) {
    return function getOrCreateSyncNode(options) {
        return db.transaction('rw', db._syncNodes, db._changes, function () {
            if (!url)
                throw new Error("Url cannot be empty");
            // Returning a promise from transaction scope will make the transaction promise resolve with the value of that promise.
            return db._syncNodes.where("url").equalsIgnoreCase(url).first(function (node) {
                // If we found a node it will be instanceof SyncNode as Dexie.Observable
                // maps to class
                if (node) {
                    var PersistedContext = initPersistedContext(node);
                    // Node already there. Make syncContext become an instance of PersistedContext:
                    node.syncContext = new PersistedContext(node.id, node.syncContext);
                    node.syncProtocol = protocolName; // In case it was changed (would be very strange but...) could happen...
                    node.syncOptions = options; // Options could have been changed
                    db._syncNodes.put(node);
                }
                else {
                    // Create new node and sync everything
                    node = new db.observable.SyncNode();
                    node.myRevision = -1;
                    node.appliedRemoteRevision = null;
                    node.remoteBaseRevisions = [];
                    node.type = "remote";
                    node.syncProtocol = protocolName;
                    node.url = url;
                    node.syncOptions = options;
                    node.lastHeartBeat = Date.now();
                    node.dbUploadState = null;
                    var PersistedContext_1 = initPersistedContext(node);
                    __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].Promise.resolve(function () {
                        // If options.initialUpload is explicitely false, set myRevision to currentRevision.
                        if (options.initialUpload === false)
                            return db._changes.toCollection().lastKey(function (currentRevision) {
                                node.myRevision = currentRevision;
                            });
                    }()).then(function () {
                        db._syncNodes.add(node).then(function (nodeID) {
                            node.syncContext = new PersistedContext_1(nodeID); // Update syncContext in db with correct nodeId.
                            db._syncNodes.put(node);
                        });
                    });
                }
                return node; // returning node will make the db.transaction()-promise resolve with this value.
            });
        });
    };
}

function initEnqueue(db) {
    return function enqueue(context, fn, instanceID) {
        function _enqueue() {
            if (!context.ongoingOperation) {
                context.ongoingOperation = __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].ignoreTransaction(function () {
                    return __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].vip(function () {
                        return fn();
                    });
                }).finally(function () {
                    delete context.ongoingOperation;
                });
            }
            else {
                context.ongoingOperation = context.ongoingOperation.then(function () {
                    return enqueue(context, fn, instanceID);
                });
            }
            return context.ongoingOperation;
        }
        if (!instanceID) {
            // Caller wants to enqueue it until database becomes open.
            if (db.isOpen()) {
                return _enqueue();
            }
            else {
                return __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].Promise.reject(new __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].DatabaseClosedError());
            }
        }
        else if (db._localSyncNode && instanceID === db._localSyncNode.id) {
            // DB is already open but queue doesn't want it to be queued if database has been closed (request bound to current instance of DB)
            return _enqueue();
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].Promise.reject(new __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].DatabaseClosedError());
        }
    };
}

function initSaveToUncommittedChanges(db, node) {
    return function saveToUncommittedChanges(changes, remoteRevision) {
        return db.transaction('rw!', db._uncommittedChanges, function () {
            return db._uncommittedChanges.bulkAdd(changes.map(function (change) {
                var changeWithNodeId = {
                    node: node.id,
                    type: change.type,
                    table: change.table,
                    key: change.key
                };
                if (change.obj)
                    changeWithNodeId.obj = change.obj;
                if (change.mods)
                    changeWithNodeId.mods = change.mods;
                return changeWithNodeId;
            }));
        }).then(function () {
            node.appliedRemoteRevision = remoteRevision;
            return node.save();
        });
    };
}

// Change Types
// Change Types
var CREATE = 1;
var UPDATE = 2;
var DELETE = 3;

function bulkUpdate(table, changes) {
    var keys = changes.map(function (c) { return c.key; });
    var map = {};
    // Retrieve current object of each change to update and map each
    // found object's primary key to the existing object:
    return table.where(':id').anyOf(keys).raw().each(function (obj, cursor) {
        map[cursor.primaryKey + ''] = obj;
    }).then(function () {
        // Filter away changes whose key wasn't found in the local database
        // (we can't update them if we do not know the existing values)
        var updatesThatApply = changes.filter(function (c) { return map.hasOwnProperty(c.key + ''); });
        // Apply modifications onto each existing object (in memory)
        // and generate array of resulting objects to put using bulkPut():
        var objsToPut = updatesThatApply.map(function (c) {
            var curr = map[c.key + ''];
            Object.keys(c.mods).forEach(function (keyPath) {
                __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].setByKeyPath(curr, keyPath, c.mods[keyPath]);
            });
            return curr;
        });
        return table.bulkPut(objsToPut);
    });
}

function initApplyChanges(db) {
    return function applyChanges(changes) {
        var collectedChanges = {};
        changes.forEach(function (change) {
            if (!collectedChanges.hasOwnProperty(change.table)) {
                collectedChanges[change.table] = (_a = {}, _a[CREATE] = [], _a[DELETE] = [], _a[UPDATE] = [], _a);
            }
            collectedChanges[change.table][change.type].push(change);
            var _a;
        });
        var table_names = Object.keys(collectedChanges);
        var tables = table_names.map(function (table) { return db.table(table); });
        return db.transaction("rw", tables, function () {
            table_names.forEach(function (table_name) {
                var table = db.table(table_name);
                var specifyKeys = !table.schema.primKey.keyPath;
                var createChangesToApply = collectedChanges[table_name][CREATE];
                var deleteChangesToApply = collectedChanges[table_name][DELETE];
                var updateChangesToApply = collectedChanges[table_name][UPDATE];
                if (createChangesToApply.length > 0)
                    table.bulkPut(createChangesToApply.map(function (c) { return c.obj; }), specifyKeys ?
                        createChangesToApply.map(function (c) { return c.key; }) : undefined);
                if (updateChangesToApply.length > 0)
                    bulkUpdate(table, updateChangesToApply);
                if (deleteChangesToApply.length > 0)
                    table.bulkDelete(deleteChangesToApply.map(function (c) { return c.key; }));
            });
        });
    };
}

function initFinallyCommitAllChanges(db, node) {
    var applyChanges = initApplyChanges(db);
    return function finallyCommitAllChanges(changes, remoteRevision) {
        // 1. Open a write transaction on all tables in DB
        var tablesToIncludeInTrans = db.tables.filter(function (table) { return table.name === '_changes' ||
            table.name === '_uncommittedChanges' ||
            table.schema.observable; });
        return db.transaction('rw!', tablesToIncludeInTrans, function () {
            var trans = __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].currentTransaction;
            var localRevisionBeforeChanges = 0;
            return db._changes.orderBy('rev').last(function (lastChange) {
                // Store what revision we were at before committing the changes
                localRevisionBeforeChanges = (lastChange && lastChange.rev) || 0;
            }).then(function () {
                // Specify the source. Important for the change consumer to ignore changes originated from self!
                trans.source = node.id;
                // 2. Apply uncommitted changes and delete each uncommitted change
                return db._uncommittedChanges.where('node').equals(node.id).toArray();
            }).then(function (uncommittedChanges) {
                return applyChanges(uncommittedChanges);
            }).then(function () {
                return db._uncommittedChanges.where('node').equals(node.id).delete();
            }).then(function () {
                // 3. Apply last chunk of changes
                return applyChanges(changes);
            }).then(function () {
                // Get what revision we are at now:
                return db._changes.orderBy('rev').last();
            }).then(function (lastChange) {
                var currentLocalRevision = (lastChange && lastChange.rev) || 0;
                // 4. Update node states (appliedRemoteRevision, remoteBaseRevisions and eventually myRevision)
                node.appliedRemoteRevision = remoteRevision;
                node.remoteBaseRevisions.push({ remote: remoteRevision, local: currentLocalRevision });
                if (node.myRevision === localRevisionBeforeChanges) {
                    // If server was up-to-date before we added new changes from the server, update myRevision to last change
                    // because server is still up-to-date! This is also important in order to prohibit getLocalChangesForNode() from
                    // ever sending an empty change list to server, which would otherwise be done every second time it would send changes.
                    node.myRevision = currentLocalRevision;
                }
                // Garbage collect remoteBaseRevisions not in use anymore:
                if (node.remoteBaseRevisions.length > 1) {
                    for (var i = node.remoteBaseRevisions.length - 1; i > 0; --i) {
                        if (node.myRevision >= node.remoteBaseRevisions[i].local) {
                            node.remoteBaseRevisions.splice(0, i);
                            break;
                        }
                    }
                }
                // We are not including _syncNodes in transaction, so this save() call will execute in its own transaction.
                node.save().catch(function (err) {
                    console.warn("Dexie.Syncable: Unable to save SyncNode after applying remote changes: " + (err.stack || err));
                });
            });
        });
    };
}

function getBaseRevisionAndMaxClientRevision(node) {
    /// <param name="node" type="db.observable.SyncNode"></param>
    if (node.remoteBaseRevisions.length === 0)
        return {
            // No remoteBaseRevisions have arrived yet. No limit on clientRevision and provide null as remoteBaseRevision:
            maxClientRevision: Infinity,
            remoteBaseRevision: null
        };
    for (var i = node.remoteBaseRevisions.length - 1; i >= 0; --i) {
        if (node.myRevision >= node.remoteBaseRevisions[i].local) {
            // Found a remoteBaseRevision that fits node.myRevision. Return remoteBaseRevision and eventually a roof maxClientRevision pointing out where next remoteBaseRevision bases its changes on.
            return {
                maxClientRevision: i === node.remoteBaseRevisions.length - 1 ? Infinity : node.remoteBaseRevisions[i + 1].local,
                remoteBaseRevision: node.remoteBaseRevisions[i].remote
            };
        }
    }
    // There are at least one item in the list but the server hasn't yet become up-to-date with the 0 revision from client.
    return {
        maxClientRevision: node.remoteBaseRevisions[0].local,
        remoteBaseRevision: null
    };
}

function combineCreateAndUpdate(prevChange, nextChange) {
    var clonedChange = __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].deepClone(prevChange); // Clone object before modifying since the earlier change in db.changes[] would otherwise be altered.
    Object.keys(nextChange.mods).forEach(function (keyPath) {
        __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].setByKeyPath(clonedChange.obj, keyPath, nextChange.mods[keyPath]);
    });
    return clonedChange;
}

function combineUpdateAndUpdate(prevChange, nextChange) {
    var clonedChange = __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].deepClone(prevChange); // Clone object before modifying since the earlier change in db.changes[] would otherwise be altered.
    Object.keys(nextChange.mods).forEach(function (keyPath) {
        // If prev-change was changing a parent path of this keyPath, we must update the parent path rather than adding this keyPath
        var hadParentPath = false;
        Object.keys(prevChange.mods).filter(function (parentPath) { return keyPath.indexOf(parentPath + '.') === 0; }).forEach(function (parentPath) {
            __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].setByKeyPath(clonedChange.mods[parentPath], keyPath.substr(parentPath.length + 1), nextChange.mods[keyPath]);
            hadParentPath = true;
        });
        if (!hadParentPath) {
            // Add or replace this keyPath and its new value
            clonedChange.mods[keyPath] = nextChange.mods[keyPath];
        }
        // In case prevChange contained sub-paths to the new keyPath, we must make sure that those sub-paths are removed since
        // we must mimic what would happen if applying the two changes after each other:
        Object.keys(prevChange.mods).filter(function (subPath) { return subPath.indexOf(keyPath + '.') === 0; }).forEach(function (subPath) {
            delete clonedChange.mods[subPath];
        });
    });
    return clonedChange;
}

function mergeChange(prevChange, nextChange) {
    switch (prevChange.type) {
        case CREATE:
            switch (nextChange.type) {
                case CREATE:
                    return nextChange; // Another CREATE replaces previous CREATE.
                case UPDATE:
                    return combineCreateAndUpdate(prevChange, nextChange); // Apply nextChange.mods into prevChange.obj
                case DELETE:
                    return nextChange; // Object created and then deleted. If it wasnt for that we MUST handle resent changes, we would skip entire change here. But what if the CREATE was sent earlier, and then CREATE/DELETE at later stage? It would become a ghost object in DB. Therefore, we MUST keep the delete change! If object doesnt exist, it wont harm!
            }
            break;
        case UPDATE:
            switch (nextChange.type) {
                case CREATE:
                    return nextChange; // Another CREATE replaces previous update.
                case UPDATE:
                    return combineUpdateAndUpdate(prevChange, nextChange); // Add the additional modifications to existing modification set.
                case DELETE:
                    return nextChange; // Only send the delete change. What was updated earlier is no longer of interest.
            }
            break;
        case DELETE:
            switch (nextChange.type) {
                case CREATE:
                    return nextChange; // A resurection occurred. Only create change is of interest.
                case UPDATE:
                    return prevChange; // Nothing to do. We cannot update an object that doesnt exist. Leave the delete change there.
                case DELETE:
                    return prevChange; // Still a delete change. Leave as is.
            }
            break;
    }
}

function initGetChangesSinceRevision(db, node, hasMoreToGive) {
    return function getChangesSinceRevision(revision, maxChanges, maxRevision, cb) {
        /// <param name="cb" value="function(changes, partial, nodeModificationsOnAck) {}">Callback that will retrieve next chunk of changes and a boolean telling if it's a partial result or not. If truthy, result is partial and there are more changes to come. If falsy, these changes are the final result.</param>
        var changeSet = {};
        var numChanges = 0;
        var partial = false;
        var ignoreSource = node.id;
        var nextRevision = revision;
        return db.transaction('r', db._changes, function () {
            var query = db._changes.where('rev').between(revision, maxRevision, false, true);
            return query.until(function () {
                if (numChanges === maxChanges) {
                    partial = true;
                    return true;
                }
            }).each(function (change) {
                // Note the revision in nextRevision:
                nextRevision = change.rev;
                // change.source is set based on currentTransaction.source
                if (change.source === ignoreSource)
                    return;
                // Our _changes table contains more info than required (old objs, source etc). Just make sure to include the necessary info:
                var changeToSend = {
                    type: change.type,
                    table: change.table,
                    key: change.key
                };
                if (change.type === CREATE)
                    changeToSend.obj = change.obj;
                else if (change.type === UPDATE)
                    changeToSend.mods = change.mods;
                var id = change.table + ":" + change.key;
                var prevChange = changeSet[id];
                if (!prevChange) {
                    // This is the first change on this key. Add it unless it comes from the source that we are working against
                    changeSet[id] = changeToSend;
                    ++numChanges;
                }
                else {
                    // Merge the oldchange with the new change
                    var nextChange = changeToSend;
                    var mergedChange = mergeChange(prevChange, nextChange);
                    changeSet[id] = mergedChange;
                }
            });
        }).then(function () {
            var changes = Object.keys(changeSet).map(function (key) {
                return changeSet[key];
            });
            hasMoreToGive.hasMoreToGive = partial;
            return cb(changes, partial, { myRevision: nextRevision });
        });
    };
}

function initGetTableObjectsAsChanges(db, node, MAX_CHANGES_PER_CHUNK, getChangesSinceRevision, hasMoreToGive, cb) {
    return function getTableObjectsAsChanges(state, changes, collection) {
        /// <param name="state" value="{tablesToUpload:[''],currentTable:'_changes',currentKey:null,localBaseRevision:0}"></param>
        /// <param name="changes" type="Array" elementType="IDatabaseChange"></param>
        /// <param name="collection" type="db.Collection"></param>
        var limitReached = false;
        return collection.until(function () {
            if (changes.length === MAX_CHANGES_PER_CHUNK) {
                limitReached = true;
                return true;
            }
        }).each(function (item, cursor) {
            changes.push({
                type: CREATE,
                table: state.currentTable,
                key: cursor.key,
                obj: cursor.value
            });
            state.currentKey = cursor.key;
        }).then(function () {
            if (limitReached) {
                // Limit reached. Send partial result.
                hasMoreToGive.hasMoreToGive = true;
                return cb(changes, null, true, { dbUploadState: state });
            }
            else {
                // Done iterating this table. Check if there are more tables to go through:
                if (state.tablesToUpload.length === 0) {
                    // Done iterating all tables
                    // Now append changes occurred during our dbUpload:
                    var brmcr = getBaseRevisionAndMaxClientRevision(node);
                    return getChangesSinceRevision(state.localBaseRevision, MAX_CHANGES_PER_CHUNK - changes.length, brmcr.maxClientRevision, function (additionalChanges, partial, nodeModificationsOnAck) {
                        changes = changes.concat(additionalChanges);
                        nodeModificationsOnAck.dbUploadState = null;
                        return cb(changes, brmcr.remoteBaseRevision, partial, nodeModificationsOnAck);
                    });
                }
                else {
                    // Not done iterating all tables. Continue on next table:
                    state.currentTable = state.tablesToUpload.shift();
                    return getTableObjectsAsChanges(state, changes, db.table(state.currentTable).orderBy(':id'));
                }
            }
        });
    };
}

function initGetLocalChangesForNode(db, hasMoreToGive, partialsThreshold) {
    var MAX_CHANGES_PER_CHUNK = partialsThreshold;
    return function getLocalChangesForNode(node, cb) {
        /// <summary>
        ///     Based on given node's current revision and state, this function makes sure to retrieve next chunk of changes
        ///     for that node.
        /// </summary>
        /// <param name="node"></param>
        /// <param name="cb" value="function(changes, remoteBaseRevision, partial, nodeModificationsOnAck) {}">Callback that will retrieve next chunk of changes and a boolean telling if it's a partial result or not. If truthy, result is partial and there are more changes to come. If falsy, these changes are the final result.</param>
        var getChangesSinceRevision = initGetChangesSinceRevision(db, node, hasMoreToGive);
        var getTableObjectsAsChanges = initGetTableObjectsAsChanges(db, node, MAX_CHANGES_PER_CHUNK, getChangesSinceRevision, hasMoreToGive, cb);
        // Only a "remote" SyncNode created by Dexie.Syncable
        // could not pass this test (remote nodes have myRevision: -1 on instantiation)
        if (node.myRevision >= 0) {
            // Node is based on a revision in our local database and will just need to get the changes that have occurred since that revision.
            var brmcr = getBaseRevisionAndMaxClientRevision(node);
            return getChangesSinceRevision(node.myRevision, MAX_CHANGES_PER_CHUNK, brmcr.maxClientRevision, function (changes, partial, nodeModificationsOnAck) {
                return cb(changes, brmcr.remoteBaseRevision, partial, nodeModificationsOnAck);
            });
        }
        else {
            // Node hasn't got anything from our local database yet. We will need to upload the entire DB to the node in the form of CREATE changes.
            // Check if we're in the middle of already doing that:
            if (node.dbUploadState === null) {
                // Initialize dbUploadState
                var tablesToUpload = db.tables.filter(function (table) {
                    return table.schema.observable;
                }).map(function (table) {
                    return table.name;
                });
                if (tablesToUpload.length === 0)
                    return __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].Promise.resolve(cb([], null, false, {})); // There are no synced tables at all.
                var dbUploadState = {
                    tablesToUpload: tablesToUpload,
                    currentTable: tablesToUpload.shift(),
                    currentKey: null
                };
                return db._changes.orderBy('rev').last(function (lastChange) {
                    dbUploadState.localBaseRevision = (lastChange && lastChange.rev) || 0;
                    var collection = db.table(dbUploadState.currentTable).orderBy(':id');
                    return getTableObjectsAsChanges(dbUploadState, [], collection);
                });
            }
            else if (node.dbUploadState.currentKey) {
                var collection = db.table(node.dbUploadState.currentTable).where(':id').above(node.dbUploadState.currentKey);
                return getTableObjectsAsChanges(__WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].deepClone(node.dbUploadState), [], collection);
            }
            else {
                var collection = db.table(dbUploadState.currentTable).orderBy(':id');
                return getTableObjectsAsChanges(__WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].deepClone(node.dbUploadState), [], collection);
            }
        }
    };
}

var Statuses = {
    ERROR: -1,
    OFFLINE: 0,
    CONNECTING: 1,
    ONLINE: 2,
    SYNCING: 3,
    ERROR_WILL_RETRY: 4 // An error occurred such as net down but the sync provider will retry to connect.
};
var StatusTexts = {
    "-1": "ERROR",
    "0": "OFFLINE",
    "1": "CONNECTING",
    "2": "ONLINE",
    "3": "SYNCING",
    "4": "ERROR_WILL_RETRY"
};

var Promise$2 = __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].Promise;
function initConnectProtocol(db, protocolInstance, dbAliveID, options, rejectConnectPromise) {
    var enqueue = initEnqueue(db);
    var hasMoreToGive = { hasMoreToGive: true };
    function stillAlive() {
        // A better method than doing db.isOpen() because the same db instance may have been reopened, but then this sync call should be dead
        // because the new instance should be considered a fresh instance and will have another local node.
        return db._localSyncNode && db._localSyncNode.id === dbAliveID;
    }
    return function connectProtocol(node, activePeer) {
        /// <param name="node" type="db.observable.SyncNode"></param>
        var getLocalChangesForNode = initGetLocalChangesForNode(db, hasMoreToGive, protocolInstance.partialsThreshold);
        var url = activePeer.url;
        function changeStatusTo(newStatus) {
            if (node.status !== newStatus) {
                node.status = newStatus;
                node.save().then(function () {
                    db.syncable.on.statusChanged.fire(newStatus, url);
                    // Also broadcast message to other nodes about the status
                    db.observable.broadcastMessage("syncStatusChanged", { newStatus: newStatus, url: url }, false);
                }).catch('DatabaseClosedError', function () {
                });
            }
        }
        activePeer.on('disconnect', function (newStatus) {
            if (!isNaN(newStatus))
                changeStatusTo(newStatus);
        });
        var connectedContinuation;
        changeStatusTo(Statuses.CONNECTING);
        return doSync();
        function doSync() {
            // Use enqueue() to ensure only a single promise execution at a time.
            return enqueue(doSync, function () {
                // By returning the Promise returned by getLocalChangesForNode() a final catch() on the sync() method will also catch error occurring in entire sequence.
                return getLocalChangesForNode_autoAckIfEmpty(node, sendChangesToProvider);
            }, dbAliveID);
        }
        function sendChangesToProvider(changes, remoteBaseRevision, partial, nodeModificationsOnAck) {
            // Create a final Promise for the entire sync() operation that will resolve when provider calls onSuccess().
            // By creating finalPromise before calling protocolInstance.sync() it is possible for provider to call onError() immediately if it wants.
            var finalSyncPromise = new Promise$2(function (resolve, reject) {
                rejectConnectPromise.p = function (err) {
                    reject(err);
                };
                __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].asap(function () {
                    try {
                        protocolInstance.sync(node.syncContext, url, options, remoteBaseRevision, node.appliedRemoteRevision, changes, partial, applyRemoteChanges, onChangesAccepted, function (continuation) {
                            resolve(continuation);
                        }, onError);
                    }
                    catch (ex) {
                        onError(ex, Infinity);
                    }
                    function onError(error, again) {
                        reject(error);
                        if (stillAlive()) {
                            if (!isNaN(again) && again < Infinity) {
                                setTimeout(function () {
                                    if (stillAlive()) {
                                        changeStatusTo(Statuses.SYNCING);
                                        doSync().catch('DatabaseClosedError', abortTheProvider);
                                    }
                                }, again);
                                changeStatusTo(Statuses.ERROR_WILL_RETRY, error);
                                if (connectedContinuation && connectedContinuation.disconnect)
                                    connectedContinuation.disconnect();
                                connectedContinuation = null;
                            }
                            else {
                                abortTheProvider(error); // Will fire ERROR on statusChanged event.
                            }
                        }
                    }
                });
            });
            return finalSyncPromise.then(function () {
                // Resolve caller of db.syncable.connect() with undefined. Not with continuation!
                return undefined;
            }).finally(function () {
                // In case error happens after connect, don't try reject the connect promise anymore.
                // This is important. A Dexie unit test that verifies unhandled rejections will fail when Dexie.Syncable addon
                // is active and this happens. It would fire unhandledrejection but that we do not want.
                rejectConnectPromise.p = null;
            });
            function onChangesAccepted() {
                Object.keys(nodeModificationsOnAck).forEach(function (keyPath) {
                    __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].setByKeyPath(node, keyPath, nodeModificationsOnAck[keyPath]);
                });
                // We dont know if onSuccess() was called by provider yet. If it's already called, finalPromise.then() will execute immediately,
                // otherwise it will execute when finalSyncPromise resolves.
                finalSyncPromise.then(continueSendingChanges);
                return node.save();
            }
        }
        function abortTheProvider(error) {
            activePeer.disconnect(Statuses.ERROR, error);
        }
        function getLocalChangesForNode_autoAckIfEmpty(node, cb) {
            return getLocalChangesForNode(node, function autoAck(changes, remoteBaseRevision, partial, nodeModificationsOnAck) {
                if (changes.length === 0 && 'myRevision' in nodeModificationsOnAck && nodeModificationsOnAck.myRevision !== node.myRevision) {
                    Object.keys(nodeModificationsOnAck).forEach(function (keyPath) {
                        __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].setByKeyPath(node, keyPath, nodeModificationsOnAck[keyPath]);
                    });
                    node.save().catch('DatabaseClosedError', function () {
                    });
                    return getLocalChangesForNode(node, autoAck);
                }
                else {
                    return cb(changes, remoteBaseRevision, partial, nodeModificationsOnAck);
                }
            });
        }
        function applyRemoteChanges(remoteChanges, remoteRevision, partial /*, clear*/) {
            var saveToUncommittedChanges = initSaveToUncommittedChanges(db, node);
            var finallyCommitAllChanges = initFinallyCommitAllChanges(db, node);
            return enqueue(applyRemoteChanges, function () {
                if (!stillAlive())
                    return Promise$2.reject(new __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].DatabaseClosedError());
                // FIXTHIS: Check what to do if clear() is true!
                return (partial ? saveToUncommittedChanges(remoteChanges, remoteRevision) : finallyCommitAllChanges(remoteChanges, remoteRevision))
                    .catch(function (error) {
                    abortTheProvider(error);
                    return Promise$2.reject(error);
                });
            }, dbAliveID);
        }
        //
        //
        //  Continuation Patterns Follows
        //
        //
        function continueSendingChanges(continuation) {
            if (!stillAlive()) {
                if (continuation.disconnect)
                    continuation.disconnect();
                return;
            }
            connectedContinuation = continuation;
            activePeer.on('disconnect', function () {
                if (connectedContinuation) {
                    if (connectedContinuation.react) {
                        try {
                            // react pattern must provide a disconnect function.
                            connectedContinuation.disconnect();
                        }
                        catch (e) {
                        }
                    }
                    connectedContinuation = null; // Stop poll() pattern from polling again and abortTheProvider() from being called twice.
                }
            });
            if (continuation.react) {
                continueUsingReactPattern(continuation);
            }
            else {
                continueUsingPollPattern(continuation);
            }
        }
        //  React Pattern (eager)
        function continueUsingReactPattern(continuation) {
            var changesWaiting, // Boolean
            isWaitingForServer; // Boolean
            function onChanges() {
                if (connectedContinuation) {
                    changeStatusTo(Statuses.SYNCING);
                    if (isWaitingForServer)
                        changesWaiting = true;
                    else {
                        reactToChanges();
                    }
                }
            }
            db.on('changes', onChanges);
            activePeer.on('disconnect', function () {
                db.on.changes.unsubscribe(onChanges);
            });
            function reactToChanges() {
                if (!connectedContinuation)
                    return;
                changesWaiting = false;
                isWaitingForServer = true;
                getLocalChangesForNode_autoAckIfEmpty(node, function (changes, remoteBaseRevision, partial, nodeModificationsOnAck) {
                    if (!connectedContinuation)
                        return;
                    if (changes.length > 0) {
                        continuation.react(changes, remoteBaseRevision, partial, function onChangesAccepted() {
                            Object.keys(nodeModificationsOnAck).forEach(function (keyPath) {
                                __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].setByKeyPath(node, keyPath, nodeModificationsOnAck[keyPath]);
                            });
                            node.save().catch('DatabaseClosedError', function () {
                            });
                            // More changes may be waiting:
                            reactToChanges();
                        });
                    }
                    else {
                        isWaitingForServer = false;
                        if (changesWaiting) {
                            // A change jumped in between the time-spot of quering _changes and getting called back with zero changes.
                            // This is an expreemely rare scenario, and eventually impossible. But need to be here because it could happen in theory.
                            reactToChanges();
                        }
                        else {
                            changeStatusTo(Statuses.ONLINE);
                        }
                    }
                }).catch(function (ex) {
                    console.error("Got " + ex.message + " caught by reactToChanges");
                    abortTheProvider(ex);
                });
            }
            reactToChanges();
        }
        //  Poll Pattern
        function continueUsingPollPattern() {
            function syncAgain() {
                getLocalChangesForNode_autoAckIfEmpty(node, function (changes, remoteBaseRevision, partial, nodeModificationsOnAck) {
                    protocolInstance.sync(node.syncContext, url, options, remoteBaseRevision, node.appliedRemoteRevision, changes, partial, applyRemoteChanges, onChangesAccepted, onSuccess, onError);
                    function onChangesAccepted() {
                        Object.keys(nodeModificationsOnAck).forEach(function (keyPath) {
                            __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].setByKeyPath(node, keyPath, nodeModificationsOnAck[keyPath]);
                        });
                        node.save().catch('DatabaseClosedError', function () {
                        });
                    }
                    function onSuccess(continuation) {
                        if (!connectedContinuation) {
                            // Got disconnected before succeeding. Quit.
                            return;
                        }
                        connectedContinuation = continuation;
                        if (partial) {
                            // We only sent partial changes. Need to do another round asap.
                            syncAgain();
                        }
                        else {
                            // We've sent all changes now (in sync!)
                            if (!isNaN(continuation.again) && continuation.again < Infinity) {
                                // Provider wants to keep polling. Set Status to ONLINE.
                                changeStatusTo(Statuses.ONLINE);
                                setTimeout(function () {
                                    if (connectedContinuation) {
                                        changeStatusTo(Statuses.SYNCING);
                                        syncAgain();
                                    }
                                }, continuation.again);
                            }
                            else {
                                // Provider seems finished polling. Since we are never going to poll again,
                                // disconnect provider and set status to OFFLINE until another call to db.syncable.connect().
                                activePeer.disconnect(Statuses.OFFLINE);
                            }
                        }
                    }
                    function onError(error, again) {
                        if (!isNaN(again) && again < Infinity) {
                            if (connectedContinuation) {
                                setTimeout(function () {
                                    if (connectedContinuation) {
                                        changeStatusTo(Statuses.SYNCING);
                                        syncAgain();
                                    }
                                }, again);
                                changeStatusTo(Statuses.ERROR_WILL_RETRY);
                            } // else status is already changed since we got disconnected.
                        }
                        else {
                            abortTheProvider(error); // Will fire ERROR on onStatusChanged.
                        }
                    }
                }).catch(abortTheProvider);
            }
            if (hasMoreToGive.hasMoreToGive) {
                syncAgain();
            }
            else if (connectedContinuation && !isNaN(connectedContinuation.again) && connectedContinuation.again < Infinity) {
                changeStatusTo(Statuses.ONLINE);
                setTimeout(function () {
                    if (connectedContinuation) {
                        changeStatusTo(Statuses.SYNCING);
                        syncAgain();
                    }
                }, connectedContinuation.again);
            }
            else {
                // Provider seems finished polling. Since we are never going to poll again,
                // disconnect provider and set status to OFFLINE until another call to db.syncable.connect().
                activePeer.disconnect(Statuses.OFFLINE);
            }
        }
    };
}

function initConnectFn(db, activePeers) {
    return function connect(protocolInstance, protocolName, url, options, dbAliveID) {
        /// <param name="protocolInstance" type="ISyncProtocol"></param>
        var existingPeer = activePeers.filter(function (peer) {
            return peer.url === url;
        });
        if (existingPeer.length > 0) {
            var activePeer = existingPeer[0];
            var diffObject = {};
            __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].getObjectDiff(activePeer.syncOptions, options, diffObject);
            // Options have been changed
            // We need to disconnect and reconnect
            if (Object.keys(diffObject).length !== 0) {
                return db.syncable.disconnect(url)
                    .then(function () {
                    return execConnect();
                });
            }
            else {
                // Never create multiple syncNodes with same protocolName and url. Instead, let the next call to connect() return the same promise that
                // have already been started and eventually also resolved. If promise has already resolved (node connected), calling existing promise.then() will give a callback directly.
                return existingPeer[0].connectPromise;
            }
        }
        function execConnect() {
            // Use an object otherwise we wouldn't be able to get the reject promise from
            // connectProtocol
            var rejectConnectPromise = { p: null };
            var connectProtocol = initConnectProtocol(db, protocolInstance, dbAliveID, options, rejectConnectPromise);
            var getOrCreateSyncNode = initGetOrCreateSyncNode(db, protocolName, url);
            var connectPromise = getOrCreateSyncNode(options).then(function (node) {
                return connectProtocol(node, activePeer);
            });
            var disconnected = false;
            var activePeer = {
                url: url,
                status: Statuses.OFFLINE,
                connectPromise: connectPromise,
                syncOptions: options,
                on: __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].Events(null, "disconnect"),
                disconnect: function (newStatus, error) {
                    var pos = activePeers.indexOf(activePeer);
                    if (pos >= 0)
                        activePeers.splice(pos, 1);
                    if (error && rejectConnectPromise.p)
                        rejectConnectPromise.p(error);
                    if (!disconnected) {
                        activePeer.on.disconnect.fire(newStatus, error);
                    }
                    disconnected = true;
                }
            };
            activePeers.push(activePeer);
            return connectPromise;
        }
        return execConnect();
    };
}

/* ==========================================================================
 *                           dexie-syncable.js
 * ==========================================================================
 *
 * Dexie addon for syncing indexedDB with remote endpoints.
 *
 * By David Fahlander, david.fahlander@gmail.com,
 *    Nikolas Poniros, https://github.com/nponiros
 *
 * ==========================================================================
 *
 * Version {version}, {date}
 *
 * http://dexie.org
 *
 * Apache License Version 2.0, January 2004, http://www.apache.org/licenses/
 *
 */
// Depend on 'dexie-observable'
// To support both ES6,AMD,CJS and UMD (plain script), we just import it and then access it as "Dexie.Observable".
// That way, our plugin works in all UMD cases.
// If target platform would only be module based (ES6/AMD/CJS), we could have done 'import Observable from "dexie-observable"'.
var override = __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].override;
var Promise = __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].Promise;
var Observable = __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].Observable;
function Syncable(db) {
    /// <param name="db" type="Dexie"></param>
    var activePeers = [];
    var connectFn = initConnectFn(db, activePeers);
    var syncableConnect = initSyncableConnect(db, connectFn);
    db.on('message', function (msg) {
        // Message from other local node arrives...
        __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].vip(function () {
            if (msg.type === 'connect') {
                // We are master node and another non-master node wants us to do the connect.
                db.syncable.connect(msg.message.protocolName, msg.message.url, msg.message.options).then(msg.resolve, msg.reject);
            }
            else if (msg.type === 'disconnect') {
                db.syncable.disconnect(msg.message.url).then(msg.resolve, msg.reject);
            }
            else if (msg.type === 'syncStatusChanged') {
                // We are client and a master node informs us about syncStatus change.
                // Lookup the connectedProvider and call its event
                db.syncable.on.statusChanged.fire(msg.message.newStatus, msg.message.url);
            }
        });
    });
    db.on('cleanup', function (weBecameMaster) {
        // A cleanup (done in Dexie.Observable) may result in that a master node is removed and we become master.
        if (weBecameMaster) {
            // We took over the master role in Observable's cleanup method.
            // We should connect to remote servers now.
            // At this point, also reconnect servers with status ERROR_WILL_RETRY as well as plain ERROR.
            // Reason to reconnect to those with plain "ERROR" is that the ERROR state may occur when a database
            // connection has been closed. The new master would then be expected to reconnect.
            // Also, this is not an infinite poll(). This is rare event that a new browser tab takes over from
            // an old closed one. 
            __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].ignoreTransaction(function () { return __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].vip(function () {
                return db._syncNodes.where({ type: 'remote' })
                    .filter(function (node) { return node.status !== Statuses.OFFLINE; })
                    .toArray(function (connectedRemoteNodes) { return Promise.all(connectedRemoteNodes.map(function (node) {
                    return db.syncable.connect(node.syncProtocol, node.url, node.syncOptions).catch(function (e) {
                        console.warn("Dexie.Syncable: Could not connect to " + node.url + ". " + (e.stack || e));
                    });
                })); });
            }); }).catch('DatabaseClosedError', function () { });
        }
    });
    // "ready" subscriber for the master node that makes sure it will always connect to sync server
    // when the database opens. It will not wait for the connection to complete, just initiate the
    // connection so that it will continue syncing as long as the database is open.
    // Dexie.Observable's 'ready' subscriber will have been invoked prior to this, making sure
    // that db._localSyncNode exists and persisted before this subscriber kicks in.
    db.on('ready', function onReady() {
        // Again, in onReady: If we ARE master, make sure to connect to remote servers that is in a connected state.
        if (db._localSyncNode && db._localSyncNode.isMaster) {
            // Make sure to connect to remote servers that is in a connected state (NOT OFFLINE or ERROR!)
            // This "ready" subscriber will never be the one performing the initial sync request, because
            // even after calling db.syncable.connect(), there won't exist any "remote" sync node yet.
            // Instead, db.syncable.connect() will subscribe to "ready" also, and that subscriber will be
            // called after this one. There, in that subscriber, the initial sync request will take place
            // and the "remote" node will be created so that this "ready" subscriber can auto-connect the
            // next time this database is opened.
            // CONCLUSION: We can always assume that the local DB has been in sync with the server at least
            // once in the past for each "connectedRemoteNode" we find in query below.
            // Don't halt db.ready while connecting (i.e. we do not return a promise here!)
            db._syncNodes
                .where('type').equals('remote')
                .and(function (node) { return node.status !== Statuses.OFFLINE; })
                .toArray(function (connectedRemoteNodes) {
                // There are connected remote nodes that we must manage (or take over to manage)
                connectedRemoteNodes.forEach(function (node) { return db.syncable.connect(node.syncProtocol, node.url, node.syncOptions)
                    .catch(function () { }); } // A failure will be triggered in on('statusChanged'). We can ignore.
                );
            }).catch('DatabaseClosedError', function () { });
        }
    }, true); // True means the ready event will survive a db reopen - db.close()/db.open()
    db.syncable = {};
    db.syncable.getStatus = function (url, cb) {
        if (db.isOpen()) {
            return __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].vip(function () {
                return db._syncNodes.where('url').equals(url).first(function (node) {
                    return node ? node.status : Statuses.OFFLINE;
                });
            }).then(cb);
        }
        else {
            return Promise.resolve(Syncable.Statuses.OFFLINE).then(cb);
        }
    };
    db.syncable.getOptions = function (url, cb) {
        return db.transaction('r?', db._syncNodes, function () {
            return db._syncNodes.where('url').equals(url).first(function (node) {
                return node.syncOptions;
            }).then(cb);
        });
    };
    db.syncable.list = function () {
        return db.transaction('r?', db._syncNodes, function () {
            return db._syncNodes.where('type').equals('remote').toArray(function (a) {
                return a.map(function (node) { return node.url; });
            });
        });
    };
    db.syncable.on = __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].Events(db, { statusChanged: "asap" });
    db.syncable.disconnect = function (url) {
        return __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].ignoreTransaction(function () {
            return Promise.resolve().then(function () {
                if (db._localSyncNode && db._localSyncNode.isMaster) {
                    return Promise.all(activePeers.filter(function (peer) { return peer.url === url; }).map(function (peer) {
                        return peer.disconnect(Statuses.OFFLINE);
                    }));
                }
                else {
                    return db._syncNodes.where('isMaster').above(0).first(function (masterNode) {
                        return db.observable.sendMessage('disconnect', { url: url }, masterNode.id, { wantReply: true });
                    });
                }
            }).then(function () {
                return db._syncNodes.where("url").equals(url).modify(function (node) {
                    node.status = Statuses.OFFLINE;
                });
            });
        });
    };
    db.syncable.connect = function (protocolName, url, options) {
        options = options || {}; // Make sure options is always an object because 1) Provider expects it to be. 2) We'll be persisting it and you cannot persist undefined.
        var protocolInstance = Syncable.registeredProtocols[protocolName];
        if (protocolInstance) {
            return syncableConnect(protocolInstance, protocolName, url, options);
        }
        else {
            return Promise.reject(new Error("ISyncProtocol '" + protocolName + "' is not registered in Dexie.Syncable.registerSyncProtocol()"));
        }
    };
    db.syncable.delete = function (url) {
        return db.syncable.disconnect(url).then(function () {
            return db.transaction('rw!', db._syncNodes, db._changes, db._uncommittedChanges, function () {
                // Find the node(s)
                // Several can be found, as detected by @martindiphoorn,
                // let's delete them and cleanup _uncommittedChanges and _changes 
                // accordingly.
                var nodeIDsToDelete;
                return db._syncNodes
                    .where("url").equals(url)
                    .toArray(function (nodes) { return nodes.map(function (node) { return node.id; }); })
                    .then(function (nodeIDs) {
                    nodeIDsToDelete = nodeIDs;
                    // Delete the syncNode that represents the remote endpoint.
                    return db._syncNodes.where('id').anyOf(nodeIDs).delete();
                })
                    .then(function () {
                    // In case there were uncommittedChanges belonging to this, delete them as well
                    return db._uncommittedChanges.where('node').anyOf(nodeIDsToDelete).delete();
                });
            }).then(function () {
                // Spawn background job to delete old changes, now that a node has been deleted,
                // there might be changes in _changes table that is not needed to keep anymore.
                // This is done in its own transaction, or possible several transaction to prohibit
                // starvation
                Observable.deleteOldChanges(db);
            });
        });
    };
    db.syncable.unsyncedChanges = function (url) {
        return db._syncNodes.where("url").equals(url).first(function (node) {
            return db._changes.where('rev').above(node.myRevision).toArray();
        });
    };
    db.close = override(db.close, function (origClose) {
        return function () {
            activePeers.forEach(function (peer) {
                peer.disconnect();
            });
            return origClose.apply(this, arguments);
        };
    });
    Object.defineProperty(db.observable.SyncNode.prototype, 'save', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var _this = this;
            return db.transaction('rw?', db._syncNodes, function () {
                return db._syncNodes.put(_this);
            });
        }
    });
}
Syncable.Statuses = Statuses;
Syncable.StatusTexts = StatusTexts;
Syncable.registeredProtocols = {}; // Map<String,ISyncProviderFactory> when key is the provider name.
Syncable.registerSyncProtocol = function (name, protocolInstance) {
    /// <summary>
    ///    Register a synchronization protocol that can synchronize databases with remote servers.
    /// </summary>
    /// <param name="name" type="String">Provider name</param>
    /// <param name="protocolInstance" type="ISyncProtocol">Implementation of ISyncProtocol</param>
    var partialsThreshold = protocolInstance.partialsThreshold;
    if (typeof partialsThreshold === 'number') {
        // Don't allow NaN or negative threshold
        if (isNaN(partialsThreshold) || partialsThreshold < 0) {
            throw new Error('The given number for the threshold is not supported');
        }
    }
    else {
        // Use Infinity as the default so simple protocols don't have to care about partial synchronization
        protocolInstance.partialsThreshold = Infinity;
    }
    Syncable.registeredProtocols[name] = protocolInstance;
};
// Register addon in Dexie:
__WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].Syncable = Syncable;
__WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */].addons.push(Syncable);

/* harmony default export */ __webpack_exports__["a"] = Syncable;
//# sourceMappingURL=dexie-syncable.es.js.map


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(85), __esModule: true };

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(86), __esModule: true };

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(87), __esModule: true };

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(88), __esModule: true };

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(90), __esModule: true };

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(91), __esModule: true };

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(92), __esModule: true };

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(94), __esModule: true };

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(95), __esModule: true };

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(41);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(41);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(76);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(73);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(42);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(42);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(70);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38);
__webpack_require__(117);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(119);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(120);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(121);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(122);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(123);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(124);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(62);
__webpack_require__(38);
__webpack_require__(63);
__webpack_require__(125);
__webpack_require__(127);
__webpack_require__(128);
module.exports = __webpack_require__(0).Promise;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(126);
__webpack_require__(62);
__webpack_require__(129);
__webpack_require__(130);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38);
__webpack_require__(63);
module.exports = __webpack_require__(37).f('iterator');


/***/ }),
/* 96 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(12);
var toLength = __webpack_require__(34);
var toAbsoluteIndex = __webpack_require__(115);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(5);
var createDesc = __webpack_require__(17);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(16);
var gOPS = __webpack_require__(30);
var pIE = __webpack_require__(20);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(10);
var call = __webpack_require__(48);
var isArrayIter = __webpack_require__(47);
var anObject = __webpack_require__(4);
var toLength = __webpack_require__(34);
var getIterFn = __webpack_require__(61);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 102 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(13);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(29);
var descriptor = __webpack_require__(17);
var setToStringTag = __webpack_require__(21);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(9)(IteratorPrototype, __webpack_require__(2)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 105 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(22)('meta');
var isObject = __webpack_require__(7);
var has = __webpack_require__(8);
var setDesc = __webpack_require__(5).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(11)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var macrotask = __webpack_require__(60).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(13)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(16);
var gOPS = __webpack_require__(30);
var pIE = __webpack_require__(20);
var toObject = __webpack_require__(18);
var IObject = __webpack_require__(46);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(11)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(5);
var anObject = __webpack_require__(4);
var getKeys = __webpack_require__(16);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(12);
var gOPN = __webpack_require__(52).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(9);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(7);
var anObject = __webpack_require__(4);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(10)(Function.call, __webpack_require__(51).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(1);
var core = __webpack_require__(0);
var dP = __webpack_require__(5);
var DESCRIPTORS = __webpack_require__(6);
var SPECIES = __webpack_require__(2)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(33);
var defined = __webpack_require__(25);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(33);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(10);
var $export = __webpack_require__(3);
var toObject = __webpack_require__(18);
var call = __webpack_require__(48);
var isArrayIter = __webpack_require__(47);
var toLength = __webpack_require__(34);
var createProperty = __webpack_require__(99);
var getIterFn = __webpack_require__(61);

$export($export.S + $export.F * !__webpack_require__(50)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(96);
var step = __webpack_require__(105);
var Iterators = __webpack_require__(14);
var toIObject = __webpack_require__(12);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(49)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(3);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(108) });


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(29) });


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(5).f });


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(18);
var $getPrototypeOf = __webpack_require__(53);

__webpack_require__(55)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(18);
var $keys = __webpack_require__(16);

__webpack_require__(55)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(3);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(112).set });


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(15);
var global = __webpack_require__(1);
var ctx = __webpack_require__(10);
var classof = __webpack_require__(43);
var $export = __webpack_require__(3);
var isObject = __webpack_require__(7);
var aFunction = __webpack_require__(19);
var anInstance = __webpack_require__(97);
var forOf = __webpack_require__(101);
var speciesConstructor = __webpack_require__(59);
var task = __webpack_require__(60).set;
var microtask = __webpack_require__(107)();
var newPromiseCapabilityModule = __webpack_require__(28);
var perform = __webpack_require__(56);
var userAgent = __webpack_require__(116);
var promiseResolve = __webpack_require__(57);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(2)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(111)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(21)($Promise, PROMISE);
__webpack_require__(113)(PROMISE);
Wrapper = __webpack_require__(0)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(50)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(1);
var has = __webpack_require__(8);
var DESCRIPTORS = __webpack_require__(6);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(58);
var META = __webpack_require__(106).KEY;
var $fails = __webpack_require__(11);
var shared = __webpack_require__(32);
var setToStringTag = __webpack_require__(21);
var uid = __webpack_require__(22);
var wks = __webpack_require__(2);
var wksExt = __webpack_require__(37);
var wksDefine = __webpack_require__(36);
var enumKeys = __webpack_require__(100);
var isArray = __webpack_require__(103);
var anObject = __webpack_require__(4);
var isObject = __webpack_require__(7);
var toIObject = __webpack_require__(12);
var toPrimitive = __webpack_require__(35);
var createDesc = __webpack_require__(17);
var _create = __webpack_require__(29);
var gOPNExt = __webpack_require__(110);
var $GOPD = __webpack_require__(51);
var $DP = __webpack_require__(5);
var $keys = __webpack_require__(16);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(52).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(20).f = $propertyIsEnumerable;
  __webpack_require__(30).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(15)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(3);
var core = __webpack_require__(0);
var global = __webpack_require__(1);
var speciesConstructor = __webpack_require__(59);
var promiseResolve = __webpack_require__(57);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(3);
var newPromiseCapability = __webpack_require__(28);
var perform = __webpack_require__(56);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(36)('asyncIterator');


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(36)('observable');


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
__webpack_require__(135);
module.exports = self.fetch.bind(self);


/***/ }),
/* 132 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(39), __webpack_require__(132)))

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(133);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(39)))

/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["Headers"] = Headers;
/* harmony export (immutable) */ __webpack_exports__["Request"] = Request;
/* harmony export (immutable) */ __webpack_exports__["Response"] = Response;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOMException", function() { return DOMException; });
/* harmony export (immutable) */ __webpack_exports__["fetch"] = fetch;
var support = {
  searchParams: 'URLSearchParams' in self,
  iterable: 'Symbol' in self && 'iterator' in Symbol,
  blob:
    'FileReader' in self &&
    'Blob' in self &&
    (function() {
      try {
        new Blob()
        return true
      } catch (e) {
        return false
      }
    })(),
  formData: 'FormData' in self,
  arrayBuffer: 'ArrayBuffer' in self
}

function isDataView(obj) {
  return obj && DataView.prototype.isPrototypeOf(obj)
}

if (support.arrayBuffer) {
  var viewClasses = [
    '[object Int8Array]',
    '[object Uint8Array]',
    '[object Uint8ClampedArray]',
    '[object Int16Array]',
    '[object Uint16Array]',
    '[object Int32Array]',
    '[object Uint32Array]',
    '[object Float32Array]',
    '[object Float64Array]'
  ]

  var isArrayBufferView =
    ArrayBuffer.isView ||
    function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
}

function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name)
  }
  if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
    throw new TypeError('Invalid character in header field name')
  }
  return name.toLowerCase()
}

function normalizeValue(value) {
  if (typeof value !== 'string') {
    value = String(value)
  }
  return value
}

// Build a destructive iterator for the value list
function iteratorFor(items) {
  var iterator = {
    next: function() {
      var value = items.shift()
      return {done: value === undefined, value: value}
    }
  }

  if (support.iterable) {
    iterator[Symbol.iterator] = function() {
      return iterator
    }
  }

  return iterator
}

function Headers(headers) {
  this.map = {}

  if (headers instanceof Headers) {
    headers.forEach(function(value, name) {
      this.append(name, value)
    }, this)
  } else if (Array.isArray(headers)) {
    headers.forEach(function(header) {
      this.append(header[0], header[1])
    }, this)
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function(name) {
      this.append(name, headers[name])
    }, this)
  }
}

Headers.prototype.append = function(name, value) {
  name = normalizeName(name)
  value = normalizeValue(value)
  var oldValue = this.map[name]
  this.map[name] = oldValue ? oldValue + ', ' + value : value
}

Headers.prototype['delete'] = function(name) {
  delete this.map[normalizeName(name)]
}

Headers.prototype.get = function(name) {
  name = normalizeName(name)
  return this.has(name) ? this.map[name] : null
}

Headers.prototype.has = function(name) {
  return this.map.hasOwnProperty(normalizeName(name))
}

Headers.prototype.set = function(name, value) {
  this.map[normalizeName(name)] = normalizeValue(value)
}

Headers.prototype.forEach = function(callback, thisArg) {
  for (var name in this.map) {
    if (this.map.hasOwnProperty(name)) {
      callback.call(thisArg, this.map[name], name, this)
    }
  }
}

Headers.prototype.keys = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push(name)
  })
  return iteratorFor(items)
}

Headers.prototype.values = function() {
  var items = []
  this.forEach(function(value) {
    items.push(value)
  })
  return iteratorFor(items)
}

Headers.prototype.entries = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push([name, value])
  })
  return iteratorFor(items)
}

if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries
}

function consumed(body) {
  if (body.bodyUsed) {
    return Promise.reject(new TypeError('Already read'))
  }
  body.bodyUsed = true
}

function fileReaderReady(reader) {
  return new Promise(function(resolve, reject) {
    reader.onload = function() {
      resolve(reader.result)
    }
    reader.onerror = function() {
      reject(reader.error)
    }
  })
}

function readBlobAsArrayBuffer(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsArrayBuffer(blob)
  return promise
}

function readBlobAsText(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsText(blob)
  return promise
}

function readArrayBufferAsText(buf) {
  var view = new Uint8Array(buf)
  var chars = new Array(view.length)

  for (var i = 0; i < view.length; i++) {
    chars[i] = String.fromCharCode(view[i])
  }
  return chars.join('')
}

function bufferClone(buf) {
  if (buf.slice) {
    return buf.slice(0)
  } else {
    var view = new Uint8Array(buf.byteLength)
    view.set(new Uint8Array(buf))
    return view.buffer
  }
}

function Body() {
  this.bodyUsed = false

  this._initBody = function(body) {
    this._bodyInit = body
    if (!body) {
      this._bodyText = ''
    } else if (typeof body === 'string') {
      this._bodyText = body
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body
    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString()
    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
      this._bodyArrayBuffer = bufferClone(body.buffer)
      // IE 10-11 can't handle a DataView body.
      this._bodyInit = new Blob([this._bodyArrayBuffer])
    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      this._bodyArrayBuffer = bufferClone(body)
    } else {
      this._bodyText = body = Object.prototype.toString.call(body)
    }

    if (!this.headers.get('content-type')) {
      if (typeof body === 'string') {
        this.headers.set('content-type', 'text/plain;charset=UTF-8')
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('content-type', this._bodyBlob.type)
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
      }
    }
  }

  if (support.blob) {
    this.blob = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(new Blob([this._bodyArrayBuffer]))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as blob')
      } else {
        return Promise.resolve(new Blob([this._bodyText]))
      }
    }

    this.arrayBuffer = function() {
      if (this._bodyArrayBuffer) {
        return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
      } else {
        return this.blob().then(readBlobAsArrayBuffer)
      }
    }
  }

  this.text = function() {
    var rejected = consumed(this)
    if (rejected) {
      return rejected
    }

    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob)
    } else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text')
    } else {
      return Promise.resolve(this._bodyText)
    }
  }

  if (support.formData) {
    this.formData = function() {
      return this.text().then(decode)
    }
  }

  this.json = function() {
    return this.text().then(JSON.parse)
  }

  return this
}

// HTTP methods whose capitalization should be normalized
var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

function normalizeMethod(method) {
  var upcased = method.toUpperCase()
  return methods.indexOf(upcased) > -1 ? upcased : method
}

function Request(input, options) {
  options = options || {}
  var body = options.body

  if (input instanceof Request) {
    if (input.bodyUsed) {
      throw new TypeError('Already read')
    }
    this.url = input.url
    this.credentials = input.credentials
    if (!options.headers) {
      this.headers = new Headers(input.headers)
    }
    this.method = input.method
    this.mode = input.mode
    this.signal = input.signal
    if (!body && input._bodyInit != null) {
      body = input._bodyInit
      input.bodyUsed = true
    }
  } else {
    this.url = String(input)
  }

  this.credentials = options.credentials || this.credentials || 'same-origin'
  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers)
  }
  this.method = normalizeMethod(options.method || this.method || 'GET')
  this.mode = options.mode || this.mode || null
  this.signal = options.signal || this.signal
  this.referrer = null

  if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    throw new TypeError('Body not allowed for GET or HEAD requests')
  }
  this._initBody(body)
}

Request.prototype.clone = function() {
  return new Request(this, {body: this._bodyInit})
}

function decode(body) {
  var form = new FormData()
  body
    .trim()
    .split('&')
    .forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
  return form
}

function parseHeaders(rawHeaders) {
  var headers = new Headers()
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
  preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
    var parts = line.split(':')
    var key = parts.shift().trim()
    if (key) {
      var value = parts.join(':').trim()
      headers.append(key, value)
    }
  })
  return headers
}

Body.call(Request.prototype)

function Response(bodyInit, options) {
  if (!options) {
    options = {}
  }

  this.type = 'default'
  this.status = options.status === undefined ? 200 : options.status
  this.ok = this.status >= 200 && this.status < 300
  this.statusText = 'statusText' in options ? options.statusText : 'OK'
  this.headers = new Headers(options.headers)
  this.url = options.url || ''
  this._initBody(bodyInit)
}

Body.call(Response.prototype)

Response.prototype.clone = function() {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url
  })
}

Response.error = function() {
  var response = new Response(null, {status: 0, statusText: ''})
  response.type = 'error'
  return response
}

var redirectStatuses = [301, 302, 303, 307, 308]

Response.redirect = function(url, status) {
  if (redirectStatuses.indexOf(status) === -1) {
    throw new RangeError('Invalid status code')
  }

  return new Response(null, {status: status, headers: {location: url}})
}

var DOMException = self.DOMException
try {
  new DOMException()
} catch (err) {
  DOMException = function(message, name) {
    this.message = message
    this.name = name
    var error = Error(message)
    this.stack = error.stack
  }
  DOMException.prototype = Object.create(Error.prototype)
  DOMException.prototype.constructor = DOMException
}

function fetch(input, init) {
  return new Promise(function(resolve, reject) {
    var request = new Request(input, init)

    if (request.signal && request.signal.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'))
    }

    var xhr = new XMLHttpRequest()

    function abortXhr() {
      xhr.abort()
    }

    xhr.onload = function() {
      var options = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
      }
      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
      var body = 'response' in xhr ? xhr.response : xhr.responseText
      resolve(new Response(body, options))
    }

    xhr.onerror = function() {
      reject(new TypeError('Network request failed'))
    }

    xhr.ontimeout = function() {
      reject(new TypeError('Network request failed'))
    }

    xhr.onabort = function() {
      reject(new DOMException('Aborted', 'AbortError'))
    }

    xhr.open(request.method, request.url, true)

    if (request.credentials === 'include') {
      xhr.withCredentials = true
    } else if (request.credentials === 'omit') {
      xhr.withCredentials = false
    }

    if ('responseType' in xhr && support.blob) {
      xhr.responseType = 'blob'
    }

    request.headers.forEach(function(value, name) {
      xhr.setRequestHeader(name, value)
    })

    if (request.signal) {
      request.signal.addEventListener('abort', abortXhr)

      xhr.onreadystatechange = function() {
        // DONE (success or failure)
        if (xhr.readyState === 4) {
          request.signal.removeEventListener('abort', abortXhr)
        }
      }
    }

    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
  })
}

fetch.polyfill = true

if (!self.fetch) {
  self.fetch = fetch
  self.Headers = Headers
  self.Request = Request
  self.Response = Response
}


/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_dexie__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_dexie_observable__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_dexie_syncable__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cuid_js__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__poll_sync_protocol__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__connection_status__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__server_comm__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__sync_client__ = __webpack_require__(68);









var _initConnectionStatus = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__connection_status__["a" /* default */])(window),
    isOnline = _initConnectionStatus.isOnline,
    onlineStatusChanged = _initConnectionStatus.onlineStatusChanged;

var sync = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__poll_sync_protocol__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_6__server_comm__["a" /* default */], isOnline);



/* harmony default export */ __webpack_exports__["default"] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__sync_client__["a" /* default */])({
  Dexie: __WEBPACK_IMPORTED_MODULE_0_dexie__["a" /* default */],
  syncable: __WEBPACK_IMPORTED_MODULE_2_dexie_syncable__["a" /* default */],
  observable: __WEBPACK_IMPORTED_MODULE_1_dexie_observable__["a" /* default */],
  sync: sync,
  onlineStatusChanged: onlineStatusChanged,
  isOnline: isOnline,
  cuid: __WEBPACK_IMPORTED_MODULE_3__cuid_js__["a" /* default */]
});

/***/ })
/******/ ]);
//# sourceMappingURL=sync-client.js.map