const koa = require('koa')
const router = require('koa-router')();

let app = koa()

router.get('/', function*(next) {

    this.body = 'hello world'
    var type = typeof this.cookies.keys
    var cs = Object.keys(this.cookies.keys)
    yield next
    console.log('%s %s', this.method, this.url);
})

router.get('/', function* (next) {
    this.body += 'kjskdfj'
    yield next
})

app.use(router.routes())

app.listen(3000)
console.log('listen on 3000')
