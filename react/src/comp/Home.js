import React from 'react'
import HomeBody from './HomeBody.js'

let data = [{
    type: 'text',
    content: 'this is text',
}]

export default class Home extends React.Component{

    render() {
        return (<div>
            <h2 className="hide">{this.props.title}</h2>
            <p>welcome to my home</p>
            {
                this.props.showBody && <HomeBody data={data}/>
            }
        </div>);
    }
}

