import React from "react";
import "./Articles.css"
import Forms from "./Forms";
import TableArticles from "../../template/table/TableArticles";

export default function Articles(){
    return (
        <div>
            <p>Artigos</p>
            <Forms></Forms>
            <TableArticles></TableArticles>
        </div>
    )
}

