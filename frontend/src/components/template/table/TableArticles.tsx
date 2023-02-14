import React, { useCallback, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { setArticlesPage, setArticlesMode, setArticlesTitle } from "../../../store/slices/articleSlice"
import ArticleModel from "../../../services/ArticleService"

import IArticle from "../../../types/ArticleInterface"
import "./Table.css"

interface Columns {
    header: string,
    accesor:  keyof IArticle
}

const columns:Columns[] = [
    {header: 'Id', accesor: 'id'},
    {header: 'Nome', accesor: 'name'},
    {header: 'Descrição', accesor: 'description'},
]

export default function TableArticles(){
    const dispatch = useAppDispatch()
    const { loadArticles, loadArticle} = ArticleModel()
    const articles = useAppSelector(state => state.articles.articles)
    const count = useAppSelector(state => state.articles.count)
    const limit = useAppSelector(state => state.articles.limit)
    const page = useAppSelector(state => state.articles.page)
    let articlesMaxPage = Math.ceil(count/limit);
    
    
    useEffect(()=>{
        loadArticles()
    },[page])

    const setAction = useCallback((article: IArticle, mode: 'post' | 'put' | 'delete', title: string)=>{
        dispatch(setArticlesTitle(title))
        loadArticle(article.id || '')
        dispatch(setArticlesMode(mode))
        console.log('concluido')
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
        const data: IArticle[] = Object.values(articles)
        
        return (data.map((dataCell: IArticle) => {
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
    function rendenizarAcoes(article:IArticle){
        return (
            <td className="actions justify-content-evenly align-items-center h-100 col">
                 
                <button className="btn rounded ml-3 p-2 bg-warning text-white"
                    onClick={()=> setAction(article , 'put', 'Atualizar')}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
                
                <button  className="btn rounded mr-3 p-2 bg-danger text-white"
                    onClick={()=> setAction(article , 'delete', 'Excluir')}>
                    <i className="fa-solid fa-trash"></i>
                </button>
                    
            </td>
        )
    }
    function setPage(articlesPage: number){
        dispatch(setArticlesPage(articlesPage))
    }
    return (
        <>
        <table className="table table-striped table-hover" id="table">
            <thead className="">
                {renderHeader()}
            </thead>
            <tbody>
                {renderData()}
            </tbody>
        </table>
        <nav aria-label="Page navigation example" className="d-flex justify-content-center">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#table" onClick={()=>dispatch(setArticlesPage(page - 1))} aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {count < limit ? null :
            <>
                {page==1 ? null:
                    <li className={`page-item`} onClick={()=>setPage(1)}><a className="page-link" href="#table">1</a></li>
                }
                <li className="page-item"><a className="page-link active" href="#table">{page}</a></li>
                {page === articlesMaxPage ? null :
                    <li className="page-item"><a className="page-link" href="#table" onClick={()=>setPage(articlesMaxPage)}>{articlesMaxPage}</a></li>
                }
            </>
          }
          <li className="page-item">
            <a className="page-link" href="#table" onClick={()=>dispatch(setArticlesPage(page + 1))}  aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
      </>
    )
}