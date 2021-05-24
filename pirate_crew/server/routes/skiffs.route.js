const SkiffsController = require('../controllers/skiffs.controller');

module.exports = (app) => {                             
    app.get('/api/skiffs',  SkiffsController.getAll);   
    app.post('/api/skiffs', SkiffsController.create);
    app.get('/api/skiffs/:id', SkiffsController.getOne);
    app.put('/api/skiffs/:id', SkiffsController.update);   
    app.delete('/api/skiffs/:id', SkiffsController.delete);  
};