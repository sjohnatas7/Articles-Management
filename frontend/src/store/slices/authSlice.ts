import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState{
    isUserLogin: boolean,
    user: {
        name: string,
        email: string
    }
}

const initialState: AuthState = {
    isUserLogin: true,
    user: {
        name: '',
        email: ''
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        toogleUser: (state) => {
            state.isUserLogin = !state.isUserLogin
        },
        setUser: (state, action) => {
            state.user = action.payload
            if(action.payload){
                axios.defaults.headers.common['Authorization'] = `bearer ${action.payload.token}`
                state.isUserLogin = true
            }else{
                delete axios.defaults.headers.common['Authorization']
                state.isUserLogin = false
            }
        }
    }
})

export const { toogleUser } = authSlice.actions
export default authSlice.reducer
