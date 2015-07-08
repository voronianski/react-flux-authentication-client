// https://github.com/webpack/docs/wiki/context
var context = require.context('.', true, /\.spec\.jsx?$/);
context.keys().forEach(context);

module.exports = context;
