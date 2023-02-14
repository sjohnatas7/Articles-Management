import axios from "axios"
import { baseApiUrl } from "../globals"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { setArticlesByCategoryCategory,
    setArticlesByCategoryArticles, 
    setArticlesByCategoryPage, 
    setArticlesByCategoryLoadMore } from "../store/slices/articlesByCategorySlice"
import showErrorOrConclude from "../config/showErrorOrConclude"

export default function ArticlesByCategoryService(){
    const articlesByCategory = useAppSelector(state => state.articlesByCategory.category)
    const page = useAppSelector(state => state.articlesByCategory.page)
    const category = useAppSelector(state => state.articlesByCategory.category)
    const {showMessageConclude,showMessageError} = showErrorOrConclude()
    const dispatch = useAppDispatch()

    function loadArticleByCategory(id: string){
        const url = `${baseApiUrl}/categories/${id}`
        axios.get(url)
            .then(res => {
                dispatch(setArticlesByCategoryCategory(res.data))
            })
            .then(()=>loadArticles(id))
            .catch(err => (showMessageError(err)))   
    }
    function loadArticles(id: string){
        const url = `${baseApiUrl}/categories/${id}/article?page=${page}`
        axios.get(url)
            .then(res => {
                console.log(res)
                dispatch(setArticlesByCategoryArticles(res.data))
                dispatch(setArticlesByCategoryPage(page+1))
                if(res.data.length === 0)dispatch(setArticlesByCategoryLoadMore(false))
            })
            .catch(err => (showMessageError(err)))   
    }
    return { loadArticleByCategory,loadArticles }
}