import React from "react"
import "./Stat.css"

interface StatProps{
    icon: string,
    color: string,
    title: string,
    value: number
}

export default function Stat(props: StatProps){
    

    return (
        <div className="stat">
            <div className="stat-icon">
                <i className={`fa-solid ${props.icon}`} style={{color: props.color || '#000'}}></i>
            </div>
            <div className="stat-info">
                <span className="stat-title">{props.title}</span>
                <span className="stat-value">{props.value}</span>
            </div>
        </div>
    )
}