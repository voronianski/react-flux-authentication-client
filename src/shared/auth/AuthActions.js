import { Actions } from 'flummox';

class AuthActions extends Actions {
    constructor(api) {
        super();

        this.api = api;
    }

    async signup(formData) {
        const userData = await this.api.signup(formData);
        return userData;
    }

    async login(formData) {
        const userData = await this.api.login(formData);
        return userData;
    }

    tokenize(accessToken) {
        return { accessToken };
    }

    logout() {
        this.api.logout();
        return true;
    }
}

export default AuthActions;
