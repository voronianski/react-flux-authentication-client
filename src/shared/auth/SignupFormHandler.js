import React from 'react';
import reactMixin from 'react-mixin';
import FluxComponent from 'flummox/component';

import ValidateFormMixin from './ValidateFormMixin';
import LinkedStateMixin from '../mixins/LinkedStateMixin';

@reactMixin.decorate(LinkedStateMixin)
@reactMixin.decorate(ValidateFormMixin)
class SignupForm extends React.Component {
    constructor() {
        super();

        this.state = {
            formData: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                role: 'artist'
            },
            error: null
        };
    }

    async signup(e) {
        e.preventDefault();

        const { flux } = this.props;
        const { router } = this.context;
        const { formData } = this.state;

        try {
            this.validateForm(formData);
            await flux.getActions('auth').signup(formData);
            router.transitionTo('dashboard');
        } catch (err) {
            const error = Array.isArray(err) ? err[0] : err;
            this.setState({ error });
        }
    }

    render() {
        const { error } = this.state;

        return (
            <div className="auth-form-container signup mx-auto">
                <form onSubmit={e => this.signup(e)} acceptCharset="utf-8" noValidate>
                    {error ? (
                        <div className="error-message red h6 mb1">{error.message}</div>
                    ) : <span />}

                    <label htmlFor="signupFirstName">First name: </label>
                    <input
                        id="signupFirstName"
                        type="text"
                        name="firstName"
                        className={`block mt1 mb1 col-12 field ${this.getErrorClass('firstName')}`}
                        placeholder="John"
                        valueLink={this.linkState('formData.firstName')}
                    />

                    <label htmlFor="signupLastName">Last name: </label>
                    <input
                        id="signupLastName"
                        type="text"
                        name="lastName"
                        className={`block mt1 mb1 col-12 field ${this.getErrorClass('lastName')}`}
                        placeholder="Doe"
                        valueLink={this.linkState('formData.lastName')}
                    />

                    <label htmlFor="signupEmail">Email: </label>
                    <input
                        id="signupEmail"
                        type="email"
                        name="emaily"
                        className={`block mt1 mb1 col-12 field ${this.getErrorClass('email')}`}
                        placeholder="john.doe@example.com"
                        valueLink={this.linkState('formData.email')}
                    />

                    <label htmlFor="signupPassword">Password: </label>
                    <input
                        id="signupPassword"
                        type="password"
                        name="password"
                        className={`block mt1 mb1 col-12 field ${this.getErrorClass('password')}`}
                        placeholder="*************"
                        valueLink={this.linkState('formData.password')}
                    />

                    <label htmlFor="signupRole">Role: </label>
                    <select
                        id="signupRole"
                        valueLink={this.linkState('role')}
                        className="block mt1 mb1 col-12 field"
                    >
                        <option value="artist">Artist</option>
                        <option value="listener">Listener</option>
                    </select>

                    <button type="submit" className="btn btn-primary mt2 right">Sign Up</button>
                </form>
            </div>
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
