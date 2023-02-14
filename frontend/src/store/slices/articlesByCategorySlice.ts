import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ICategories from "../../types/CategoryInterface";
import IArticle from "../../types/ArticleInterface";
import type { RootState } from "../store"


interface ArticleState { 
    articles: IArticle[],
    category: ICategories
    loadMore: boolean
    page: number
}
const initialState: ArticleState = {
    category: {
        id: null,
        parentId: null,
        path: '',
        name: 'Categoria'
    },
    articles: [],
    loadMore: true,
    page: 1
}

export const articlesByCategorySlice = createSlice({
    name: 'articlesByCategory',
    initialState: initialState,
    reducers: {
        setArticlesByCategoryCategory: (state, action) => {
            state.category = action.payload
        },
        setArticlesByCategoryArticles: (state, action) => {
            state.articles.push(...action.payload)
            console.log(state.articles)
        },
        setArticlesByCategoryPage: (state, action) => {
            state.page = action.payload
        },
        setArticlesByCategoryLoadMore: (state, action) => {
            state.loadMore = action.payload
        }
    }
})

export const { 
    setArticlesByCategoryCategory, 
    setArticlesByCategoryArticles, 
    setArticlesByCategoryPage,
    setArticlesByCategoryLoadMore,
} = articlesByCategorySlice.actions

export default articlesByCategorySlice.reducer