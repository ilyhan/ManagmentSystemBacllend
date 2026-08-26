const Router = require('express');
const authorization = require('../middlewares/authorization');
const trackingController = require('../controller/tracking.controller');
const trackingRouter = new Router();

trackingRouter.post('/track/me', authorization, trackingController.getMyTrack);
trackingRouter.post('/track/add', authorization, trackingController.addNewTrack);

module.exports = trackingRouter;