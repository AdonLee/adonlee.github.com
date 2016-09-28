import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

class Modal extends Component {

    static propTypes = {
        action: PropTypes.shape({
            confirm: PropTypes.shape({
                text: PropTypes.string.isRequired,
                handler: PropTypes.func.isRequired
            }).isRequired,
            cancel: PropTypes.shape({
                text: PropTypes.string.isRequired,
                handler: PropTypes.func.isRequired
            }).isRequired
        }).isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.any,
        maskClose: PropTypes.bool.isRequired
    };

    static contextTypes = {
        closeModal: PropTypes.func.isRequired,
        confirmModal: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        var {action, title, content} = this.props;
        var {cancel, confirm} = action;
        return (<div className="pop-box">
            <form className="panel panel-default pop-panel" onSubmit={this.context.confirmModal}>
                <div className="panel-heading" style={{textAlign: 'center'}}><span>{title}</span></div>
                <div className="panel-body">{content}</div>
                <div className="panel-footer clearfix">
                    <div className="btn-group pull-right">
                        <input className="btn btn-default" type="button" onClick={this.context.closeModal} value={cancel.text} />
                        <input className="btn btn-primary" type="submit" value={confirm.text} />
                    </div>
                </div>
            </form>
        </div>);
    }
}

function mapState2Props(state) {
    return {

    }
}

export default connect(mapState2Props)(Modal);
