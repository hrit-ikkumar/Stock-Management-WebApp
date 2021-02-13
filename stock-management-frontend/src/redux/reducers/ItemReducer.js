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
            return {...state, isLoading: false, errorMessage: null, items: action.payload};
        }   
        case ActionTypes.ADD_ITEM:
        {
            return {...state, isLoading: false, errorMessage: null, items: state.items.concat(action.payload)};
        }
        case ActionTypes.DELETE_ITEM:
        {
            const index = state.items.findIndex(x => x._id === action.payload);
            if(index !== undefined)
            {
                state.items.splice(index, 1);
            }
            return {...state, isLoading: false, errorMessage: null, items:state.items};

        }
        case ActionTypes.EDIT_ITEM:
        {
            const index = state.items.findIndex(x => x._id === action.payload._id);
            if(index !== undefined)
            {
                state.items[index] = action.payload;
            }
            return {...state, isLoading: false, errorMessage: null, items: state.items};
        }
        case ActionTypes.INC_ITEM_STOCK: 
        {
            // create a copy of items then update 
            const index = state.items.findIndex(x => x._id === action.payload);
            if(index !== undefined)
            {
                state.items[index].currentStock+=1;
            }
            return {...state, isLoading:false, errorMesssage: null, items: state.items};
        }
        case ActionTypes.DEC_ITEM_STOCK: 
        {
            const index = state.items.findIndex(x => x._id === action.payload);
            if(index !== undefined)
            {
                state.items[index].currentStock-=1;
            }
            return {...state, isLoading:false, errorMesssage: null, items: state.items};
        }
        case ActionTypes.LOADING_ITEM:
            return {...state, isLoading: true, errorMessage: null, items: []};
        case ActionTypes.FAILED_ITEM:
            return {...state, isLoading: false, errorMessage:action.payload, items: []}
        default:
            return state;
    }
}