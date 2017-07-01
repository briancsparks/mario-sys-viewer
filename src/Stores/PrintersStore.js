
var _                 = require('underscore');
var Dispatcher        = require('../flux/Dispatcher');
var {EventEmitter}    = require('fbemitter');
var { Actions }       = require('../Actions/Actions');

class PrintersStore extends EventEmitter {

  constructor() {
    super();

    this.data = {};

    Dispatcher.register(this._handleDispatch.bind(this));
  }

  _handleDispatch(payload) {
    //console.log(`PrintersStore handling ${payload.action.actionType}`, Actions.ADD_ATTRS);

    var self                  = this;
    var { actionType, data }  = payload.action;
    var didChange             = false;

    switch(actionType) {
      case Actions.ADD_ATTRS:
        this.whos = _.extend({}, this.whos);
        this.printers = _.reduce(data, function(m, attr) {
          if (attr.type === 'printer' && attr.who) {self.whos[attr.who] = attr.who; }

          return self._addAttr(m, attr);
        }, this.printers || {});

        didChange = true;
        break;

      default:
        break;
    }

    if (didChange) {
      this.emit('change');
    } else {
      this.emit('change');
    }
  }

  // Called like a reduce function
  _addAttr(m, attr) {
    if (attr.type !== 'printer') { return m; }

    const id = attr.id.replace(/[.]/g, '-');
    console.log(`_addAttr ${id}`, attr.who, attr.key, attr.value);

    m[id]               = m[id]       || {};
    m[id][attr.key]     = attr.value;

    m[id].who           = m[id].who   || {};
    m[id].who[attr.who] = attr.when   || 999;

    //console.log(m);
    return m;
  }

  getPrinters() {
    return this.printers || {};
  }

  getWhos() {
    return _.keys(this.whos || []);
  }

  addChangeListener(callback) {
    this.addListener('change', callback);
  }

  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }
};

var printersStore = new PrintersStore();

export default printersStore;


