import React from 'react';
import FluxComponent from 'flummox/component';

import List from './components/List';

class DashboardInner extends React.Component {
    render() {
        return (
            <div>
                <h2>List of items:</h2>
                <List />
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
                <DashboardInner />
            </FluxComponent>
        );
    }
}

DashboardHandler.contextTypes = {
    router: React.PropTypes.func
};

export default DashboardHandler;
