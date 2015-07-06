import React from 'react/addons';
import reactMixin from 'react-mixin';
import FluxComponent from 'flummox/component';

const { LinkedStateMixin} = React.addons;

@reactMixin.decorate(LinkedStateMixin)
class LoginForm extends React.Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        };
    }

    async login(e) {
        e.preventDefault();

        try {
            const { flux } = this.props;
            const { router } = this.context;

            await flux.getActions('auth').login(this.state);
            router.transitionTo('dashboard');
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div className="auth-container">
                <form onSubmit={e => this.login(e)} autoComplete="off">
                    <label htmlFor="loginEmail">Email: </label>
                    <input
                        id="loginEmail"
                        type="email"
                        className="block mb1 field"
                        placeholder="john.doe@example.com"
                        valueLink={this.linkState('email')}
                        autoComplete="off"
                        required
                    />

                    <label htmlFor="loginPassword">Password: </label>
                    <input
                        id="loginPassword"
                        type="password"
                        className="block mb1 field"
                        placeholder="*************"
                        valueLink={this.linkState('password')}
                        autoComplete="off"
                        required
                    />

                    <button type="submit" className="btn btn-primary mt1">Login</button>
                </form>
            </div>
        );
    }
}
LoginForm.contextTypes = {
    router: React.PropTypes.func
};

class LoginFormHandler extends React.Component {
    render() {
        const { flux } = this.props;

        return (
            <FluxComponent flux={flux}>
                <LoginForm />
            </FluxComponent>
        );
    }
}

export default LoginFormHandler;
