// var React = require('react');
import React, {Component, PropTypes} from 'react';
import {rmItem, editItem} from '../actions.js';
import AddForm from './AddForm.js';

class MemberItem extends Component {
    static propTypes = {
        info: PropTypes.object,
        index: PropTypes.number.isRequired
    };

    static contextTypes = {
        dispatch: PropTypes.func.isRequired,
        openModal: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this);
        this.remove = this.remove.bind(this);
    }

    edit(index) {
        return () =>
            this.context.openModal({
                title: 'Edit Item',
                content: <AddForm {...this.props.info} />,
                action: {
                    confirm: {
                        handler: (data)=>
                            setTimeout(()=>this.context.dispatch(editItem(index, data)), 0)
                    }
                }
            });
    }

    remove(index) {
        return ()=>this.context.dispatch(rmItem(index));
    }

    render() {
        var {info, index} = this.props;
        var {name, gender, age, addTime} = info;
        return (<tr>
                <td>{name}</td><td>{gender}</td><td>{age}</td><td>{addTime}</td>
                <td>
                    <div className="btn-group">
                        <button className="btn btn-success btn-sm" onClick={this.edit(index)}>edit</button>
                        <button className="btn btn-danger btn-sm" onClick={this.remove(index)}>del</button>
                    </div>
                </td>
            </tr>);
    }

}
export default MemberItem;
