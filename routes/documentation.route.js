const Router = require('express');
const documentationController = require('../controller/documentation.controller');
const authorization = require('../middlewares/authorization');
const documentationRouter = new Router();

documentationRouter.get('/documentation', authorization, documentationController.getAllSpaces);
documentationRouter.get('/space/:id', authorization, documentationController.getSpace);
documentationRouter.get('/chapter/:id', authorization, documentationController.getChapter);

documentationRouter.post('/space/create', authorization, documentationController.createSpace);
documentationRouter.post('/chapter/create', authorization, documentationController.createChapter);

documentationRouter.put('/space/update/:id', authorization, documentationController.updateSpace);
documentationRouter.put('/chapter/update/:id', authorization, documentationController.updateChapter);

documentationRouter.delete('/space/delete/:id', authorization, documentationController.deleteSpace);
documentationRouter.delete('/chapter/delete/:id', authorization, documentationController.deleteChapter);

module.exports = documentationRouter;