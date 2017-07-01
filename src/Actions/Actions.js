
//var _                 = require('underscore');
var Dispatcher        = require('../flux/Dispatcher');
var helpers           = require('../helpers');

var Actions = helpers.mirrorKeysEz('ADD_ATTRS');

export function addAttrs(attrs) {
  Dispatcher.handleAction({
    actionType  : Actions.ADD_ATTRS,
    data        : attrs
  });
};

export { Actions };

