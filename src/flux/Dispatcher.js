
var FluxDispatcher      = require('flux').Dispatcher;
var Dispatcher          = new FluxDispatcher();

Dispatcher.handleAction = function(action) {
  this.dispatch({
    source: 'ACTION',
    action: action
  });
};

module.exports = Dispatcher;


