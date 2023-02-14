import React, { useState } from "react"
import { TextField, Box, Grid, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";

import CategoryModel from "../../../../services/CategoryService";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { setCategoriesData, resetCategories } from "../../../../store/slices/categoriesSlice";

import "./Forms.css"


export default function Forms(){
    const data = useAppSelector(state => state.categories.data)
    const title = useAppSelector(state => state.categories.title)
    const mode = useAppSelector(state => state.categories.mode)
    const allPaths = useAppSelector(state => state.categories.allPaths)

    const dispatch = useAppDispatch()
    const { sendCategoriesForms } = CategoryModel()

    
    function handleInput(e: React.ChangeEvent){
        const {value, name} = e.target as HTMLInputElement
        dispatch(setCategoriesData({...data, [name]: value}))
    }
    

    function handleSubmit(e: React.FormEvent){
        e.preventDefault()
        const params:  { [key: string]: FormDataEntryValue } = {}
        const formData = new FormData(e.currentTarget as HTMLFormElement)
        formData.forEach((value, property:string) => params[property] = value);
        
        sendCategoriesForms(params)
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
                label="Categorias"
                variant="outlined"
                name="name"
                required
                value={data.name}
                />
            </Grid>
            <Grid item md={6} sm={12} >
            <TextField
                id="filled-select-currency"
                select
                label="Caminho"
                variant="outlined"
                size="small"
                value={data.parentId || ''}
                onChange={handleInput}
                name='parentId'
                >
                    <MenuItem value=''>
                        Nenhum
                    </MenuItem>
                {allPaths.map((option,index) => (
                    <MenuItem key={index} value={option.id}>
                    {option.path}
                    </MenuItem>
                ))}
                </TextField>
            </Grid>
            
            <Grid item>
                <Button type="submit" variant="contained" color={mode === 'delete' ? 'error': mode === 'post' ? 'primary': 'warning'}>{title}</Button>
                <Button sx={{ml:1}} variant="contained"  color='inherit' onClick={()=>dispatch(resetCategories())}>Cancel</Button>
            </Grid>
        </Grid>
        <hr />
    </Box>

    )
}