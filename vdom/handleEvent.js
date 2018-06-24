

function isEventProp(name) {
    return (/^on/.test(name)
    );
}

function extractEventName(name) {
    return name.slice(2).toLowerCase();
}

export function addEventListeners($target, props) {
    Object.keys(props).forEach(function (name) {
        if (isEventProp(name)) {
            $target.addEventListener(extractEventName(name), props[name]);
        }
    });
}

export function isCustomProp(name) {
    return isEventProp(name) || name === "forceUpdate";
}