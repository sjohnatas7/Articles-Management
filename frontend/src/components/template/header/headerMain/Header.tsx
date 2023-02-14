import React, { useState } from "react"
import "./Header.css"
import HeaderHook from "../HeaderHook"
import UserDropdown from "../userDropdown/UserDropdown"
import { useAppSelector } from "../../../../store/hooks"
import { Link } from "react-router-dom"

interface HeaderProps{
    title: String,
}
export default function Header(props: HeaderProps){
        const {icon , handleChange} = HeaderHook()
        const isUserLogin = useAppSelector(state => state.auth.isUserLogin)
        const isMenuVisible = useAppSelector(state => state.menu.isMenuVisible)
        return (
        <header>
            {isUserLogin ? 
            <a className="toggle" onClick={handleChange} >
                <i className={`fa-solid fa-lg fa-angle-left ${icon}`} ></i>
            </a> : null}
            <Link to="/" className="title">{props.title}</Link>
            {isUserLogin ? <UserDropdown></UserDropdown> : null}
        </header>
    )
}