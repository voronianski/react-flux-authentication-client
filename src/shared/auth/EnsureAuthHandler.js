import React from 'react';
import { RouteHandler, Link } from 'react-router';
import FluxComponent from 'flummox/component';

class EnsureAuthInner extends React.Component {
    render() {
        const { isLoggedIn, onLogout } = this.props;

        if (!isLoggedIn) {
            return null;
        }

        return (
            <div>
                <header>
                    <nav className="clearfix white bg-blue">
                        <div className="sm-col">
                            <Link to="secure" className="btn button-transparent py2">Home</Link>
                        </div>
                        <div className="sm-col-right">
                            <button className="btn button-transparent py2" onClick={() => onLogout()}>Logout</button>
                        </div>
                    </nav>
                </header>
                <RouteHandler {...this.props} />
            </div>
        );
    }
}

class EnsureAuthHandler extends React.Component {
    static async routerWillRun({ flux }) {
        const user = flux.getStore('auth').getUser();
        if (!user) {
            const authActions = flux.getActions('auth');
            return await authActions.requestUser();
        }
    }

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
                    user: store.getUser(),
                    isLoggedIn: store.isLoggedIn()
                })
            }}>
                <EnsureAuthInner onLogout={::this.logout} />
            </FluxComponent>
        );
    }
}

EnsureAuthHandler.contextTypes = {
    router: React.PropTypes.func
};

export default EnsureAuthHandler;
