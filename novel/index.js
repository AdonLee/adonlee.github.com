var jsdom = require('jsdom')
var path = require('path')
var chapterInfo = require('./chapterInfo.json')
var novelIdList = Object.keys(chapterInfo)
novelIdList = novelIdList.length ? novelIdList : [635, 3590, 168, 3598, 285]
var file = process.argv[1]
var filePath = path.dirname(path.resolve(process.cwd(), file))

function parseChapterSequence(chapterName) {
    const NUMBER_ZH = '一二三四五六七八九十百千万'
    chapterName.split('').map(item => {
        return NUMBER_ZH.indexOf(item) < 0 ? '' : item
    }).join('')
}

function checkUpdate() {
    var novel = novelIdList.pop()
    if (!novel) {
        // window.close()
        console.log('write to chapter.json');
        require('fs').writeFileSync(path.join(filePath, './chapterInfo.json'), JSON.stringify(chapterInfo, null, 4))
        return
    }
    var url = `http://www.biquge.la/book/${novel}/`
    // console.log('loading', url);
    jsdom.env({
        url: url,
        scripts: ["http://bower.yizhi.com/jquery/dist/jquery.js"],
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
        done: function(err, win) {
            if (err || !win) {
                console.log(err);
                // setTimeout(checkUpdate, 5000);
                checkUpdate()
            }
            var $ = win.$
            var $chapters = $('#list a')
            var novelName = $('#info h1').text()
            var chapter = chapterInfo[novel] || {}
            var oldLen = chapter.len || 0
            if ($chapters.length > oldLen) {
                var $chapter = $chapters.eq(oldLen)
                console.warn(`Novel ${novelName} - ${$chapter.text()} - ${$chapter.prop('href')} 有更新`)
                require('child_process').exec(`open ${$chapter.prop('href')}`)
                chapterInfo[novel] = {
                    name: novelName,
                    len: $chapters.length,
                    last: $chapter.last().text(),
                    time: Date.now(),
                    href: $chapter.prop('href')
                }
            } else {
                novelName = novelName + ' '.repeat(10 - novelName.length*2)
                console.log(`Novel ${novelName} - ${new Date(chapter.time||null).toISOString()} - 最新 ${chapter.last}`);
            }

            // setTimeout(checkUpdate, 5000);
            checkUpdate()
        }
    })
}

// return console.log(require('jsdom').jsdom('<p>sdjksfj</p>').querySelector("p").textContent);
require('child_process').exec(`echo ${new Date().toISOString()} >> ${path.join(filePath, './check.log')}`)
checkUpdate()

// novelIdList.map(novelId => new Promise(resolve =>
//     require('request')(`http://www.biquge.la/book/${novelId}/`, function(err, response, body) {
//         if (err || response.statusCode !== 200) resolve({})
//         var doc = jsdom(body)

//     })
// ))

// console.log('loading', 'http://www.biquge.la/book/3598/');
// jsdom.env({
//     url: 'http://www.biquge.la/book/3598/',
//     scripts: ["http://code.jquery.com/jquery.js"],
//     done: function(err, win) {
//         var $ = win.$
//         var chapters = $('#list a').toArray().map(function(item) {
//             var $this = $(item);
//             return {
//                 chapter: $this.text(),
//                 url: $this.prop('href')
//             };
//         })
//         win.close()
//         console.log('write to chapter.json');
//         require('fs').writeFileSync('chapter.json', JSON.stringify(chapters, null, 4))
//         console.log(chapters.pop());
//     }
// })

// console.log('loading', 'http://www.biquge.la/book/3598/7545484.html');
// jsdom.env({
//     url: 'http://www.biquge.la/book/3598/7545484.html',
//     scripts: ['http://code.jquery.com/jquery.js'],
//     done: function(err, win) {
//         err && console.log(err);
//         var $ = win.$
//         console.log('write to shisha.txt');
//         require('fs').writeFileSync('shisha.txt', $('#content').text());
//         win.close()
//     }
// })


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

