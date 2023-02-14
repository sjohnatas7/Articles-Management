import React, { useCallback, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { setUserMode, setUserTitle, setUserData } from "../../../store/slices/userSlice"

import IUser from "../../../types/UserInterface"
import UserModel from "../../../services/UserService"

export interface Columns {
    header: string,
    accesor:  'id' |'name' | 'email' | 'admin'   
}
const columns: Columns[] = [
    {header: 'id', accesor: 'id'},
    {header: 'Nome', accesor: 'name'},
    {header: 'Email', accesor: 'email'},
    {header: 'Admin', accesor: 'admin'}
]

export default function TableUser(){
    const { loadUsers } = UserModel()
    const users = useAppSelector(state => state.user.users)
    useEffect(loadUsers, [])
    
    const dispatch = useAppDispatch()

    const setAction = useCallback((user: IUser, mode: 'post' | 'put' | 'delete', title: string)=>{
        dispatch(setUserTitle(title))
        dispatch(setUserData(user))
        dispatch(setUserMode(mode))
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
        const data: IUser[] = Object.values(users)
        let count = 1
        
        return (data.map((dataCell: IUser)=>{
            return(
                <tr key={dataCell.id}>
                    {columns.map((cell,index) => cell.accesor === 'admin' ? 
                        <td key={index}>{dataCell[cell.accesor] ? 'Sim': 'Não'}</td> : 
                        <td key={index}>{dataCell[cell.accesor]}</td>)}
                    {rendenizarAcoes(dataCell)}
                </tr>
            )
        })
        )
    }
    function rendenizarAcoes(user:IUser){
        return (
            <td className="d-flex justify-content-evenly align-items-center">
                 
                <button className="btn rounded ml-3 p-2 bg-warning text-white"
                    onClick={()=> dispatch(()=>setAction(user , 'put', 'Atualizar'))}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
                
                <button  className="btn rounded mr-3 p-2 bg-danger text-white"
                    onClick={()=> dispatch(()=>setAction(user , 'delete', 'Excluir'))}>
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