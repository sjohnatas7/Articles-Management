import axios from "axios"
import { baseApiUrl } from "../globals"

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { resetArticles, setArticles, setArticlesCount, setArticlesData, setArticlesLimit } from "../store/slices/articleSlice";
import showErrorOrConclude from "../config/showErrorOrConclude";

export default function ArticleModel() {
    const method = useAppSelector(state => state.articles.mode)
    const id = useAppSelector(state => state.articles.data.id)
    const page = useAppSelector(state => state.articles.page)

    const dispatch = useAppDispatch()

    const { showMessageConclude, showMessageError } = showErrorOrConclude()


    function loadArticles() {
        const url = `${baseApiUrl}/articles?page=${page}`
        axios.get(url)
            .then(res => {
                dispatch(setArticles(res.data.data))
                dispatch(setArticlesCount(res.data.count))
                dispatch(setArticlesLimit(res.data.limit))
            })
            .catch(err => showMessageError(err))
    }


    function sendArticlesForms(category: { [key: string]: FormDataEntryValue }) {
        const url = `${baseApiUrl}/articles/${id}`
        axios[method](url, category)
            .then(() => loadArticles())
            .then(() => dispatch(resetArticles()))
            .then(() => (showMessageConclude({ item: 'Artigo', method: method })))
            .catch(err => (showMessageError(err)))
    }
    // .then(res =>setArticles(res.data))
    function loadArticle(articleId: number | string) {
        const url = `${baseApiUrl}/articles/${articleId}`
        axios.get(url)
            .then(res => {
                dispatch(setArticlesData(res.data))
            })
            .catch(err => (showMessageError(err)))

    }
    return { loadArticles, sendArticlesForms, loadArticle }
}