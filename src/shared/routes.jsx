import React from 'react'; // eslint-disable-line no-unused-vars
import { Route, DefaultRoute } from 'react-router';

import AppHandler from './AppHandler';
import DashboardHandler from './dashboard/DashboardHandler';

import LoginFormHandler from './auth/LoginFormHandler';
import SignupFormHandler from './auth/SignupFormHandler';
import EnsureAuthHandler from './auth/EnsureAuthHandler';

export default (
    <Route name="app" path="/?" handler={AppHandler}>
        <Route name="login" path="/login/?" handler={LoginFormHandler} />
        <Route name="signup" path="/signup/?" handler={SignupFormHandler} />

        <Route name="secure" path="/?" handler={EnsureAuthHandler}>
            <Route name="dashboard" path="dashboard/?" handler={DashboardHandler} />
            <DefaultRoute handler={DashboardHandler} />
        </Route>

        <DefaultRoute handler={EnsureAuthHandler} />
    </Route>
);
