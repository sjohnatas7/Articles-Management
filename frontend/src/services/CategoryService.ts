import axios from "axios"
import { useMemo, useState } from "react"
import { baseApiUrl } from "../globals"
import ICategory from "../types/CategoryInterface"

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { pushNewPath, setCategories } from "../store/slices/categoriesSlice";
import showErrorOrConclude from "../config/showErrorOrConclude";

export default function CategoryModel(){ 
    const method = useAppSelector(state => state.categories.mode)
    const id = useAppSelector(state => state.categories.data.id)
    const dispatch = useAppDispatch()
    const {showMessageConclude,showMessageError} = showErrorOrConclude()


    function loadCategories(){
        const url = `${baseApiUrl}/categories`
        axios.get(url)
            .then(res => {
                dispatch(setCategories(res.data))
                const paths = res.data as ICategory[]
                paths.map(path=>{
                    const newPath = {id: path.id || '', path: path.path}
                    dispatch(pushNewPath(newPath))
                })
            })
            .catch(err => (showMessageError(err)))
    }

    
    function sendCategoriesForms(category: {[key:string]: FormDataEntryValue}){
        const url = `${baseApiUrl}/categories/${id}`
        console.log(category)
        axios[method](url,category)
            .then(res =>setCategories(res.data))
            .then(()=>loadCategories())
            .then(()=>(showMessageConclude({item:'Categoria', method: method})))
            .catch(err => (showMessageError(err)))
       
    }
    return { loadCategories, sendCategoriesForms }
}