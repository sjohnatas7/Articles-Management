const bcrypt = require('bcryptjs')

module.exports = app => {
    const {equalsOrError, existsOrError, notExistsOrError} = app.api.validation

    const encryptPasswword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password,salt)
    }

    const save = async (req,res) => {
        const user = {...req.body}
        if(req.params.id) user.id = req.params.id

        if(!req.originalUrl.startsWith('/users')) user.admin = false
        if(!req.user || !req.user.admin) user.admin = false

        try{
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.password, 'Senha não informado')
            existsOrError(user.confirmPassword, 'Confirmação da senha inválida')
            equalsOrError(user.password,user.confirmPassword,'Senhas não são as mesmas')

            const userFromDb = await app.db('users').where({email: user.email}).first()
            if(!user.id){
                notExistsOrError(userFromDb, 'Usuario já cadastrado')
            }
        }catch(msg){
            return res.status(400).send(msg)
        }
        user.password = encryptPasswword(req.body.password)
        delete user.confirmPassword 

        if(user.id){
            app.db('users')
                .update(user)
                .where({id: user.id})
                .whereNull('deleted_at')
                .then(()=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        }else{
            app.db('users')
                .insert(user)
                .then(()=>res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }
    const get = (req,res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .whereNull('deleted_at')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }
    const getById = (req,res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .where({'id': req.params.id})
            .whereNull('deleted_at')
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try{
            const articles = await app.db('articles').where({userId: req.params.id})
            notExistsOrError(articles, 'Não é possível deleter um usuário dono de artigos')

            const rowUpdated = await app.db('users')
                .update({'deleted_at': new Date()})
                .where({id: req.params.id})

            existsOrError(rowUpdated, 'Usuário não encontrado')
            res.status(204).send()
        }catch(msg){
            return res.status(500).send(msg)
        }
    }
    return { save , get, getById, remove}
}