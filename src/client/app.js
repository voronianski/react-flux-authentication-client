// polyfills
import 'Base64';
import 'es5-shim';
import 'es5-shim/es5-sham';

import React from 'react';
window.React = React;

import cookies from 'cookies-js';
import router from './router';
import Flux from '../shared/flux';
import WebAPI from '../shared/common/utils/WebAPI';
import performRouteHandlerStaticMethod from '../shared/common/utils/performRouteHandlerStaticMethod';

const accessToken = cookies('auth_token');
const api = new WebAPI(accessToken);
const flux = new Flux(api);

flux.deserialize(decodeURIComponent(window.escape(atob(window.__snapshot__))));

router.run(async (Handler, state) => {
    await performRouteHandlerStaticMethod(state.routes, 'routerWillRun', { flux });

    React.render(
        React.createElement(Handler, { flux }),
        document.getElementById('app')
    );
});
