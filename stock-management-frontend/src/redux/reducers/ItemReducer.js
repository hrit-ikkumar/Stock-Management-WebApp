import * as ActionTypes from '../actions/ActionTypes';

const defaultState = {
    isLoading: true,
    errorMessage: null,
    items: []
};
/*

*/
export const Items = (state=defaultState , action) => {
    console.log("ITEMS REDUCER");
    switch(action.type) {
        // name
        // promise middleware
        case ActionTypes.CREATE_ITEM:
        {
            state.items = action.payload;
            return {...state, isLoading: false, errorMessage: null, items: action.payload};
        }   
        case ActionTypes.ADD_ITEM:
        {
            let newItems = state.items;
            let newItem = action.payload;
            newItem = newItem.concat(newItems);
            newItems = newItem;
            state.items = newItems;
            return {...state, isLoading: false, errorMessage: null, items: state.items};
        }
        case ActionTypes.DELETE_ITEM:
        {
            let newItems = state.items;
            const index = newItems.findIndex(x => x._id === action.payload);
            if(index !== undefined)
            {
                newItems.splice(index, 1);
                state.items = newItems;
            }
            return {...state, isLoading: false, errorMessage: null, items:state.items};

        }
        case ActionTypes.EDIT_ITEM:
        {
            let newItems = state.items;
            const index = newItems.findIndex(x => x._id === action.payload._id);
            if(index !== undefined)
            {
                newItems[index]=  action.payload;
                //state.items = newItems;
            }

            return {...state, isLoading: false, errorMessage: null, items: state.items};
        }
        case ActionTypes.INC_ITEM_STOCK: 
        {
            let newItems = state.items;
            const index = newItems.findIndex(x => x._id === action.payload);
            if(index !== undefined)
            {
                newItems[index].currentStock = Number(newItems[index].currentStock) + 1;
                state.items = newItems;
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