function getIn (object, path) {
    let stack = path.split('.');
    while (stack.length > 1) {
        object = object[stack.shift()];
    }
    return object[stack.shift()];
}

function updateIn (object, path, value) {
    let current = object;
    let stack = path.split('.');
    while (stack.length > 1) {
        current = current[stack.shift()];
    }
    current[stack.shift()] = value;
    return object;
}

function setPartialState (component, path, value) {
    component.setState(updateIn(component.state, path, value));
}

export default {
    linkState(path) {
        return {
            value: getIn(this.state, path),
            requestChange: setPartialState.bind(null, this, path)
        };
    }
};
