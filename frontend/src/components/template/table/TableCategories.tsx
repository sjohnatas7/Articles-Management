import React, { useCallback, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { setCategoriesData, setCategoriesTitle, setCategoriesMode } from "../../../store/slices/categoriesSlice"

import ICategory from "../../../types/CategoryInterface"
import CategoryModel from "../../../services/CategoryService"
import "./Table.css"

interface Columns {
    header: string,
    accesor:  keyof ICategory
}

const columns:Columns[] = [
    {header: 'Id', accesor: 'id'},
    {header: 'Nome', accesor: 'name'},
    {header: 'Caminho', accesor: 'path'},
  {header: 'Id do Pai', accesor: 'parentId'},
]

export default function TableCategories(){
    const dispatch = useAppDispatch()
    const { loadCategories } = CategoryModel()
    const categories = useAppSelector(state => state.categories.categories)
    useEffect(loadCategories,[])

    const setAction = useCallback((categories: ICategory, mode: 'post' | 'put' | 'delete', title: string)=>{
        console.log('1')
        dispatch(setCategoriesTitle(title))
        dispatch(setCategoriesData(categories))
        dispatch(setCategoriesMode(mode))
    },[])
    

    function renderHeader(){
        return (
            <tr >
                {columns.map((column, index)=><th key={index}>{column.header}</th>)}
                <th className="text-center">Ações</th> 
            </tr>

        )
    }
    function renderData(){
        const data: ICategory[] = Object.values(categories)
        
        return (data.map((dataCell: ICategory) => {
            return(
                <tr key={dataCell.id}>
                    {columns.map((cell,index) =>  
                        <td className="col" key={index}>{dataCell[cell.accesor] || 'Nenhum'}</td>)}
                    {rendenizarAcoes(dataCell)}
                </tr>
            )
        })
        )
    }
    function rendenizarAcoes(categories:ICategory){
        return (
            <td className="actions justify-content-evenly align-items-center h-100 col">
                 
                <button className="btn rounded ml-3 p-2 bg-warning text-white"
                    onClick={()=> setAction(categories , 'put', 'Atualizar')}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
                
                <button  className="btn rounded mr-3 p-2 bg-danger text-white"
                    onClick={()=> setAction(categories , 'delete', 'Excluir')}>
                    <i className="fa-solid fa-trash"></i>
                </button>
                    
            </td>
        )
    }
    return (
        <table className="table table-striped table-hover">
            <thead className="">
                {renderHeader()}
            </thead>
            <tbody>
                {renderData()}
            </tbody>
        </table>
    )
}