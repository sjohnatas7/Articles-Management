import React, { useEffect, useState } from "react";
import { baseApiUrl } from "../../globals";
import Title from "../template/title/Title";
import { useParams } from "react-router";
import axios from "axios";
import IArticle from "../../types/ArticleInterface";

export default function ArticleById(){
    const { id } = useParams()
    const [article, setArticle] = useState<IArticle>({id: null, name: '',description: '', imageUrl: '', userId: null, content: '', categoryId: null})
    useEffect(()=>{
        const url = `${baseApiUrl}/articles/${id}`
        axios.get(url).then(res => setArticle(res.data))
        
    },[])
    return(
        <div className="article-by-id">
            <Title icon="fa-file" title={article.name} subtitle={article.description}></Title>
        <div className="article-content">{article.content}</div>
        </div>
    )
}