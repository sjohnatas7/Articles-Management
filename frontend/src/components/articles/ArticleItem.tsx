import { Link } from "react-router-dom";
import React from "react";
import "./ArticleItem.css"

export interface ArticleItemProps {
    id: number,
    name: string,
    description: string,
    imageUrl: string,
    author: string
}

export default function ArticleItem(props: ArticleItemProps) {
    return (<div className="article-item">
        <Link to={`/articles/${props.id}`}>
            <div className="article-item-img d-none d-sm-block">
                {props.imageUrl
                    ? <img src={props.imageUrl} alt="Article" height="150" width="150" />
                    : <img src="https://images.ctfassets.net/pdf29us7flmy/hjhhSuDSWZ5KjrMYTijB0/8c12318f2ee0f1ab8859a90ffc0e15c6/-IND-004-075-_APA_Headings__Formatting_Tips_and_Examples_Final.png?w=720&q=100&fm=jpg" alt="Article" height="150" width="150" />}
            </div>
            <div className="article-item-info">
                <h2>{props.name}</h2>
                <p>{props.description}</p>
                <span className="article-item-author">
                    <strong>Autor</strong> {props.author}
                </span>
            </div>
        </Link>
    </div>)
}