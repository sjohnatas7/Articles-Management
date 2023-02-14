module.exports = middleaware => {
    return (req,res,next) => {
        if(req.user.admin){
            middleaware(req,res,next)
        }else{
            res.status(401).send('Autorização inválida')
        }
    }
}