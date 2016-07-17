import {combineReducers} from 'redux';

const defaultModal = {
    show: false,
    title: 'modal title',
    maskClose: false,
    content: '',
    action: {
        confirm: {
            text: '确认',
            handler: function() {}
        },
        cancel: {
            text: '取消',
            handler: function() {}
        }
    }
};
const defaultList = [
    {name: 'zawa', gender:'male', age: 23, addTime: new Date().toLocaleString()},
    {name: 'wuge', gender:'male', age: 24, addTime: new Date().toLocaleString()},
    {name: 'zhejie', gender:'female', age: 25, addTime: new Date().toLocaleString()}
];

function modal(state = defaultModal, action) {
    // 不要直接修改state, 否知组件不更新！！！
    // 不要直接修改state, 否知组件不更新！！！
    // 不要直接修改state, 否知组件不更新！！！
    let newState = Object.assign({}, state);

    switch(action.type) {
        case 'open_modal':
            $.extend(true, newState, action.options, {show: true})
            newState.content = action.options.content;
            // Object.assign(newState, action.options, {show: true})
            // var {confirm, cancel} = newState.action;
            // var {confirm: newConfirm, cancel: newCancel} = action.options.action;
            // newConfirm && Object.assign(confirm, newConfirm);
            // newCancel && Object.assign(cancel, newCancel);
            break;
        case 'close_modal':
            newState.action.cancel.handler();
            newState.show = false;
            break;
        case 'confirm_modal':
            newState.show = newState.action.confirm.handler(action.data) === true;
            break;
    }
    return newState;
}

function list(state = defaultList, action) {
    var {type, data, index} = action;
    var newState = [...state];
    data && (data.addTime = new Date().toGMTString());
    switch(type) {
        case 'add_item':
            data = Object.assign({}, data)
            newState.push(data);
            break;
        case 'rm_item':
            newState.splice(index, 1);
            break;
        case 'edit_item':
            newState.splice(index, 1, data);
    }
    return newState;
}

export default combineReducers({
    modal,
    list
})