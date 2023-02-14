import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuState{
    isMenuVisible: boolean,
}

const initialState: MenuState = {
    isMenuVisible: true,
}

export const menuSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        toogleMenu: (state) => {
            state.isMenuVisible = !state.isMenuVisible
        }
    }
})

export const { toogleMenu } = menuSlice.actions
export default menuSlice.reducer
