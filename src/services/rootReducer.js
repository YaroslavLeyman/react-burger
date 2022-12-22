import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './burgerConstructorReducer';

export const rootReducer = combineReducers( { burgerConstructorReducer });
