import { AlertColor } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store"


interface SnackbarState { 
    message: string,
    severity: AlertColor,
    showSnackbar: boolean
}
const initialState: SnackbarState = {
    message: '',
    severity: 'error',
    showSnackbar: false
}

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState: initialState,
    reducers: {
        showError: (state,action) => {
            state.severity = 'error'
            state.message = action.payload
            state.showSnackbar = true
        },
        showConclude: (state,action) => {
            state.severity = 'success'
            state.message = action.payload
            state.showSnackbar = true
        },
        setNull: () => initialState  
    }
})

export const { showError, showConclude, setNull } = snackbarSlice.actions
export const selectVisibleSnackbar = (state: RootState) => state.snackbar.showSnackbar
export const selectMessageSnackbar = (state: RootState) => state.snackbar.message
export const selectSeveritySnackbar = (state: RootState) => state.snackbar.severity

export default snackbarSlice.reducer

