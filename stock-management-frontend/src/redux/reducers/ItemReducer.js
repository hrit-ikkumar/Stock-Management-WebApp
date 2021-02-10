import * as ActionTypes from '../actions/ActionTypes';

export const Items = (state = {
    isLoading: true,
    items: []
}, action) => {
    switch(action.type) {
        case ActionTypes.CREATE_ITEM:
            return {...state, isLoading: false, items: action.payload};
        case ActionTypes.LOADING_ITEM:
            return {...state, isLoading: true, items: []};
        case ActionTypes.FAILED_ITEM:
            return {...state, isLoading: false, items: []}
        default:
            return state;
    }
}