import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper';


const initialState = {
    data: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.data = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE] : (state, action) => {
            return {
                ... state,
                ... action.payload.user,
            }
        }
    }
})

export const { setUserData } = userSlice.actions;

export const selectUserData = (state) => state.user.data;

export const userReducer = userSlice.reducer;