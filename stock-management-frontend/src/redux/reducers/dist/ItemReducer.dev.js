"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Items = void 0;

var ActionTypes = _interopRequireWildcard(require("../actions/ActionTypes"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultState = {
  isLoading: true,
  errorMessage: null,
  selectedItem: null,
  items: []
};

var Items = function Items() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case ActionTypes.CREATE_ITEM:
      {
        return _objectSpread({}, state, {
          isLoading: false,
          errorMessage: null,
          items: action.payload
        });
      }

    case ActionTypes.ADD_ITEM:
      {
        return _objectSpread({}, state, {
          isLoading: false,
          errorMessage: null,
          items: state.items.concat(action.payload)
        });
      }

    case ActionTypes.DELETE_ITEM:
      {
        var index = state.items.findIndex(function (x) {
          return x._id === action.payload;
        });

        if (index !== undefined) {
          state.items.splice(index, 1);
        }

        return _objectSpread({}, state, {
          isLoading: false,
          errorMessage: null,
          items: state.items
        });
      }

    case ActionTypes.INC_ITEM_STOCK:
      {
        var _index = state.items.findIndex(function (x) {
          return x._id === action.payload;
        });

        if (_index !== undefined) {
          state.items[_index].currentStock += 1;
        }

        return _objectSpread({}, state, {
          isLoading: false,
          errorMesssage: null,
          items: state.items
        });
      }

    case ActionTypes.DEC_ITEM_STOCK:
      {
        var _index2 = state.items.findIndex(function (x) {
          return x._id === action.payload;
        });

        if (_index2 !== undefined) {
          state.items[_index2].currentStock -= 1;
        }

        return _objectSpread({}, state, {
          isLoading: false,
          errorMesssage: null,
          items: state.items
        });
      }

    case ActionTypes.LOADING_ITEM:
      return _objectSpread({}, state, {
        isLoading: true,
        errorMessage: null,
        items: []
      });

    case ActionTypes.FAILED_ITEM:
      return _objectSpread({}, state, {
        isLoading: false,
        errorMessage: action.payload,
        items: []
      });

    default:
      return state;
  }
};

exports.Items = Items;