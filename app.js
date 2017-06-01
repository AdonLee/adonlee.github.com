var express = require('express')
var models = require('./script/models.js')
var scraper = require('./script/scraper.js')

var app = express()

// app.use(express.static('dist'))

var router = express.Router()

router.get('/dist', express.static('dist'))

router.get('/', (request, response, next) => response.redirect('/index.html'))
router.get('/book', function(request, response, next) {
    models.getNovelList().then(novelList => {
        response.json(novelList)
    }, err => {
        response.json(err)
    })

})
router.get('/book/:bookId', function(request, response, next) {
    var novelInfo = null
    var bookId = request.params.bookId
    models.getNovel(bookId).then(novel => {
        if (novel === null) return Promise.reject()
        return novel.dataValues
    }).then(
        novel => {
            novelInfo = novel
            return models.getChapterList(bookId)
        }
    ).then(
        chapterList => {
            if (chapterList.length > 0) {
                novelInfo.chapterList = chapterList
                return novelInfo
            }
            novelInfo = null
            return scraper.scrabNovel(bookId)

        },
        () => scraper.scrabNovel(bookId)
    ).then(
        novel => {
            response.json(novel)
            if (novelInfo) return

            models.addNovel(novel)
                .then(() => models.addChapters(novel.chapterList))
                .error(err => console.log(err))
        },
        err => response.json(err)
    )
})
router.get('/book/:bookId/:chapterId', function(request, respond, next) {
    let { bookId, chapterId } = request.params
    models.getChapter(bookId, chapterId).then(chapter => {
        if (chapter && chapter.content) return chapter
        return scraper.scrabChapterDetail(bookId, chapterId).then(chapter => {
            chapter.readed = true
            models.updateChapter(chapter, ['wordcnt', 'pre_chapter', 'next_chapter', 'content', 'readed']).error(a => {
                console.log(a)
            })
            return chapter
        })

    }).then(chapter => {
        if (!chapter.readed) {
            chapter.readed = true
            models.updateChapter(chapter, ['readed'])
        }
        respond.json(chapter)
    }, err => {
        respond.json(err)
    })

})
router.get('*', function(request, response) {
    if (/^\/(css|data|dist)/.test(request.path) || request.path.endsWith('.html'))
        return response.sendFile(__dirname + request.path)
    console.log(request.path)
    response.status(404).send('[404] nothing found!')
})
app.use(router)
app.listen(3000)
console.log('listening 3000')