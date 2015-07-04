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
        return cookies.expire('auth_token');
    }

    getChats() {
        return new Promise((resolve, reject) => {
            if (!this.accessToken) {
                return resolve();
            }

            request
                .get(`${api.url}/user/chats`)
                .set({'X-Access-Token': this.accessToken})
                .end((err, res) => {
                    if (err) {
                        reject(res.body.errors);
                    } else {
                        console.log('***', res.body);
                        resolve(res.body);
                    }
                });
        });
    }
}

export default WebAPI;
