import * as ActionTypes from '../actions/ActionTypes';

export const Items = (state = {
    isLoading: true,
    errorMessage: null,
    items: []
}, action) => {
    switch(action.type) {
        case ActionTypes.CREATE_ITEM:
            return {...state, isLoading: false,errorMessage: null, items: action.payload};
        case ActionTypes.LOADING_ITEM:
            return {...state, isLoading: true,errorMessage: null, items: []};
        case ActionTypes.FAILED_ITEM:
            return {...state, isLoading: false,errorMessage:action.payload, items: []}
        default:
            return state;
    }
}