import { Router } from 'express';
import circuitsController from '../../controllers/circuits';

const router = Router();
const asyncHandler = require('express-async-handler');

// FIXME: la route signUp est à mettre à jour en fonction de la logique d'enrôllement qui sera retenue
router.post('/', asyncHandler(circuitsController.getCircuitsFromGps));
router.post('/adress', asyncHandler(circuitsController.getCircuitsFromAdress));
router.post('/postal', asyncHandler(circuitsController.getCircuitsFromPostal));

export default router;
