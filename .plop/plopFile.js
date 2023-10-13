const { component, controller, repository } = require('./settings');

module.exports = function (plop) {
    plop.setGenerator('component', component);
    plop.setGenerator('controller', controller);
    plop.setGenerator('repository', repository);
};