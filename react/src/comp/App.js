// var React = require('react');
import React, {Component, PropTypes} from 'react';
import MemberList from './MemberList.js';
import Modal from './Modal.js';
import {connect} from 'react-redux';
import {openModal, closeModal, confirmModal} from '../actions';

class App extends Component{
    static displayName = 'App';
    static propTypes = {
        children: PropTypes.string
    };

    static childContextTypes = {
        dispatch: PropTypes.func.isRequired,
        openModal: PropTypes.func.isRequired,
        closeModal: PropTypes.func.isRequired,
        confirmModal: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    getChildContext() {
        // var {dispatch} = this.props;
        return {
            dispatch: this.props.dispatch,
            openModal: (options, cb) => {
                this.props.dispatch(openModal(options, cb))
            },
            closeModal: cb => this.props.dispatch(closeModal(cb)),
            confirmModal: (e) => {
                e.preventDefault();
                var eles = e.target.elements;
                var data = Object.keys(eles).reduce((a, b)=>{
                    if (!/^\d+$/.test(b) && (b !== 'length')) {
                        a[b] = eles[b].value;
                    }
                    return a;
                }, {})
                this.props.dispatch(confirmModal(data));
            }
        }
    }
    componentDidMount() {

    }
    render() {

        var {modal, list} = this.props;

        return (<div>
                <MemberList list={list} />
                {modal.show ?
                    <Modal {...modal} />
                    : ''
                }

            </div>
        );
    }
}

function mapState2Props(state) {
    return {
        modal: state.modal,
        list: state.list
    }
}

export default connect(mapState2Props)(App);
// window.React = React;