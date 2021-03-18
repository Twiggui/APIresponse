import { Router } from 'express';
import applicationTemplatesController from '../../controllers/applicationTemplates';

const router = Router();
const asyncHandler = require('express-async-handler');

// FIXME: la route signUp est à mettre à jour en fonction de la logique d'enrôllement qui sera retenue
router.get(
  '/:templateId',
  asyncHandler(applicationTemplatesController.getApplicationTemplate)
);

export default router;
