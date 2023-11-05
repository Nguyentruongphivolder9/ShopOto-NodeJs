const routersFE = require('./font-end');
const routersBE = require('./back-end');

function routers(app) {
    routersFE(app);
    routersBE(app);
}

module.exports = routers;