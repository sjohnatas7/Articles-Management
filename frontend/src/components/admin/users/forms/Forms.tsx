import React, { useState } from "react"
import { TextField, Box, Grid, Checkbox, FormControlLabel, Button } from "@mui/material";

import UserModel from "../../../../services/UserService";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { setUserData, toogleAdmin, resetUser } from "../../../../store/slices/userSlice";

import "./Forms.css"


export default function Forms(){
    const data = useAppSelector(state => state.user.data)
    const title = useAppSelector(state => state.user.title)
    const mode = useAppSelector(state => state.user.mode)

    const dispatch = useAppDispatch()
    const { sendUsersForms } = UserModel()

    function handleAdmin(){
        dispatch(toogleAdmin())
    }
    function handleInput(e: React.ChangeEvent){
        const {value, name} = e.target as HTMLInputElement
        dispatch(setUserData({...data, [name]: value}))
    }
    
    

    function handleSubmit(e: React.FormEvent){
        e.preventDefault()
        const params:  { [key: string]: FormDataEntryValue } = {}
        const formData = new FormData(e.currentTarget as HTMLFormElement)
        formData.forEach((value, property:string) => params[property] = value);
        
        sendUsersForms(params)
    }

    return (
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { width: '100%' , margin: 'none'},
        flexGrow: 1
      }}
      noValidate
      autoComplete="off"
      onSubmit={e=>handleSubmit(e)}
    >
        <Grid container spacing={2}>
            <Grid item md={6} sm={12} >
                <TextField
                onChange={handleInput}
                fullWidth
                size='small'
                label="Usuário"
                variant="outlined"
                name="name"
                value={data.name}
                required
                />
            </Grid>
            <Grid item md={6} sm={12}>
                <TextField
                onChange={handleInput}
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                size='small'
                sx={{mr:1}}
                required
                value={data.email}
                />
            
            </Grid>
            
            <Grid item xs={12}>
                <FormControlLabel 
                    control={<Checkbox checked={data.admin} onChange={handleAdmin} name="admin" />}
                    label="Administrador?" />
            </Grid>
            { mode === 'delete' ? null: (
            <>
            <Grid item md={6} sm={12}> 
                <TextField
                onChange={handleInput}
                fullWidth
                size='small'
                type='password'
                name="password"
                label="Senha"
                variant="outlined"
                required
                />
            </Grid>
            <Grid item md={6} sm={12}>
                <TextField
                onChange={handleInput}
                fullWidth
                label="Confirmar Senha"
                size='small'
                name="confirmPassword"
                variant="outlined"
                required
                type='password'
                sx={{mr:1}}
                />
            </Grid> 
            </>)  }
            <Grid item>
                <Button type="submit" variant="contained" color={mode === 'delete' ? 'error': mode === 'post' ? 'primary': 'warning'}>{title}</Button>
                <Button sx={{ml:1}} variant="contained"  color='inherit' onClick={()=>dispatch(resetUser())}>Cancel</Button>
            </Grid>
        </Grid>
        <hr />
    </Box>

    )
}