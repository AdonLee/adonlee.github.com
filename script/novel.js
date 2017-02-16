#!/usr/local/bin/node

var verbose = process.argv.includes('-v')
verbose = verbose || process.argv.includes('--version')
var silent = process.argv.includes('--silent')
var debug = process.execArgv.join('').indexOf('--debug-brk') > -1

if (process.cwd() !== __dirname) {
    verbose && console.log(`Change from ${process.cwd()} to ${__dirname}`)
    process.chdir(__dirname)
}
var jsdom = require('jsdom')
var fs = require('fs')
var path = require('path')
var childProcess = require('child_process')
var bookVault = '../data/book';
var logPath = path.join(bookVault, 'check.log');
var chapterInfoPath = path.join(bookVault, 'chapterInfo.json')
var chapterInfo = require(chapterInfoPath)
var novelIdList = Object.keys(chapterInfo)

;
(function() {

    // record for summary
    debug || fs.writeFileSync(logPath, '\n' + new Date().toISOString(), { flag: 'a' })

    novelIdList = novelIdList.length ? novelIdList : [635, 3590, 168, 3598, 285, 18923]

    checkUpdate()
})()

// novelIdList.map(novelID => new Promise((resolve, reject) => {

// }))
function checkUpdate() {
    var novel = novelIdList.pop()

    if (novel) return scrabChapterList(novel)

    // Generate novel list by chapter info
    var novelListText = Object.keys(chapterInfo)
        .map(novelID => {
            var novelInfo = chapterInfo[novelID]
            novelInfo.href_local = novelInfo.href.split('book/').pop()
            return `<li>
                <div>
                    <p><a href="${novelID}/index.html">${novelInfo.name}</a>--${novelInfo.author}</p>
                    <p><a href="${novelInfo.href_local}">${novelInfo.lastChapter}</a> | ${novelInfo.updateTime}</p>
                </div>
            </li>`
        })
        .join('\t\n')

    // update novel list page
    fs.writeFileSync(
        path.resolve(bookVault, 'index.html'),
        `<title>Novel List</title>
        <link href="./index.css" rel="stylesheet">
        <body>
            <div class="container">
                <h2>Novel List</h2>
                ${novelListText}
            </div>
        </body>`
    )

    // Update novel info
    verbose && console.log('write to chapterInfo.json');
    fs.writeFileSync(
        chapterInfoPath,
        JSON.stringify(chapterInfo, null, 4)
    )

    var maxims = require('../data/maxim.json')
    var rdNum = Math.floor(Math.random() * maxims.length)
    var maxim = maxims[rdNum].content
    console.log(maxim)


}

