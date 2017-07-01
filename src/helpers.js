
var _         = require('underscore');

export function kv(obj_, k, v) {
  if (!k || !v) { return; }

  var obj     = obj_ || {};
  obj[k]      = v;
  return obj;
}

export function mirrorKeysEz(str) {
  return _.reduce(_.toArray(arguments).join(',').split(','), function(m, key) {
    m[key] = key;
    return m;
  }, {});
}

export function mirrorObjKeys(obj) {
  return _.reduce(obj, function(m, X_value, key) {
    return kv(m, key, key);
  }, {});
}

export function mirrorStrArrayKeys(arr) {
  return _.reduce(arr, function(m, key) {
    return kv(m, key, key);
  }, {});
}

/**
 *  Shallow copy.
 */
export function cp(obj) {
  return _.reduce(obj, function(m, value, key) {
    m[key] = value;
    return m;
  }, {});
}

