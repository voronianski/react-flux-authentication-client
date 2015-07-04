import { Flummox } from 'flummox';

import DemoActions from './demoFeature/DemoActions';
import DemoStore from './demoFeature/DemoStore';
import AuthActions from './auth/AuthActions';
import AuthStore from './auth/AuthStore';

class Flux extends Flummox {
    constructor(api) {
        super();

        this.createActions('demo', DemoActions, api);
        this.createStore('demo', DemoStore, this);

        this.createActions('auth', AuthActions, api);
        this.createStore('auth', AuthStore, this);
    }
}

export default Flux;
