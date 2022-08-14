import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper';
import { userReducer } from './slices/user';


export function makeStore() {
    return configureStore({
        reducer: { 
            user: userReducer,
        },
    })
}

export const store = makeStore();
export const wrapper = createWrapper(makeStore, { debug: true });