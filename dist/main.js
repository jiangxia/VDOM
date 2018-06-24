/* fed123.com */
'use strict';

function isEventProp(name) {
    return (/^on/.test(name)
    );
}

function extractEventName(name) {
    return name.slice(2).toLowerCase();
}

function addEventListeners($target, props) {
    Object.keys(props).forEach(function (name) {
        if (isEventProp(name)) {
            $target.addEventListener(extractEventName(name), props[name]);
        }
    });
}

function isCustomProp(name) {
    return isEventProp(name) || name === "forceUpdate";
}

function updateProps($target, newProps) {
    var oldProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var props = Object.assign({}, oldProps, newProps);
    Object.keys(props).forEach(function (name) {
        updateProp($target, name, newProps[name], oldProps[name]);
    });
}

function setProp($target, name, value) {
    if (isCustomProp(name)) return;
    if (typeof value === "boolean") {
        handleBooleanProp($target, name, value);
    }
    $target.setAttribute(name, value);
}

function removeProp($target, name, value) {
    if (isCustomProp(name)) {
        return;
    }
    if (typeof value === 'boolean') {
        $target[name] = false;
    }
    $target.removeAttribute(name);
}

function updateProp($target, name, newVal, oldVal) {
    if (!newVal) {
        removeProp($target, name, oldVal);
    } else if (!oldVal || newVal !== oldVal) {
        setProp($target, name, newVal);
    }
}

/**
 * vnode model
 * @param {} type 
 * @param {*} props 
 * @param {*} children 
 */

function vnode(type, props) {
    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
    }

    return { type: type, props: props, children: children };
}

/**
 * 创建虚拟节点
 * @param {*} node 
 */
function createElement(node) {
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }
    var $el = document.createElement(node.type);
    updateProps($el, node.props);
    addEventListeners($el, node.props);
    // bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用 。
    var appendChild = $el.appendChild.bind($el);
    node.children.map(createElement).map(appendChild);
    return $el;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * 更新元素
 * @param {}  
 * @param {*} newNode 
 * @param {*} oldNode 
 * @param {*} index 
 */
function updateElement($parent, newNode, oldNode) {
    var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    if (!oldNode) {
        $parent.appendChild(createElement(newNode));
    } else if (!newNode) {
        $parent.removeChild($parent.childNodes[index]);
    } else if (changed(newNode, oldNode)) {
        $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
    } else if (newNode.type) {
        var newLength = newNode.children.length;
        var oldLength = oldNode.children.length;
        for (var i = 0; i < newLength || i < oldLength; i++) {
            updateProps($parent.childNodes[index], newNode.props, oldNode.props);
            updateElement($parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
        }
    }
}
/**
 * 检查变化
 * @param {} node1 
 * @param {*} node2 
 */
function changed(node1, node2) {
    return (typeof node1 === 'undefined' ? 'undefined' : _typeof(node1)) !== (typeof node2 === 'undefined' ? 'undefined' : _typeof(node2)) || typeof node1 === 'string' && node1 !== node2 || node1.type !== node2.type || !!node1.props.forceUpdate;
}

var vdom = vnode(
    'div',
    { id: '_Q5', style: 'border:1px solid red' },
    vnode(
        'div',
        { style: 'text-align:center;' },
        vnode('img', { src: 'https://m.baidu.com/static/index/plus/plus_logo.png', height: '56', onClick: function onClick() {
                alert(1);
            } })
    ),
    'Hello'
);

var vdom1 = vnode(
    'div',
    { id: '_Q5', style: 'border:1px solid green' },
    vnode(
        'div',
        { style: 'text-align:center;' },
        vnode('img', { src: 'https://m.baidu.com/static/index/plus/plus_logo.png', height: '56' })
    ),
    'World'
);
var content = document.querySelector('#content');
updateElement(content, vdom);

setTimeout(function () {
    updateElement(content, vdom1, vdom);
}, 3000);
