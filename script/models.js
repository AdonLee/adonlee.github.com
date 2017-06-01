var Sequelize = require('sequelize')

const { STRING, INTEGER, TEXT, BOOLEAN } = Sequelize

var sequelize = new Sequelize('yizhi', 'nimei', '', {
    // host: 'localhost',
    dialect: 'sqlite',
    storage: require('path').resolve(__dirname, '../data/db/yizhi.sqlite')
})

var Novel = sequelize.define('novel', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    novel_id: {
        type: INTEGER.UNSIGNED,
        unique: true,
    },
    name: {
        type: STRING
    },
    author: {
        type: STRING
    },
    desc: {
        type: STRING
    },
    source: {
        type: STRING
    },
    offline: {
        type: BOOLEAN
    }
})
var Chapter = sequelize.define('chapter', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    novel_id: {
        type: INTEGER.UNSIGNED,
        unique: 'same_novel',
        references: {
            model: Novel,
            key: 'novel_id'
        }
    },
    chapter_id: {
        type: INTEGER.UNSIGNED,
        unique: 'same_novel'
    },
    pre_chapter: {
        type: INTEGER.UNSIGNED
    },
    next_chapter: {
        type: INTEGER.UNSIGNED
    },
    name: {
        type: STRING
    },
    content: {
        type: TEXT
    },
    wordcnt: {
        type: INTEGER.UNSIGNED
    },
    readed: {
        type: BOOLEAN,
        defaultValue: false
    },
    source: {
        type: STRING
    }
})

// Novel.sync({ force: true }).then(function() {
//     console.log('sync novel')
//     var chapterInfo = require('../data/book/chapterInfo.json')
//     Object.keys(chapterInfo).map((id, index) => {
//         let { id: novel_id, name, author, desc, href: source } = chapterInfo[id]
//         Novel.create({
//             novel_id,
//             name,
//             author,
//             desc,
//             source
//         })
//     })

//     Novel.findAll().then(novelList => {
//         novelList.map(novel => {
//             novel && console.log(novel.name)
//         })
//     })
// })

// Chapter.sync({ force: true }).then(function() {
//     console.log('sync chapter')

// })

module.exports.getNovel = novel_id => Novel.findOne({ where: { novel_id } })
    // .then(result => result ? result.dataValues : result)
module.exports.getNovelList = () => Novel.findAll()
module.exports.getChapterList = novelId => Chapter.findAll({ where: { 'novel_id': novelId } })
module.exports.getChapter = (novel_id, chapter_id) => Chapter.findOne({ where: { novel_id, chapter_id } })
module.exports.addNovel = novel => Novel.upsert(novel)
module.exports.addChapter = chapter => Chapter.create(chapter)
module.exports.updateChapter = (chapter, fields) => Chapter.update(chapter, { fields, where: { novel_id: chapter.novel_id, chapter_id: chapter.chapter_id } })
module.exports.addChapters = chapters => Chapter.bulkCreate(chapters, { ignoreDuplicates: true })
module.exports.toggleNovelStatus = (novel, status) => {
    // var novelId = novel.novel_id || novel
    // Novel.
}


// var db = new sqlite.Database(require('path').resolve(__dirname, '../data/db/yizhi.db'))
// db.serialize(function() {
//     var statmnt = db.prepare(`INSERT INTO novel VALUES (?, ?, ?, strftime('%s','now'), ?, ?)`)
//     for (let novelId in chapterInfo) {
//         let { id, name, author, href, desc } = chapterInfo[novelId]
//         statmnt.run(id, name, author, href, desc, function(err) {
//             if (err) console.log(err)
//             else console.log('add ', chapterInfo[novelId])
//         })
//     }


//     statmnt.finalize()

// })

// db.close()