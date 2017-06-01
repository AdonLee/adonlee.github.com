var jsdom = require('jsdom')

function scrab(url, done) {
    jsdom.env({
        url: url,
        scripts: ["http://cdn.bootcss.com/jquery/3.1.1/jquery.min.js"],
        // scripts: ["http://bower.yizhi.com/jquery/dist/jquery.js"],
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
        done: function(err, win) {
            if (err || !win) {
                console.log(err);
            }
            done(err, win, win.$)
        }
    })
}

function scrabNovel(novelId) {
    var url = `http://www.qu.la/book/${novelId}/`
    return new Promise((resolve, reject) => {
        scrab(url, function(err, win, $) {
            if (err) return reject(err)
            var chapterList = $('#list a').toArray()
            if (chapterList.length < 1) return reject({ status: 404 })

            var $infos = $('#info > p')
            var novelName = $('#info h1').text()
            var author = $infos.eq(0).text().split('：').pop()
            var desc = $('#intro').text().trim().split('\n').slice(0, -1).join('\n')

            chapterList = chapterList.map(link => {
                var $link = $(link)
                return {
                    novel_id: novelId,
                    chapter_id: $link.attr('href').split('.')[0],
                    name: link.textContent.trim(),
                    source: link.href
                }
            })
            resolve({
                name: novelName,
                novel_id: +novelId,
                source: url,
                author,
                desc,
                chapterList
            })
        })
    })

}

function scrabChapterList(bookId) {
    var url = `http://www.qu.la/book/${bookId}/`
    return new Promise((resolve, reject) => {
        scrab(url, function(err, win, $) {
            if (err) return reject(err)
            var chapterList = $('#list a').toArray()

            if (chapterList.length < 1) return reject({ status: 404 })

            chapterList = chapterList.map(link => {
                var $link = $(link)
                return {
                    novel_id: +bookId,
                    chapter_id: +$link.attr('href').split('.')[0],
                    name: link.textContent.trim(),
                    source: link.href
                }
            })
            resolve(chapterList)
        })
    })

}

function scrabChapterDetail(bookId, chapterId) {
    var url = `http://www.qu.la/book/${bookId}/${chapterId}.html`
    return new Promise((resolve, reject) => {
        scrab(url, function(err, win, $) {
            if (err) return reject(err)

            var chapterName = $('.bookname h1').text().trim()

            if (!chapterName) return reject({ status: 404 })

            $('#content').find('script').remove()
            var text = $('#content').html().trim()

            // text = text.split('<br><br>').slice(0, -1)
            //     .join('\n').replace(/&nbsp;/g, '')

            text = text.split('<br>').slice(0, -1)
                .map(item => item.trim())
                .filter(item => item.length > 0)
                .join('\n').replace(/&nbsp;/g, '')

            var navList = $('.bottem1 a')
                .filter((_, a) => {
                    return a.pathname.indexOf('/book/') > -1
                })
            var preChapter = navList.eq(0).attr('href').split('.')[0]
            var nextChapter = navList.eq(2).attr('href').split('.')[0]

            resolve({
                novel_id: +bookId,
                chapter_id: +chapterId,
                name: chapterName,
                source: url,
                content: text,
                wordcnt: text.length,
                pre_chapter: Number(preChapter) || 0,
                next_chapter: Number(nextChapter) || 0
            })
        })

    })
}

module.exports = { scrabChapterDetail, scrabChapterList, scrabNovel }
