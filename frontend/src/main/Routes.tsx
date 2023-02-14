import React from "react";
import {Routes, Route} from "react-router-dom";
import Admin from "../components/admin/Admin";
import ArticlesByCategory from "../components/articles/ArticlesByCategory";
import Home from "../components/home/Home";
import ArticleById from "../components/articles/ArticleById";
import Auth from "../components/template/auth/Auth";

export default function RoutesContent(){
    return (
    <Routes>
        <Route path="/admin" element={<Admin/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path="/categories/:id/articles" element={<ArticlesByCategory/>}></Route>
        <Route path="/articles/:id" element={<ArticleById/>}></Route>
        <Route path="/auth" element={<Auth></Auth>}></Route>
    </Routes>)
}

