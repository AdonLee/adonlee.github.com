-- {
--     name: novelName,
--     desc: $('#intro').text().trim().split('\n').slice(0, -1).join('\n'),
--     author: author,
--     lastChapter: $infos.eq(3).text().split('：').pop(),
--     updateTime: $infos.eq(2).text().split('：').pop(),
--     len: newLen,
--     last: $chapter.last().text(),
--     time: Date.now(),
--     href: chapterUrl
-- }

DROP TABLE novel;
DROP TABLE chapter;
CREATE TABLE novel (
    id INTEGER,
    name VARCHAR(20),
    author VARCHAR(20),
    create_time DATETIME,
    source VARCHAR(50),
    desc VARCHAR(100));
CREATE TABLE chapter (
    id INTEGER,
    name VARCHAR(20),
    create_time DATETIME,
    update_time DATETIME,
    source VARCHAR(50),
    content TEXT,
    wordcnt INTEGER
);
CREATE UNIQUE INDEX novel_unique_idx ON novel(id);
CREATE UNIQUE INDEX chapter_unique_idx ON chapter(id);

INSERT INTO novel (id, name, author, create_date, source, desc) 
            VALUES (?id, ?name, ?author, strftime('%s','now')), ?href, ?desc)

INSERT INTO novel VALUES (
        ?id,
        ?name,
        ?author,
        strftime('%s','now'),
        ?href,
        ?desc
    )