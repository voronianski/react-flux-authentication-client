import React from 'react';
import { Route, DefaultRoute } from 'react-router';

import AppHandler from './common/AppHandler';
import DemoHandler from './demoFeature/DemoHandler';

import LoginFormHandler from './auth/LoginFormHandler';
import SignupFormHandler from './auth/SignupFormHandler';
import EnsureAuthHandler from './auth/EnsureAuthHandler';

export default (
    <Route name="app" path="/?" handler={AppHandler}>
        <Route name="login" path="/login/?" handler={LoginFormHandler} />
        <Route name="signup" path="/signup/?" handler={SignupFormHandler} />

        <Route name="secure" path="/?" handler={EnsureAuthHandler}>
            <Route name="demo" path="demo/?" handler={DemoHandler} />
            <DefaultRoute handler={DemoHandler} />
        </Route>

        <DefaultRoute handler={EnsureAuthHandler} />
    </Route>
);
