import axios from "axios"
import showErrorOrConclude from "../config/showErrorOrConclude";
import { baseApiUrl } from "../globals"

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUsers } from "../store/slices/userSlice";


export default function UserModel(){
    const users = useAppSelector(state => state.user.users)
    const method = useAppSelector(state => state.user.mode)
    const id = useAppSelector(state => state.user.data.id)
    const dispatch = useAppDispatch()
    const {showMessageConclude,showMessageError} = showErrorOrConclude()

    function loadUsers(){
        const url = `${baseApiUrl}/users`
        axios.get(url)
            .then(res => dispatch(setUsers(res.data)))
            .catch(err => showMessageError(err))
    }

    
    function sendUsersForms(user: {[key:string]: FormDataEntryValue}){
        const url = `${baseApiUrl}/users/${id}`
        axios[method](url,user)
            .then(()=>loadUsers())
            .then(()=> showMessageConclude({item:'Usuário',method: method}))
            .catch(err => showMessageError(err))
    }
    return { users, loadUsers, sendUsersForms }
}