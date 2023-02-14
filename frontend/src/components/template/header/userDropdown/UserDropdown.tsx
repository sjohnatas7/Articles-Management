import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../store/hooks";
import "./UserDropdown.css"

export default function UserDropdown(){
    const email = useAppSelector(state => state.auth.user.email || '')
    const name = useAppSelector(state => state.auth.user.name || '')
    return (
        <div className="user-dropdown">
            <div className="user-button">
                <span className="d-none d-sm-block">{name}</span>
                <div className="user-dropdown-img">
                <span className="d-none d-sm-block">{email}</span>
                </div>
                <i className="fa-solid fa-angle-down"></i>
            </div>
            <div className="user-dropdown-content">
                <Link to="/admin"><i className="fa-solid fa-cogs"></i>Administração</Link>
                <a href=""><i className="fa-solid fa-sign-out"></i>Sair</a>
            </div>
        </div>
    )
}