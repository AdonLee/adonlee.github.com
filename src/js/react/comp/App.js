// var React = require('react');
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {openModal, closeModal, confirmModal} from '../actions';

class App extends Component{
    static displayName = 'App';
    static propTypes = {
        children: PropTypes.string,
        dispatch: PropTypes.func,
        list: PropTypes.array
    };

    static childContextTypes = {
    };

    constructor(props) {
        super(props);
    }

    getChildContext() {
        // var {dispatch} = this.props;
        return {
        }
    }
    componentDidMount() {

    }
    render() {

        var {list=[]} = this.props;

        return (<div>
            <table className="table table-striped">
            <caption>TODO LIST<button className="glyphicon glyphicon-plus pull-right" onClick=""/></caption>
            <tbody>
                {list.map((item, index) =>
                <tr key={index} className="">
                    <td className="">{item.content}</td>
                    <td className="">{item.create_time}</td>
                    <td className="">
                        <div className="pull-right">
                            <span className="glyphicon glyphicon-minus"/>
                            <span className="glyphicon glyphicon-hand-up"/>
                            <span className="glyphicon glyphicon-hand-down"/>
                        </div>
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
        );
    }
}

function mapState2Props(state) {
    return {
        list: state.list
    }
}

export default connect(mapState2Props)(App);
