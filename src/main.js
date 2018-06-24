import {updateElement} from '../vdom/updateElement'
import {vnode} from '../vdom/createElement'


const vdom = (
    <div id="_Q5" style="border:1px solid red">
        <div style="text-align:center;">
            <img src="https://m.baidu.com/static/index/plus/plus_logo.png" height="56" onClick={()=>{alert(1)}}/>
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
let content = document.querySelector('#content');
updateElement(content, vdom);

setTimeout(()=>{
    updateElement(content, vdom1, vdom);
}, 3000);