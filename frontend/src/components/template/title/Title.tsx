import React from "react"
import "./Title.css"

interface TitleProps{
    title:string,
    icon?:string,
    subtitle:string
}

export default function title(props: TitleProps){
    return (
        <div className="page-title">
            <h1>
                {props.icon ? <i className={`fa-solid ${props.icon}`}></i>:null}
                {props.title}
            </h1>
            <h2>{props.subtitle}</h2>
        </div>
    )
}