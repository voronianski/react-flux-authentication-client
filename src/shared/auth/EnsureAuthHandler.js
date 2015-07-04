import React from 'react';
import { RouteHandler } from 'react-router';
import FluxComponent from 'flummox/component';

class EnsureAuthHandler extends React.Component {
    constructor(props, context) {
        super();

        const flux = this.flux = props.flux;
        this.authStore = flux.getStore('auth');
        this.authActions = flux.getActions('auth');

        this.router = context.router;
    }

    componentDidMount() {
        this.redirectIfNotAuthenticated();
    }

    redirectIfNotAuthenticated() {
        if (!this.authStore.isLoggedIn()) {
            this.router.transitionTo('login');
        }
    }

    logout() {
        this.authActions.logout();
        this.router.transitionTo('login');
    }

    render() {
        if (!this.authStore.isLoggedIn()) {
            // TBD: display preloader here
            return <span />;
        }

        return (
            <FluxComponent flux={this.flux} connectToStores={{
                auth: store => ({
                    isLoggedIn: store.isLoggedIn()
                })
            }}>
                <header>
                    <button type="button" onClick={() => this.logout()}>Logout</button>
                </header>
                <RouteHandler />
            </FluxComponent>
        );
    }
}

EnsureAuthHandler.contextTypes = {
    router: React.PropTypes.func
};

export default EnsureAuthHandler;
