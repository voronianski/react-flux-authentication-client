import { Flummox } from 'flummox';

import WebAPI from './utils/WebAPI';

import AuthActions from './auth/AuthActions';
import AuthStore from './auth/AuthStore';
import ItemActions from './dashboard/ItemActions';
import ItemStore from './dashboard/ItemStore';

class Flux extends Flummox {
    constructor(accessToken) {
        super();

        const api = new WebAPI(accessToken);

        this.createActions('auth', AuthActions, api);
        this.createStore('auth', AuthStore, this);

        this.createActions('items', ItemActions, api);
        this.createStore('items', ItemStore, this);

        api.onUnauthorizedAccess = () => this.getActions('auth').logout();
    }
}

export default Flux;
