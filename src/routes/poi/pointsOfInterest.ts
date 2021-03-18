import { Router } from 'express';
import pointsOfInterestController from '../../controllers/pointsOfInterest';

const router = Router();
const asyncHandler = require('express-async-handler');

// FIXME: la route signUp est à mettre à jour en fonction de la logique d'enrôllement qui sera retenue
router.post('/', asyncHandler(pointsOfInterestController.getPoiFromGps));
router.post(
  '/adress',
  asyncHandler(pointsOfInterestController.getPoiFromAdress)
);
router.post(
  '/postal',
  asyncHandler(pointsOfInterestController.getPoiFromPostal)
);
router.get('/:pointID', asyncHandler(pointsOfInterestController.getPoint));

export default router;
