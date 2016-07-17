#!node
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Home from './src/comp/Home.js'

let result = ReactDOMServer.renderToStaticMarkup(
    <Home title="title" showBody={true} />
)

console.log(result)

