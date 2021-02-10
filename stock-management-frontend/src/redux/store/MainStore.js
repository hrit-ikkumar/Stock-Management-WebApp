import { createStore, combineReducers, applyMiddleware } from 'redux';
import {Items} from '../reducers/ItemReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const MainStore = () => {
    const store = createStore(
        combineReducers({
            items: Items
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}