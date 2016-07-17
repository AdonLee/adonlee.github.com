// let emptyFunc = ()=>{};
export function closeModal() {
    return {type: 'close_modal'};
}
export function openModal(options = {}) {
    return {type: 'open_modal', options};
}
export function confirmModal(data) {
    return {type: 'confirm_modal', data};
}
export function addItem(data) {
    return {type: 'add_item', data};
}
export function rmItem(index) {
    return {type: 'rm_item', index};
}
export function editItem(index, data) {
    return {type: 'edit_item', index, data};
}