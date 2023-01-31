const create = require('./lib/create');
module.exports = app => {
    if (app.config.lowdb.app) {
        // app.addSingleton('lowdb', create);
        create(app)
    }
};
