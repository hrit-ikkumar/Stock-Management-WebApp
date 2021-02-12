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

export const postItem = (itemName, dateAdded, currentStock, manufacturingComapany) => (dispatch) => {
    const newItem = {
        itemName: itemName,
        dateAdded: dateAdded,
        currentStock: currentStock,
        manufacturingComapany: manufacturingComapany
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
    .then(response => dispatch(addItem(response)))
    .catch(
        error => 
        { 
            console.log('Post comments ', error.message);
            alert('Your item could not be created\nError: '+ error.message); 
        });
}

