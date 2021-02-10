import * as ActionTypes from './ActionTypes';

const baseUrl = "http://localhost:3001/";

export const addItem = (item) => ({
    type: ActionTypes.CREATE_ITEM,
    payload: item
});

export const itemLoading = () => ({
    type: ActionTypes.LOADING_ITEM
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