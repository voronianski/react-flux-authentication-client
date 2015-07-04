import React from 'react/addons';
import reactMixin from 'react-mixin';
import FluxComponent from 'flummox/component';

const { LinkedStateMixin} = React.addons;

@reactMixin.decorate(LinkedStateMixin)
class SignupForm extends React.Component {
    constructor() {
        super();

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: 'landlord'
        };
    }

    async signup(e) {
        e.preventDefault();

        try {
            const { flux } = this.props;
            const { router } = this.context;

            await flux.getActions('auth').signup(this.state);
            router.transitionTo('demo');
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <form onSubmit={e => this.signup(e)}>
                <div>
                    <label htmlFor="signupFirstName">First name: </label>
                    <input
                        id="signupFirstName"
                        type="text"
                        placeholder="John"
                        valueLink={this.linkState('firstName')}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="signupLastName">Last name: </label>
                    <input
                        id="signupLastName"
                        type="text"
                        placeholder="Doe"
                        valueLink={this.linkState('lastName')}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="signupEmail">Email: </label>
                    <input
                        id="signupEmail"
                        type="email"
                        placeholder="john.doe@example.com"
                        valueLink={this.linkState('email')}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="signupPassword">Password: </label>
                    <input
                        id="signupPassword"
                        type="password"
                        placeholder="*************"
                        valueLink={this.linkState('password')}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="signupRole">Role: </label>
                    <select id="signupRole" valueLink={this.linkState('role')}>
                        <option value="tenant">Tenant</option>
                        <option value="landlord">Landlord</option>
                    </select>
                </div>

                <div>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        );
    }
}

SignupForm.contextTypes = {
    router: React.PropTypes.func
};

class SignupFormHandler extends React.Component {
    render() {
        const { flux } = this.props;

        return (
            <FluxComponent flux={flux}>
                <SignupForm />
            </FluxComponent>
        );
    }
}

export default SignupFormHandler;
