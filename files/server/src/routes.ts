import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();

const classesController = new ClassesController();
routes.post('/classes', classesController.creat);
routes.get('/classes', classesController.index);

const connectionsController = new ConnectionsController();
routes.post('/connections', connectionsController.create)
routes.get('/connections', connectionsController.index)

export default routes;