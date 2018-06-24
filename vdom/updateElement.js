import {updateProps} from './handleProps';
import {createElement} from './createElement';

/**
 * 更新元素
 * @param {}  
 * @param {*} newNode 
 * @param {*} oldNode 
 * @param {*} index 
 */
export function updateElement($parent, newNode, oldNode, index = 0) {
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
/**
 * 检查变化
 * @param {} node1 
 * @param {*} node2 
 */
function changed (node1, node2){
    return typeof node1 !== typeof node2 ||
        typeof node1 === 'string' && node1 !== node2 ||
        node1.type !== node2.type ||
        !!node1.props.forceUpdate;
}