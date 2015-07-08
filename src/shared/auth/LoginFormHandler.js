import React from 'react';
import reactMixin from 'react-mixin';
import FluxComponent from 'flummox/component';

import ValidateFormMixin from './ValidateFormMixin';
import LinkedStateMixin from '../mixins/LinkedStateMixin';

@reactMixin.decorate(LinkedStateMixin)
@reactMixin.decorate(ValidateFormMixin)
class LoginForm extends React.Component {
    constructor() {
        super();

        this.state = {
            formData: {
                email: '',
                password: ''
            },
            error: null
        };
    }

    async login(e) {
        e.preventDefault();

        const { flux } = this.props;
        const { router } = this.context;
        const { formData } = this.state;

        try {
            this.validateForm(formData);
            await flux.getActions('auth').login(formData);
            router.transitionTo('dashboard');
        } catch (err) {
            const error = Array.isArray(err) ? {message: 'Incorrect email or password'} : err;
            this.setState({ error });
        }
    }

    render() {
        const { error } = this.state;

        return (
            <div className="auth-form-container login mx-auto">
                <form onSubmit={e => this.login(e)} acceptCharset="utf-8" noValidate>
                    {error ? (
                        <div className="error-message red h6 mb1">{error.message}</div>
                    ) : <span />}

                    <label htmlFor="loginEmail">Email: </label>
                    <input
                        id="loginEmail"
                        type="email"
                        className={`block mt1 mb1 col-12 field ${this.getErrorClass('email')}`}
                        placeholder="john.doe@example.com"
                        valueLink={this.linkState('formData.email')}
                    />

                    <label htmlFor="loginPassword">Password: </label>
                    <input
                        id="loginPassword"
                        type="password"
                        className={`block mt1 mb1 col-12 field ${this.getErrorClass('password')}`}
                        placeholder="*************"
                        valueLink={this.linkState('formData.password')}
                    />

                    <button type="submit" className="btn btn-primary mt2 right">Login</button>
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
