/**
 * Create Flux instance per request
 */

import Flux from '../../shared/flux';
import WebAPI from '../../shared/common/utils/webAPI';

export default function (req, res, next) {
    if (!req.flux || !(req.flux instanceof Flux)) {
        const accessToken = req.cookies.auth_token;
        const api = new WebAPI(accessToken);
        const flux = new Flux(api);

        if (accessToken) {
            flux.getActions('auth').tokenize(accessToken);
        }

        req.flux = flux;
    }
    next();
}
