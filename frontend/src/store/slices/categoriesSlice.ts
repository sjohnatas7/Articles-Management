import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ICategories from "../../types/CategoryInterface";
import type { RootState } from "../store"


interface CategoriesState { 
    data: ICategories,
    mode: 'post' | 'put' | 'delete'
    title: 'Salvar' | 'Atualizar' | 'Excluir'
    allPaths: {id: number, path: string}[]
    categories: ICategories[]
}
const initialState: CategoriesState = {
    data: {
        id: '',
        path: '',
        parentId: null,
        name: ''
    },
    mode: 'post',
    title: 'Salvar',
    allPaths: [],
    categories: []
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: initialState,
    reducers: {
        resetCategories: (state) => {
            state.data = initialState.data
            state.mode = initialState.mode
            state.title = initialState.title
        },
            
        setCategoriesMode: (state, action) => {
            state.mode = action.payload
        },
        setCategoriesTitle: (state,action) =>{
            state.title = action.payload
        },
        setCategoriesData: (state, action) => {
            state.data = {...action.payload}
        },
        pushNewPath: (state, action) => {
            state.allPaths.push(action.payload)
        },
        setCategories: (state, action) => {
            state.categories = action.payload
        }

    }
})

export const { setCategoriesData, setCategoriesMode, setCategoriesTitle, resetCategories, pushNewPath, setCategories } = categoriesSlice.actions
export const selectCategoriesTitle = (state: RootState) => state.categories.title
export const selectCategoriesMode = (state: RootState) => state.categories.mode
export const selectCategoriesData = (state: RootState) => state.categories.data

export default categoriesSlice.reducer