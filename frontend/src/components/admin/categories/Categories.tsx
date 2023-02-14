import React, { useEffect } from "react";
import Table from '../../template/table/TableCategories';
import Forms from "./forms/Forms";
import "./Categories.css"
import CategoryModel from "../../../services/CategoryService";



export default function Categories(){
    return (
        <div className="">
            <h1>Categorias</h1>
            <div className="d-flex flex-column-reverse">
                <Table></Table>
                <Forms></Forms>
            </div>
        </div>
    )
}

