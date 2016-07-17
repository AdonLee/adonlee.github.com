import React, {Component, PropTypes} from 'react';
import MemberItem from './MemberItem.js';
import AddForm from './AddForm.js';
import {addItem} from '../actions.js';

class MemberList extends Component {
    static displayName = 'MemberList';
    static propTypes = {
        list: PropTypes.array.isRequired
    };
    static contextTypes = {
        openModal: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired
    };
    static childContextTypes = {

    };
    constructor(props) {
        super(props);
        this.showAddForm = this.showAddForm.bind(this);
    }

    showAddForm() {
        this.context.openModal({
            title: 'Add Item',
            content: <AddForm/>,
            action: {
                confirm: {
                    handler: (data)=>
                        setTimeout(
                            ()=>this.context.dispatch(addItem(data)),
                            0)
                }
            }
        })
    }

    render() {
        var {list} = this.props;
        return (<div className="panel panel-warning">
            <div className="panel-body">
                <button className="btn btn-primary" onClick={this.showAddForm}>Add New</button>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Add time</th>
                            <th>Action</th>
                        </tr>
                        {list.map(function(item, index) {
                            return <MemberItem key={index} index={index} info={item} />;
                        }, this)
                        }
                    </tbody>
                </table>
            </div>
        </div>);
    }
}

export default MemberList;