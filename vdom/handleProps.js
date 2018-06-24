import {isCustomProp} from './handleEvent'

export function updateProps ($target, newProps, oldProps = {}){
    const props = Object.assign({},oldProps, newProps);
    Object.keys(props).forEach(name => {
        updateProp($target, name, newProps[name], oldProps[name]);
    })
}

function setProp ($target, name, value) {
    if (isCustomProp(name)) return;
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
    if (isCustomProp(name)) {
        return;
    }
    if (typeof value === 'boolean') {
        $target[name] = false;
    } 
    $target.removeAttribute(name);
}

function updateProp ($target, name, newVal, oldVal) {
    if (!newVal) {
        removeProp($target, name, oldVal);
    } else if (!oldVal || newVal !== oldVal) {
        setProp($target, name, newVal);
    }
}