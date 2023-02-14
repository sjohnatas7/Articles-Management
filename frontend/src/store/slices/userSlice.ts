import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUser from "../../types/UserInterface";
import type { RootState } from "../store"


interface UserState { 
    data: IUser,
    mode: 'post' | 'put' | 'delete'
    title: 'Salvar' | 'Atualizar' | 'Excluir'
    users: IUser[] 
}
const initialState: UserState = {
    data: {
        id: '',
        name: '',
        admin: false,
        email: '',
        confirmPassword: ''
    },
    mode: 'post',
    title: 'Salvar',
    users: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        resetUser: (state) => {
            state.data = initialState.data
            state.mode = initialState.mode
            state.title = initialState.title
        },
            
        setUserMode: (state, action) => {
            state.mode = action.payload
        },
        setUserTitle: (state,action) =>{
            state.title = action.payload
        },
        setUserData: (state, action) => {
            state.data = {...action.payload}
        },
        toogleAdmin: (state) => {
            state.data.admin = !state.data.admin
        },
        setUsers:(state, action) => {
            state.users = action.payload 
        }

    }
})

export const { setUserMode, setUserData, resetUser, setUserTitle, toogleAdmin, setUsers } = userSlice.actions
export const selectTitle = (state: RootState) => state.user.title
export const selectMode = (state: RootState) => state.user.mode
export const selectData = (state: RootState) => state.user.data

export default userSlice.reducer