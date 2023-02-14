import React from "react"
import "./Content.css"

interface ContentProps{
    children: React.ReactNode
}

export default function Content(props: ContentProps){
    return(
    <div className="content">
        {props.children}
    </div>
    )
}