"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editItem = exports.deleteItem = exports.decrementCurrentStock = exports.incrementCurrentStock = exports.postItem = exports.fetchItem = exports.editItemValue = exports.decrementItemStock = exports.incrementItemStock = exports.removeItem = exports.appendItem = exports.itemFailed = exports.itemLoading = exports.addItem = void 0;

var _icons = require("@material-ui/icons");

var ActionTypes = _interopRequireWildcard(require("./ActionTypes"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var baseUrl = "http://localhost:3001/";

var addItem = function addItem(item) {
  return {
    type: ActionTypes.CREATE_ITEM,
    payload: item
  };
};

exports.addItem = addItem;

var itemLoading = function itemLoading(errorMessage) {
  return {
    type: ActionTypes.LOADING_ITEM,
    payload: errorMessage
  };
};

exports.itemLoading = itemLoading;

var itemFailed = function itemFailed() {
  return {
    type: ActionTypes.FAILED_ITEM
  };
};

exports.itemFailed = itemFailed;

var appendItem = function appendItem(item) {
  return {
    type: ActionTypes.ADD_ITEM,
    payload: item
  };
};

exports.appendItem = appendItem;

var removeItem = function removeItem(id) {
  return {
    type: ActionTypes.DELETE_ITEM,
    payload: id
  };
};

exports.removeItem = removeItem;

var incrementItemStock = function incrementItemStock(id) {
  return {
    type: ActionTypes.INC_ITEM_STOCK,
    payload: id
  };
};

exports.incrementItemStock = incrementItemStock;

var decrementItemStock = function decrementItemStock(id) {
  return {
    type: ActionTypes.DEC_ITEM_STOCK,
    payload: id
  };
};

exports.decrementItemStock = decrementItemStock;

var editItemValue = function editItemValue(item) {
  return {
    type: ActionTypes.EDIT_ITEM,
    payload: item
  };
};

exports.editItemValue = editItemValue;

var fetchItem = function fetchItem() {
  return function (dispatch) {
    dispatch(itemLoading(true));
    return fetch(baseUrl + 'itemRouter').then(function (response) {
      if (response.ok) {
        return response;
      } else {
        var error = new _icons.Error('Error' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    }, function (error) {
      var errMessage = new _icons.Error(error.message);
      throw errMessage;
    }).then(function (response) {
      return response.json();
    }).then(function (items) {
      return dispatch(appendItem(items.reverse()));
    })["catch"](function (error) {
      return dispatch(itemFailed(error.message));
    });
  };
};

exports.fetchItem = fetchItem;

var postItem = function postItem(itemName, dateAdded, currentStock, manufacturingCompany) {
  return function (dispatch) {
    console.log("POSTITEM (ACTION CREATOR)");
    var newItem = {
      itemName: itemName,
      dateAdded: dateAdded,
      currentStock: currentStock,
      manufacturingCompany: manufacturingCompany
    };
    return fetch(baseUrl + 'itemRouter', {
      method: 'POST',
      body: JSON.stringify(newItem),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then(function (response) {
      if (response.ok) {
        return response;
      } else {
        var error = new _icons.Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    }, function (error) {
      var errmess = new _icons.Error(error.message);
      throw errmess;
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      newItem._id = response._id; // alert('Your comment could not be posted\nError: '+ newItem);

      return dispatch(appendItem([newItem]));
    })["catch"](function (error) {
      console.log('Post item: ', error.message);
      alert('Your item could not be posted\nError: ' + error.message);
    });
  };
};

exports.postItem = postItem;

var incrementCurrentStock = function incrementCurrentStock(id) {
  return function (dispatch) {
    var change = {
      changeBy: 4
    };
    return fetch(baseUrl + 'itemRouter/' + id + '/currentStock', {
      method: 'PUT',
      body: JSON.stringify(change),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then(function (response) {
      if (response.ok) {
        return response;
      } else {
        var error = new _icons.Error('Error' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    }, function (error) {
      var errorMessage = new _icons.Error(error.message);
      throw errorMessage;
    }).then(function (response) {
      return dispatch(incrementItemStock(id));
    })["catch"](function (error) {
      console.log('PUT item (INCR): ', error.message);
      alert('Your item\'s current stock could not be incremented\nError: ' + error.message);
    });
    ;
  };
};

exports.incrementCurrentStock = incrementCurrentStock;

var decrementCurrentStock = function decrementCurrentStock(id) {
  return function (dispatch) {
    var change = {
      changeBy: -1
    };
    return fetch(baseUrl + 'itemRouter/' + id + '/currentStock', {
      method: 'PUT',
      body: JSON.stringify(change),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then(function (response) {
      if (response.ok) {
        return response;
      } else {
        var error = new _icons.Error('Error' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    }, function (error) {
      var errorMessage = new _icons.Error(error.message);
      throw errorMessage;
    }).then(function (response) {
      return dispatch(decrementItemStock(id));
    })["catch"](function (error) {
      console.log('PUT item (DECR): ', error.message);
      alert('Your item\'s current stock could not be decremented\nError: ' + error.message);
    });
    ;
  };
};

exports.decrementCurrentStock = decrementCurrentStock;

var deleteItem = function deleteItem(id) {
  return function (dispatch) {
    return fetch(baseUrl + 'itemRouter/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then(function (response) {
      if (response.ok) {
        return response;
      } else {
        var errorMessage = new _icons.Error('Error ' + response.status + ': ' + response.statusText);
        errorMessage.response = response;
        throw errorMessage;
      }
    }, function (error) {
      var errorMessage = new _icons.Error(error.message);
      throw errorMessage;
    }).then(function (response) {
      return dispatch(removeItem(id));
    })["catch"](function (error) {
      console.log('DELETE item: ', error.message);
      alert('Your item is not deleted: ' + error.message);
    });
  };
};

exports.deleteItem = deleteItem;

var editItem = function editItem(item) {
  return function (dispatch) {
    return fetch(baseUrl + 'itemRouter/' + item._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then(function (response) {
      if (response.ok) {
        return response;
      } else {
        var errorMessage = new _icons.Error("Error: " + response.status + response.statusText);
        console.log(errorMessage);
        throw errorMessage; // throw the error message
      }
    }).then(function (response) {
      return dispatch(editItemValue(item));
    })["catch"](function (error) {
      console.log("ERROR: " + error.status + error.statusText);
      alert("We coudn't update your item." + error.message);
    });
  };
};

exports.editItem = editItem;