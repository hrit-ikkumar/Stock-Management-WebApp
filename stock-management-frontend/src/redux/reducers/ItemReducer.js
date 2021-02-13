import * as ActionTypes from '../actions/ActionTypes';

const defaultState = {
    isLoading: true,
    errorMessage: null,
    selectedItem: null,
    items: []
};

export const Items = (state=defaultState , action) => {
    switch(action.type) {
        case ActionTypes.CREATE_ITEM:
        {
            const newItems =state.items.concat(action.payload);
            return {...state, isLoading: false, errorMessage: null, items: newItems};
        }   
        case ActionTypes.ADD_ITEM:
            return {...state, isLoading: false, errorMessage: null, items: state.items.concat(action.payload)};
        case ActionTypes.LOADING_ITEM:
            return {...state, isLoading: true, errorMessage: null, items: []};
        case ActionTypes.FAILED_ITEM:
            return {...state, isLoading: false, errorMessage:action.payload, items: []}
        default:
            return state;
    }
}