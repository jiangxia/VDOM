// 第一部分
// DOM跟Virtual DOM 
// 构建Virtual DOM 
// 这里先讲到如何把vdom挂载到页面上，dom上的属性等还没涉及

/* --------- step1: 将HTML => vnode ---------- */

const vdom = (
    <div id="_Q5" style="border:1px solid red">
        <div style="text-align:center;">
            <img src="https://m.baidu.com/static/index/plus/plus_logo.png" height="56"/>
        </div>
        Hello
    </div>
);

/* 
    var vdom = vnode(
        "div",
        { id: "_Q5", style: "border:1px solid red" },
        vnode(
            "div",
            { style: "text-align:center;" },
            vnode("img", { src: "https://m.baidu.com/static/index/plus/plus_logo.png", height: "56" })
        ),
        "Hello"
    );
*/

/* --------- step2: 建立vnode模型 ---------- */

 /**
 * 建立vnode模型
 * transform-react-jsx 把 HTML => vnode，并制定方法名称就是vnode，如上放注释的代码
 * 此处声明vnode函数，旨在把vnode转化成具体的对象，方便调用。
* */
function vnode (type, props, ...children) {
    return {type, props, children};
}
/* 
{
    children : [..],
    props : Object,
    type : ""
}
 */

 /* --------- step3: vnode => vdom ---------- */
 // 把vdom挂载到页面上
 function createElement(node) {
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }
    const $el = document.createElement(node.type);
    // bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用 。
    let appendChild = $el.appendChild.bind($el);
    node.children
        .map(createElement)
        .map(appendChild);
    return $el;
}
document.body.appendChild(createElement(vdom));