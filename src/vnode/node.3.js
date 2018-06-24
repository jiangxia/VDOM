// 第三部分
// Handle Props & Event
// 处理属性


/* --------- step1: 将HTML => vnode ---------- */

const vdom = (
    <div id="_Q5" style="border:1px solid red">
        <div style="text-align:center;">
            <img src="https://m.baidu.com/static/index/plus/plus_logo.png" height="56"/>
        </div>
        Hello
    </div>
);
const vdom1 = (
    <div id="_Q5" style="border:1px solid green">
        <div style="text-align:center;">
            <img src="https://m.baidu.com/static/index/plus/plus_logo.png" height="56"/>
        </div>
        World
    </div>
);
/* --------- step2: 建立vnode模型 ---------- */

function vnode (type, props, ...children) {
    return {type, props, children};
}


 /* --------- step3: vnode => vdom ---------- */
 // 把vdom挂载到页面上
 function createElement(node) {
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }
    const $el = document.createElement(node.type);
    updateProps($el, node.props);
    // bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用 。
    let appendChild = $el.appendChild.bind($el);
    node.children
        .map(createElement)
        .map(appendChild);
    return $el;
}

function updateElement($parent, newNode, oldNode, index = 0) {
    if(!oldNode) {
        $parent.appendChild(
            createElement(newNode)
        );
    } else if (!newNode) {
        $parent.removeChild(
            $parent.childNodes[index]
        );
    } else if (changed(newNode, oldNode)) {
        $parent.replaceChild(
            createElement(newNode),
            $parent.childNodes[index]
        );
    } else if(newNode.type) {        
        const newLength = newNode.children.length;
        const oldLength = oldNode.children.length;
        for(let i = 0; i < newLength || i < oldLength; i++) {
            updateProps($parent.childNodes[index], newNode.props, oldNode.props);
            updateElement(
                $parent.childNodes[index],
                newNode.children[i],
                oldNode.children[i],
                i
            );
        }
    }
}

let content = document.querySelector('#content');
updateElement(content, vdom);

setTimeout(()=>{
    updateElement(content, vdom1, vdom);
}, 3000);

function changed (node1, node2){
    return typeof node1 !== typeof node2 ||
        typeof node1 === 'string' && node1 !== node2 ||
        node1.type !== node2.type
}

function updateProps ($target, newProps, oldProps = {}){
    const props = Object.assign({},oldProps, newProps);
    Object.keys(props).forEach(name => {
        updateProp($target, name, newProps[name], oldProps[name]);
    })
}
function updateProp ($target, name, newVal, oldVal) {
    if (!newVal) {
        removeProp($target, name, oldVal);
    } else if (!oldVal || newVal !== oldVal) {
        setProp($target, name, newVal);
    }
}
function setProp ($target, name, value) {
    if (typeof value === "boolean") {
        handleBooleanProp($target, name, value);
    }
    $target.setAttribute(name, value);
}

function setBooleanProp($target, name, value) {
    if (!!value) {
        $target.setAttribute(name, value);
        $target[name] = true;
    } else {
        $target[name] = false;
    }
}

function removeProp($target, name, value) {
    // if (isCustomProp(name)) {
    //     return;
    // }
    if (typeof value === 'boolean') {
        $target[name] = false;
    } 
    $target.removeAttribute(name);
}

