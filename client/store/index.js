import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers'

const store = createStore(reducer, applyMiddleware(thunk, loggingMiddleware));

export default store;