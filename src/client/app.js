// app styles
import './app.css';

// polyfills
import 'Base64';
import 'es5-shim';
import 'es5-shim/es5-sham';

import cookies from 'cookies-js';
import React from 'react';
window.React = React;

import router from './router';
import Flux from '../shared/flux';
import performRouteHandlerStaticMethod from '../shared/utils/performRouteHandlerStaticMethod';

const accessToken = cookies('auth_token');
const flux = new Flux(accessToken);

flux.deserialize(decodeURIComponent(window.escape(atob(window.__snapshot__))));

router.run(async (Handler, state) => {
    try {
        await performRouteHandlerStaticMethod(state.routes, 'routerWillRun', { flux });
    } catch (err) {}

    React.render(
        React.createElement(Handler, { flux }),
        document.getElementById('app')
    );
});
