const dbProxy = require('./dbProxy');
let Caches = null;
module.exports = function (app) {
    if (Caches) {
        return Caches;
    }
    if(app.config.lowdb){
        app.logger.info(`[lowdb] start in ${app.config.lowdb.path}`)
    }
    let proxy = new dbProxy(app.config.lowdb);
    app.lowdb = proxy;
    return Caches = proxy;
};
