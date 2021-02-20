"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainStore = void 0;

var _redux = require("redux");

var _ItemReducer = require("../reducers/ItemReducer");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reduxLogger = _interopRequireDefault(require("redux-logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MainStore = function MainStore() {
  console.log("MAIN STORE");
  var store = (0, _redux.createStore)((0, _redux.combineReducers)({
    items: _ItemReducer.Items
  }), (0, _redux.applyMiddleware)(_reduxThunk["default"], _reduxLogger["default"]));
  return store;
};

exports.MainStore = MainStore;