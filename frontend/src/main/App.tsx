import React from "react"
import "./App.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap/dist/css/bootstrap.min.css"

import Header from "../components/template/header/headerMain/Header"
import Content from "../components/template/content/Content"
import Menu from "../components/template/menu/Menu"
import Footer from "../components/template/footer/Footer"
import { useAppSelector } from "../store/hooks"
import { BrowserRouter } from "react-router-dom"
import RoutesContent from "./Routes"



const App = function () {

    const isMenuVisible = useAppSelector(state => state.menu.isMenuVisible)
    const isUserLogin = useAppSelector(state => state.auth.isUserLogin)

    return (
        <BrowserRouter>
            <div id="app" className={!isMenuVisible || !isUserLogin ? 'hide-menu' : ''}>
                <Header title={"Coder - Base de Conhecimento"} />
                <Menu />
                <Content>
                    <RoutesContent />
                </Content>
                <Footer />
            </div>
        </BrowserRouter>)
}
export default App