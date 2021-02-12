import { Error } from '@material-ui/icons';
import * as ActionTypes from './ActionTypes';

const baseUrl = "http://localhost:3001/";

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
        .then(items => dispatch(addItem(items)))
        .catch(error => dispatch(itemFailed(error.message)));
}

export const postItem = (itemName, dateAdded, currentStock, manufacturingCompany) => (dispatch) => {
    const newItem = {
        itemName: itemName,
        dateAdded: dateAdded,
        currentStock: currentStock,
        manufacturingCompany: manufacturingCompany,
    };
    console.log("New Item: " + JSON.stringify(newItem));
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
.then(response => {
    // alert('Your comment could not be posted\nError: '+ newItem);
    return dispatch(fetchItem());
    })
    .catch(error => { 
            console.log('Post item: ', error.message);
            alert('Your item could not be posted\nError: '+ error.message);
        });
}

export const incrementCurrentStock = (id) => (dispatch) => {
    const change = {
        changeBy: 1
    };
    console.log("ID: " + id);
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
        return dispatch(fetchItem());
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
        return dispatch(fetchItem());
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
        return dispatch(fetchItem());
    })
    .catch((error) => {
        console.log('DELETE item: ', error.message);
        alert('Your item is not deleted: ' + error.message);
    })
}

