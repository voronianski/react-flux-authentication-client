import React from 'react/addons';

const TestUtils = React.addons.TestUtils;

export function createComponent (component, props, ...children) {
    const shallowRenderer = TestUtils.createRenderer();
    const Element = React.createElement(component, props, children.length > 1 ? children : children[0]);

    shallowRenderer.render(Element);
    return shallowRenderer.getRenderOutput();
}
