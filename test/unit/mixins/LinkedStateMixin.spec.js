import React from 'react/addons';
import reactMixin from 'react-mixin';
import LinkedStateMixin from '../../../src/shared/mixins/LinkedStateMixin';

const ReactTestUtils = React.addons.TestUtils;

describe('LinkedStateMixin', () => {
    let oldValue = 'old value';
    let newValue = 'new value';
    let component;
    let input;

    @reactMixin.decorate(LinkedStateMixin)
    class TestComponent extends React.Component {
        constructor() {
            super();
            this.state = {
                nested: { items: [oldValue] }
            };
        }

        render() {
            return (
                <div>
                    <input valueLink={this.linkState('nested.items.0')} />
                </div>
            );
        }
    }

    before(() => {
        component = ReactTestUtils.renderIntoDocument(<TestComponent />);
        input = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'input');
    });

    it('should have initial nested value inside input', () => {
        expect(React.findDOMNode(input).value).to.equal(oldValue);
    });

    describe('when updating state on the component', () => {
        before(() => {
            ReactTestUtils.Simulate.change(input, {target: {value: newValue}});
        });

        it('should have updated nested value inside input', () => {
            expect(React.findDOMNode(input).value).to.equal(newValue);
        });
    });
});
