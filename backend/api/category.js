module.exports = app => {
    const {notEqualsOrError, existsOrError, notExistsOrError} = app.api.validation

    const save = (req,res) => {
        const category = {
            id: req.body.id,
            name: req.body.name,
            parentId: req.body.parentId || null,
        }
        if(req.params.id) category.id = req.params.id

        try{
            existsOrError(category.name, 'Nome não informado')
            notEqualsOrError(+category.id,category.parentId,'A categoria não pode ter o mesmo id e parentId')
        }catch(msg){
            return res.status(400).send(msg)
        }

        if(category.id){
            return app.db('categories')
                .update(category)
                .where({id: category.id})
                .then(()=>res.status(204).send())
                .catch(err => res.status(500).send(err))
        }else{
            return app.db('categories')
                .insert(category)
                .then(res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }
    const remove = async(req,res) => {
        try{
            existsOrError(req.params.id, 'Código da categoria não informado')

            const subcategories = await app.db('categories')
                .where({parentId: req.params.id})
            notExistsOrError(subcategories, 'Categoria possui subcategorias')

            const articles = await app.db('articles')
                .where({categoryId: req.params.id})
            notExistsOrError(articles, 'Categoria possui artigos')

            const rowsDeleted = await app.db('categories')
                .where({id: req.params.id}).del()
            existsOrError(rowsDeleted, 'Categoria não encontrada')

            res.status(204).send()

        }catch(msg){
            return res.status(400).send(msg)
        }
    }

    const withPath = categories => {
        const getParent = (categories, parentId) => {
            const parent = categories.filter(parent => parent.id === parentId)
            return parent.length ? parent[0] : null
        }

        const categoriesWithPath = categories.map(category => {
            let path = category.name
            let parent = getParent(categories, category.parentId)

            while (parent){
                path = `${parent.name} > ${path}`
                parent = getParent(categories, parent.parentId) 
            }
            return {...category,path}
        })

        categoriesWithPath.sort((a,b)=>{
            if(a.path < b.path) return -1
            if(a.path > b.path) return 1
            return 0
        })
        return categoriesWithPath
    }

    const get = (req, res) => {
        return app.db('categories')
            .select('name','id','parentId')
            .then(categories => res.json(withPath(categories)))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req,res) => {
        return app.db('categories')
            .select('name','id','parentId')
            .where({id: req.params.id})
            .first()
            .then(category => res.json(category))
            .catch(err => res.status(500).send(err))
    }

    const toTree = (categories, tree) => {
        if(!tree){
            tree = categories.filter(category => !category.parentId)
        }

        tree = tree.map(parentNode => {
            const isChild = node => node.parentId == parentNode.id
            parentNode.children = toTree(categories, categories.filter(isChild))
            return parentNode
        })

        return tree
    }

    const getTree = (req, res) => {
        app.db('categories')
            .then(categories => res.json(toTree(categories)))
            .catch(err => res.status(500).send(err))
    }

    return { get, getById, remove, save, getTree }
}