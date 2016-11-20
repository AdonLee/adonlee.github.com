if (process.cwd() !== __dirname) {
    console.log(`Change from ${process.cwd()} to ${__dirname}`)
    process.chdir(__dirname)
}
var jsdom = require('jsdom')
var fs = require('fs')
var path = require('path')
var childProcess = require('child_process')
var bookVault = '../data/book';
var logPath = path.resolve(bookVault, 'check.log');
var chapterInfoPath = path.resolve(bookVault, 'chapterInfo.json')
var chapterInfo = require(chapterInfoPath)
var novelIdList = Object.keys(chapterInfo)

;
(function() {

    // record for summary
    fs.writeFileSync(logPath, '\n' + new Date().toISOString(), { flag: 'a' })

    novelIdList = novelIdList.length ? novelIdList : [635, 3590, 168, 3598, 285]

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
        `<title>Novel List</title><div style="width:650px;margin:50px auto">
            <body style="background:ivory">
                <h2>Novel List</h2>
                ${novelListText}
            </body>
        </div>`
    )

    // Update novel info
    console.log('write to chapterInfo.json');
    fs.writeFileSync(
        chapterInfoPath,
        JSON.stringify(chapterInfo, null, 4)
    )

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
                <body style="background:ivory">
                    <div style="width:650px;margin:50px auto">
                        <h2>${novelName}</h2>
                        <h3>${author}</h3>
                        <ol>\n${chapterListText}\n</ol>
                    </div>
                </body>
                `
            )

            if (newLen - oldLen > 5) oldLen = newLen - 5;

            for (var i = oldLen; i < newLen; i++) {
                scrabChapterDetail($chapters.eq(i).prop('href'))
            }


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
        } else if (newLen < oldLen) {
            oldLen = newLen - 1
        } else {
            novelName = novelName + ' '.repeat(10 - novelName.length * 2)
            console.log(`Novel ${novelName} - ${new Date(chapter.time||null).toISOString()} - 最新 ${chapter.last}`);
        }

        // setTimeout(checkUpdate, 5000);
        checkUpdate()
    })
}

function scrabChapterDetail(href) {
    scrab(href, function(err, win, $) {
        if (err) return

        var chapterName = $('.bookname h1').text().trim()

        $('#content').find('script').remove()
        var text = $('#content').html().trim()
        if (!text) return console.log('Empty Chapter: ' + chapterName);
        var navText = $('.bottem2 a')
            .toArray()
            .filter(a => a.pathname.indexOf(bookVault) > -1)
            .map(a => {
                var href = a.pathname.split('/').pop() || 'index.html';
                return `<a href="${href}">${a.textContent}</a>`
            })
            .join('\t\n')

        var content = `<title>${chapterName}</title>
        <body style="background:ivory">
            <div style="width:650px;margin:50px auto">
                <nav>${navText}</nav>
                <h2>${chapterName}</h2>
                ${text}
                <p>
                <nav>${navText}</nav>
            </div>
        </body>`

        // cut '/book/'
        var savePath = path.resolve(bookVault, win.location.pathname.slice(6))

        fs.writeFileSync(savePath, content)

        childProcess.exec(`open http://project.yizhi.com/yizhi/novel/${savePath}`)

    })
}

function scrab(url, done) {
    jsdom.env({
        url: url,
        scripts: ["http://bower.yizhi.com/jquery/dist/jquery.js"],
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
