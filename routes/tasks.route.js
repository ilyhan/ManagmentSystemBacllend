const Router = require('express');
const tasksController = require('../controller/tasks.controller');
const tasksRouter = new Router();

tasksRouter.get('/tasks', tasksController.allTasks);
tasksRouter.post('/tasks/create', tasksController.createTask);
tasksRouter.put('/tasks/update/:taskId', tasksController.updateTask);
tasksRouter.get('/tasks/:taskId', tasksController.taskById);

module.exports = tasksRouter;