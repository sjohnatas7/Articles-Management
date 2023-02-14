import React, { useState, useEffect } from "react";
import Title from "../template/title/Title";
import { useAppSelector } from "../../store/hooks";
import SnackbarMsg from "../template/snackbarMsg/SnackbarMsg";
import { useParams } from "react-router";
import ArticleByCategoryModel from "../../services/ArticleByCategoryService"
import { useGetArticlesInArticlesByCategoryQuery } from "../../store/slices/api";
import ArticleItem, { ArticleItemProps } from "./ArticleItem";

import "./ArticlesByCategory.css"

export default function ArticlesByCategory() {
    const category = useAppSelector(state => state.articlesByCategory.category)
    const snackbarVisible = useAppSelector(state => state.snackbar.showSnackbar)
    const { loadArticleByCategory } = ArticleByCategoryModel()
    const { id } = useParams()
    const [page, setPage] = useState(1)
    console.log(page)
    const { data, isLoading } = useGetArticlesInArticlesByCategoryQuery({ id: id || '', page: page },
        // this overrules the api definition setting,
        // forcing the query to always fetch when this component is mounted
        { refetchOnMountOrArgChange: true })
    console.log(data)
    useEffect(() => loadArticleByCategory(id || ''), [data])

    return (
        <div className="articles-by-category">
            {snackbarVisible ? <SnackbarMsg></SnackbarMsg> : null}
            <Title title={category.name} icon="fa-folder" subtitle={category.path}></Title>
            {isLoading
                ? <div className="h-100">Carregando...</div>
                : data && data.map((article: ArticleItemProps, index: number) => <ArticleItem id={article.id as number} name={article.name} description={article.description} author={article.author} imageUrl={article.imageUrl}/>)}
            {data && data.length > 2 ?
                <div className="load-more">
                    <button className="btn btn-lg btn-outline-primary load-more" onClick={() => setPage(page + 1)}>Carregar mais...</button>
                </div> : null}
        </div>
    )
}