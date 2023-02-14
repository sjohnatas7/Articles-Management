import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import snackbarReducer from "./slices/snackbar/snackbarSlice"
import categoriesReducer from "./slices/categoriesSlice"
import articlesReducer from "./slices/articleSlice"
import articlesByCategoryReducer from "./slices/articlesByCategorySlice"
import authReducer from "./slices/authSlice"
import menuReducer from "./slices/menuSlice"
import { articleByCategoryApi } from "./slices/api"
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        user: userReducer,
        categories: categoriesReducer,
        snackbar: snackbarReducer,
        articles: articlesReducer,
        articlesByCategory: articlesByCategoryReducer,
        auth: authReducer,
        menu: menuReducer,
        [articleByCategoryApi.reducerPath]: articleByCategoryApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(articleByCategoryApi.middleware)
})
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch