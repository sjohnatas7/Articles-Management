import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ICategories from "../../types/CategoryInterface";
import IArticle from "../../types/ArticleInterface";
import type { RootState } from "../store"


interface ArticleState { 
    data: IArticle,
    mode: 'post' | 'put' | 'delete'
    title: 'Salvar' | 'Atualizar' | 'Excluir'
    articles: IArticle[],
    limit: number,
    count: number,
    page: number
}
const initialState: ArticleState = {
    data: {
        id: '',
        name: '',
        imageUrl: '',
        userId: null,
        categoryId: null,
        description: '',
        content: ''
    },
    mode: 'post',
    title: 'Salvar',
    articles: [],
    limit: 3,
    count: 0,
    page: 1
}

export const articlesSlice = createSlice({
    name: 'articles',
    initialState: initialState,
    reducers: {
        resetArticles: (state) => {
            state.data = initialState.data
            state.mode = initialState.mode
            state.title = initialState.title
        },
            
        setArticlesMode: (state, action) => {
            state.mode = action.payload
        },
        setArticlesTitle: (state,action) =>{
            state.title = action.payload
        },
        setArticlesData: (state, action) => {
            state.data = {...action.payload}
        },
        setArticles: (state, action) => {
            state.articles = action.payload
        },
        setArticlesCount: (state, action) => {
            state.count = action.payload
        },
        setArticlesLimit: (state, action) => {
            state.limit = action.payload
        },
        setArticlesPage: (state, action) => {
            state.page = action.payload
        }
    }
})

export const { setArticles,
     setArticlesData, 
     setArticlesMode, 
     setArticlesTitle, 
     setArticlesCount, 
     setArticlesLimit, 
     setArticlesPage,
     resetArticles } = articlesSlice.actions


export default articlesSlice.reducer