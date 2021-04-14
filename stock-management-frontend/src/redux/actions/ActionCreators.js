import { Error } from '@material-ui/icons';
import * as ActionTypes from './ActionTypes';

const baseUrl = "https://stock-management-webapp.herokuapp.com/";

export const addItem = (item) => ({ 
    type: ActionTypes.CREATE_ITEM,
    payload: item
});

export const itemLoading = (errorMessage) => ({
    type: ActionTypes.LOADING_ITEM,
    payload: errorMessage
});

export const itemFailed = () => ({
    type: ActionTypes.FAILED_ITEM
});

export const appendItem = (item) => ({
    type: ActionTypes.ADD_ITEM,
    payload: item
});

export const removeItem = (id) => ({
    type: ActionTypes.DELETE_ITEM,
    payload: id
});

export const incrementItemStock = (id) => ({
    type: ActionTypes.INC_ITEM_STOCK,
    payload: id
});

export const decrementItemStock = (id) => ({
    type: ActionTypes.DEC_ITEM_STOCK,
    payload: id
});

export const editItemValue = (item) => ({
    type: ActionTypes.EDIT_ITEM,
    payload: item
});


export const fetchItem = () => (dispatch) => {
    dispatch(itemLoading(true));

    return fetch(baseUrl + 'itemRouter')
        .then(response => {
            if(response.ok)
            {
                return response;
            }
            else
            {
                var error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMessage = new Error(error.message);
            throw errMessage;
        })
        .then(response => response.json())
        .then(items => dispatch(appendItem(items.reverse())))
        .catch(error => dispatch(itemFailed(error.message)));
}

export const postItem = (itemName, dateAdded, currentStock, manufacturingCompany) => (dispatch) => {
    console.log("POSTITEM (ACTION CREATOR)");
    const newItem = {
        itemName: itemName,
        dateAdded: dateAdded,
        currentStock: currentStock,
        manufacturingCompany: manufacturingCompany,
    };
    return fetch(baseUrl +'itemRouter', {
        method: 'POST',
        body: JSON.stringify(newItem),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else
        {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error; 
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
.then(response => response.json())
.then(response => {
    newItem._id = response._id;
    // alert('Your comment could not be posted\nError: '+ newItem);
    return dispatch(appendItem([newItem]));
    })
    .catch(error => { 
            console.log('Post item: ', error.message);
            alert('Your item could not be posted\nError: '+ error.message);
        });
}

export const incrementCurrentStock = (id) => (dispatch) => {
    const change = {
        changeBy: 4
    };
    return fetch(baseUrl + 'itemRouter/' + id + '/currentStock', {
        method: 'PUT',
        body: JSON.stringify(change),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok)
        {
            return response;
        }
        else
        {
            var error = new Error('Error' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        var errorMessage = new Error(error.message);
        throw errorMessage;
    })
    .then(response => {
        return dispatch(incrementItemStock(id));
    })
    .catch(error => { 
        console.log('PUT item (INCR): ', error.message);
        alert('Your item\'s current stock could not be incremented\nError: '+ error.message);
    });;
}


export const decrementCurrentStock = (id) => (dispatch) => {
    const change = {
        changeBy: -1
    };
    return fetch(baseUrl + 'itemRouter/' + id + '/currentStock', {
        method: 'PUT',
        body: JSON.stringify(change),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok)
        {
            return response;
        }
        else
        {
            var error = new Error('Error' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        var errorMessage = new Error(error.message);
        throw errorMessage;
    })
    .then(response => {
        return dispatch(decrementItemStock(id));
    })
    .catch(error => { 
        console.log('PUT item (DECR): ', error.message);
        alert('Your item\'s current stock could not be decremented\nError: '+ error.message);
    });;
}

export const deleteItem = (id) => (dispatch) => {
    return fetch(baseUrl + 'itemRouter/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok)
        {
            return response;
        }
        else
        {
            const errorMessage = new Error('Error ' + response.status + ': ' + response.statusText);
            errorMessage.response = response;
            throw errorMessage;
        }
    }, error => {
        var errorMessage = new Error(error.message);
        throw errorMessage;
    })
    .then(response => {
        return dispatch(removeItem(id));
    })
    .catch((error) => {
        console.log('DELETE item: ', error.message);
        alert('Your item is not deleted: ' + error.message);
    }) 
}

export const editItem = (item) => (dispatch) => {
    return fetch(baseUrl + 'itemRouter/' + item._id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok)
        {
            return response;
        }
        else
        {
            var errorMessage = new Error("Error: " + response.status + response.statusText);
            console.log(errorMessage);
            throw errorMessage; // throw the error message
        }
    })
    .then(response => dispatch(editItemValue(item)))
    .catch(error => {
        console.log("ERROR: " + error.status + error.statusText);
        alert("We coudn't update your item." + error.message);
    });
}