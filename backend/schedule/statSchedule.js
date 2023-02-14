const schedule = require('node-schedule')

module.exports = app => {
    schedule.scheduleJob('*/60 * * * *', async function() {    
        const users = await app.db('users').whereNull('deleted_at').count('id').first()
        const categories = await app.db('categories').count('id').first()
        const articles = await app.db('articles').count('id').first()

        const { Stat } = app.api.stat
        
        const lastStat = await Stat.findOne({}, {}, {sort: {'createdAt':-1}})
        const stat = new Stat({
            users: users.count,
            categories: categories.count,
            articles: articles.count,
            createdAt: new Date()
        })

        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeCategories = !lastStat || stat.categories !== lastStat.categories
        const changeArticles = !lastStat || stat.articles !== lastStat.articles

        if(changeArticles || changeCategories || changeUsers){
            stat.save().then(() => console.log("Estatisticas atualizadas"))
        }
    })
} 