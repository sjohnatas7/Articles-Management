import { useState } from "react"
import { useAppDispatch } from "../../../store/hooks"
import { toogleMenu } from "../../../store/slices/menuSlice"

export default function HeaderHook(){ 
    const dispatch = useAppDispatch()
    
    const [icon, setIcon] = useState<''|'down'>('')

    function handleChange(){
        dispatch(toogleMenu())
        const newIcon = icon === '' ? 'down' : ''
        setIcon(newIcon)
    }
    
    return {icon, handleChange}
}