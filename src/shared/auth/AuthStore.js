import { Store } from 'flummox';

class AuthStore extends Store {
    constructor(flux) {
        super();

        const authActions = flux.getActions('auth');
        this.register(authActions.login, this.handleSuccessAuth);
        this.register(authActions.signup, this.handleSuccessAuth);
        this.register(authActions.tokenize, this.handleSuccessAuth);
        this.register(authActions.logout, this.handleLogout);

        this.state = this.getInitialState();
    }

    getInitialState() {
        return {
            accessToken: null
        };
    }

    handleSuccessAuth({ accessToken }) {
        this.setState({ accessToken });
    }

    handleLogout() {
        this.setState(this.getInitialState());
    }

    isLoggedIn() {
        return !!this.state.accessToken;
    }

    static serialize(state) {
        return JSON.stringify(state);
    }

    static deserialize(state) {
        try {
            return JSON.parse(state);
        } catch (err) {
            // do nothing
        }
    }
}

export default AuthStore;
