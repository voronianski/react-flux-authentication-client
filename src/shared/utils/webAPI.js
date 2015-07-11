import request from 'superagent';
import cookies from 'cookies-js';
import { api } from 'c0nfig';

class WebAPI {
    constructor(accessToken) {
        if (accessToken) {
            this.setAccessToken(accessToken);
        }
    }

    setAccessToken(accessToken) {
        this.accessToken = accessToken;
    }

    _handleAuthorization(data, action) {
        return new Promise((resolve, reject) => {
            request
                .post(`${api.url}/user/${action}`)
                .send(data)
                .end((err, res) => {
                    if (err) {
                        reject(res.body.errors);
                    } else {
                        const { accessToken } = res.body;

                        this.setAccessToken(accessToken);
                        cookies.set('auth_token', accessToken);

                        resolve(res.body);
                    }
                });
        });
    }

    signup(data) {
        return this._handleAuthorization(data, 'signup');
    }

    login(data) {
        return this._handleAuthorization(data, 'login');
    }

    logout() {
        if (process.browser) {
            cookies.expire('auth_token');
        }
    }

    _authRequest(url, method = 'GET', query = {}, params = {}) {
        if (!url) {
            throw new Error('URL is required for request');
        }

        return new Promise((resolve, reject) => {
            const { accessToken, onUnauthorizedAccess } = this;

            if (!accessToken) {
                onUnauthorizedAccess && onUnauthorizedAccess();
                return resolve();
            }

            request[method.toLowerCase()](url)
                .set({'X-Access-Token': accessToken})
                .query(query)
                .send(params)
                .end((err, res) => {
                    if (err) {
                        if (err.status === 401 && onUnauthorizedAccess) {
                            onUnauthorizedAccess();
                            return resolve();
                        }
                        return reject(err, res);
                    }
                    resolve(res.body, res);
                });
        });
    }

    getUserItems() {
        return this._authRequest(`${api.url}/user/items`);
    }

    getUserInfo() {
        return this._authRequest(`${api.url}/user/me`);
    }
}

export default WebAPI;
