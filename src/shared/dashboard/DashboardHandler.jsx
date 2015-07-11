import React from 'react';
import FluxComponent from 'flummox/component';

import List from './components/List';

class DashboardHandlerInner extends React.Component {
    render() {
        const { user, items } = this.props;

        let contentNode;
        if (items.length) {
            contentNode = (
                <div>
                    <h3>List of items:</h3>
                    <List />
                </div>
            );
        } else {
            contentNode = (
                <div>You have no items to display.</div>
            );
        }

        return (
            <div className="px2 py1">
                <h2>Hi, {user.firstName}!</h2>
                {contentNode}
            </div>
        );
    }
}

class DashboardHandler extends React.Component {
    static async routerWillRun({ flux }) {
        const itemActions = flux.getActions('items');
        return await itemActions.requestItems();
    }

    render() {
        const { flux } = this.props;

        return (
            <FluxComponent flux={flux} connectToStores={['items']}>
                <DashboardHandlerInner {...this.props} />
            </FluxComponent>
        );
    }
}

DashboardHandler.contextTypes = {
    router: React.PropTypes.func
};

export default DashboardHandler;
