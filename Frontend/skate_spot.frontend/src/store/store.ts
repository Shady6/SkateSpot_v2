import { createStore } from 'redux';
import { notesReducer } from '../reducers/notesReducer';

export const store = createStore(notesReducer)