function scrabChapterList(novel) {
    var url = `http://www.qu.la/book/${novel}/`
    scrab(url, function(err, win, $) {
        if (err) return checkUpdate()

        var $chapters = $('#list a')
        var $infos = $('#info > p')
        var novelName = $('#info h1').text()
        var author = $infos.eq(0).text().split('：').pop()
        var chapter = chapterInfo[novel] || {}
        var oldLen = chapter.len || 0
        var newLen = $chapters.length

        if (newLen < oldLen) {
            oldLen = newLen - 1
        }

        if (newLen > oldLen) {
            var $chapter = $chapters.eq(oldLen)
            var chapterUrl = $chapter.prop('href');
            console.warn(`Novel ${novelName} - ${$chapter.text()} - ${chapterUrl} 有更新`)

            // creat the novel directory if not exists
            var bookDir = path.resolve(bookVault, novel)
            if (!fs.existsSync(bookDir))
                fs.mkdirSync(bookDir)

            var chapterListText = $chapters
                .toArray().reverse()
                .map(chapter => {
                    var href = chapter.href
                    var chapterName = chapter.textContent
                    href = href.split('/').pop()
                    return `\t<li><a href="${href}">${chapterName}</a></li>`

                })
                .join('\n')

            fs.writeFileSync(
                path.resolve(bookDir, `index.html`),
                `<title>${novelName}</title>
                <link href="../index.css" rel="stylesheet">
                <body>
                    <div class="container">
                        <h2>${novelName}</h2>
                        <h3>${author}</h3>
                        <ol>\n${chapterListText}\n</ol>
                    </div>
                </body>`
            )

            if (newLen - oldLen > 5) oldLen = newLen - 5;

            for (var i = oldLen; i < newLen; i++) {
                scrabChapterDetail($chapters.eq(i).prop('href'), silent)
            }

            // update nav of lastest chapter when chapterList updated
            chapter.href && scrabChapterDetail(chapter.href, true)


            chapterInfo[novel] = {
                name: novelName,
                desc: $('#intro').text(),
                author: author,
                lastChapter: $infos.eq(3).text().split('：').pop(),
                updateTime: $infos.eq(2).text().split('：').pop(),
                len: newLen,
                last: $chapter.last().text(),
                time: Date.now(),
                href: chapterUrl
            }
        } else {
            novelName = novelName + ' '.repeat(15 - novelName.length * 2)
            verbose && console.log(`Novel ${novelName} - ${new Date(chapter.time||null).toISOString()} - 最新 ${chapter.last}`);
        }

        // setTimeout(checkUpdate, 5000);
        checkUpdate()
    })
}

function scrabChapterDetail(href, justUpdate) {
    scrab(href, function(err, win, $) {
        if (err) return

        var chapterName = $('.bookname h1').text().trim()

        $('#content').find('script').remove()
        var text = $('#content').html().trim()

        if (!text) return verbose && console.log('Empty Chapter: ' + chapterName);

        text = text.split('<br><br>').slice(0, -1)
            .join('</p>\n<p>').replace(/&nbsp;/g, '')

        var navList = $('.bottem1 a')
            .toArray()
            .filter(a => a.pathname.indexOf('/book/') > -1)
            .map(a => ({ href: a.pathname.split('/').pop() || 'index.html', title: a.textContent }))

        var navText = navList
            .map(nav => `<a href="${nav.href}">${nav.title}</a>`)
            .concat(`<a href="${href}">源网址</a>`)
            .join('\t\n')

        var content = `<title>${chapterName}</title>
        <link href="../index.css" rel="stylesheet">
        <script>
        document.onkeyup = function(e){
            var href = ({
                37: '${navList[0].href}',
                39: '${navList[2].href}'
            })[e.keyCode]
            if (href) location.href = href
        }
        </script>
        <body>
            <div class="container">
                <nav>${navText}</nav>
                <h2>${chapterName}</h2>
                <p>${text}</p>
                <p>
                <nav>${navText}</nav>
            </div>
        </body>`

        // cut '/book/'
        var savePath = path.join(bookVault, win.location.pathname.slice(6))

        fs.writeFileSync(savePath, content)

        justUpdate || childProcess.exec(`open ../data/${savePath}`)

    })
}

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


// var mongoose = require('mongoose')

// var userScheme = mongoose.Schema({
//     nickname: String,
//     city: String,
//     age: String,
//     bigphoto: String
// }, {
//     // collection: 'User'
// })


// var db = mongoose.createConnection('localhost', 'plato')
//     .on('error', err=>console.log(err))
//     .once('open', () => {
//         console.log('open');

//         var User = db.model('User', userScheme)
//         User.find({}, {
//                 nickname: true,
//                 city: true,
//                 age: true,
//                 bigphoto: true
//             })
//             // .limit(10)
//             // .exec((err, girls) => {
//             //     if (err) return console.log(err);
//             //     console.log(girls);
//             // })
//             .count((err, count) => {
//                 console.log(err, count);
//             })
//             .then(() => {
//                 mongoose.disconnect(() => {
//                     console.log('disconnect');
//                 })
//             })

//     })



// mongoose.model('novels', {
//     id: Number,
//     name: String,
//     author: String,
//     desc: String
// })
