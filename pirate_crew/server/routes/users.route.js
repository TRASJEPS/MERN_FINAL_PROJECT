// FOR BLACKBELT LATER
const UsersController = require('../controllers/users.controller');
const { authenticate } = require("../config/jwt_config");

module.exports = (app) => {                            
    app.get('/api/users',  UsersController.getAll);   
    app.post('/api/users', UsersController.create);
    app.get('/api/users/:id', UsersController.getOne);
    app.put('/api/users/:id', UsersController.update);   //THIS IS THE UPDATER or EDITOR
    app.delete('/api/users/:id', UsersController.delete);  
    app.post('/api/user/register', UsersController.register);
    app.post('/api/user/login', UsersController.login);
    app.post('/api/user/logout', UsersController.logout);
    app.post('/api/user/loggedin', authenticate, UsersController.getLoggedInUser);
};