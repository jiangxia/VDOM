import {updateProps} from './handleProps';
import {addEventListeners} from './handleEvent';
/**
 * vnode model
 * @param {} type 
 * @param {*} props 
 * @param {*} children 
 */

export function vnode (type, props, ...children) {
    return {type, props, children};
}


/**
 * 创建虚拟节点
 * @param {*} node 
 */
export function createElement(node) {
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }
    const $el = document.createElement(node.type);
    updateProps($el, node.props);
    addEventListeners($el, node.props);
    // bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用 。
    let appendChild = $el.appendChild.bind($el);
    node.children
        .map(createElement)
        .map(appendChild);
    return $el;
}
