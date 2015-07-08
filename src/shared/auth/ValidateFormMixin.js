import validator from 'validator';
import humanize from 'underscore.string/humanize';
import capitalize from 'underscore.string/capitalize';

class ValidationError extends Error {
    constructor({ message, field }) {
        super();
        this.message = message;
        this.field = field;
        Error.captureStackTrace(this);
    }
}

export default {
    getErrorClass(key, customClass = 'is-error') {
        const { error } = this.state;
        return error && (key === error.field) ? customClass : '';
    },

    validateForm(obj) {
        Object.keys(obj).forEach(key => {
            const field = obj[key];

            if (typeof field !== 'string') {
                return;
            }

            const value = field.trim();

            if (value < 1) {
                throw new ValidationError({message: `${humanize(capitalize(key))} field is empty`, field: key});
            }

            if (key === 'email' && !validator.isEmail(value)) {
                throw new ValidationError({message: 'Email address is not valid', field: 'email'});
            }

            if (key === 'password' && value.length < 6) {
                throw new ValidationError({message: 'Password should be at least 6 characters', field: 'password'});
            }
        });
    }
};
