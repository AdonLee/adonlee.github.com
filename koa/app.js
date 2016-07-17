const koa = require('koa')

let app = koa()
app.use(function *(next) {
    let visitCount = 1
    
    this.body =  'hello world'
})

app.listen(54321)
