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
            router.transitionTo('demo');
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <form onSubmit={e => this.login(e)}>
                <div>
                    <label htmlFor="loginEmail">Email: </label>
                    <input
                        id="loginEmail"
                        type="email"
                        placeholder="john.doe@example.com"
                        valueLink={this.linkState('email')}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="loginPassword">Password: </label>
                    <input
                        id="loginPassword"
                        type="password"
                        placeholder="*************"
                        valueLink={this.linkState('password')}
                        required
                    />
                </div>

                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
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
