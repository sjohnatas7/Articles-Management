import React, { useState } from "react"
import { TextField, Box, Grid, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";

import ArticleModel from "../../../services/ArticleService";
import IArticle from "../../../types/ArticleInterface";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setArticlesData, resetArticles } from "../../../store/slices/articleSlice";

export default function FormsArticles(){
    const data = useAppSelector(state => state.articles.data)
    const title = useAppSelector(state => state.articles.title)
    const mode = useAppSelector(state => state.articles.mode)
    const allPaths = useAppSelector(state => state.categories.allPaths)
    const allUsers = useAppSelector(state => state.user.users)

    const dispatch = useAppDispatch()
    const { sendArticlesForms } = ArticleModel()

    
    function handleInput(e: React.ChangeEvent){
        const {value, name} = e.target as HTMLInputElement
        dispatch(setArticlesData({...data, [name]: value}))
    }
    

    function handleSubmit(e: React.FormEvent){
        e.preventDefault()
        const params:  { [key: string]: FormDataEntryValue } = {}
        const formData = new FormData(e.currentTarget as HTMLFormElement)
        formData.forEach((value, property:string) => params[property] = value);
        
        sendArticlesForms(params)
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
            <Grid item xs={12}>
                <TextField
                onChange={handleInput}
                fullWidth
                size='small'
                label="Titulo"
                variant="outlined"
                name="name"
                required
                value={data.name}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                onChange={handleInput}
                fullWidth
                size='small'
                label="Descrição"
                variant="outlined"
                name="description"
                required
                value={data.description}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                onChange={handleInput}
                fullWidth
                size='small'
                label="Imagem URL"
                variant="outlined"
                name="imageUrl"
                required
                value={data.imageUrl}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="filled-select-currency"
                    select
                    label="Categoria"
                    variant="outlined"
                    size="small"
                    value={data.categoryId || ''}
                    onChange={handleInput}
                    name='categoryId'
                    >
                        <MenuItem value=''></MenuItem>
                {allPaths.map((category, index) => (
                    <MenuItem key={index} value={category.id || ''}>
                    {category.path}
                    </MenuItem>
            ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="filled-select-currency"
                    select
                    label="Autor"
                    variant="outlined"
                    size="small"
                    value={data.userId || ''}
                    onChange={handleInput}
                    name='userId'
                    >
                    {allUsers.filter(user => user.admin).map((user, index) => (
                        <MenuItem key={index} value={user.id}>
                        {user.name}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="filled-select-currency"
                    label="Conteúdo"
                    variant="outlined"
                    multiline
                    size="small"
                    rows={20}
                    value={data.content || ''}
                    onChange={handleInput}
                    name='content'
                    >
                    {allUsers.filter(user => user.admin).map((user, index) => (
                        <MenuItem key={index} value={user.id}>
                        {user.name}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <Button type="submit" variant="contained" color={mode === 'delete' ? 'error': mode === 'post' ? 'primary': 'warning'}>{title}</Button>
                <Button sx={{ml:1}} variant="contained"  color='inherit' onClick={()=>dispatch(resetArticles())}>Cancel</Button>
            </Grid>
        </Grid>

        <hr />
    </Box>

    )
}