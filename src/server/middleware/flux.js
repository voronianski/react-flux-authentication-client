/**
 * Create Flux instance per request
 */

import Flux from '../../shared/flux';

export default function (req, res, next) {
    if (!req.flux || !(req.flux instanceof Flux)) {
        const accessToken = req.cookies.auth_token;
        const flux = new Flux(accessToken);

        if (accessToken) {
            flux.getActions('auth').tokenize(accessToken);
        }

        req.flux = flux;
    }
    next();
}
