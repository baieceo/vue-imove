const create = require('./lib/create');

module.exports = agent => {
    if (agent.config.lowdb.agent) {
        // app.addSingleton('lowdb', create);
        create(agent)
    }
};
