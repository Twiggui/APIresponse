import authRouter from './authentication/authentication';
import circuitsRouter from './circuits/circuits';
import pointsOfInterestRouter from './poi/pointsOfInterest';
import applicationTemplateRouter from './applicationTemplates/applicationTemplates';

import { rateLimit } from '../middlewares/Authentification/rateLimit';
import roleVerification from '../middlewares/Authentification/roleVerification';
import authStrategy from '../middlewares/Authentification/AuthentificationStrategy';
import beforeLogger from '../middlewares/Logger/beforeLogger';
import afterLogger from '../middlewares/Logger/afterLogger';

const asyncHandler = require('express-async-handler');

module.exports = (app: any) => {
  //public routes
  app.use('/auth', authRouter);
  app.use('/circuits', circuitsRouter);
  app.use('/points', pointsOfInterestRouter);
  app.use('/templates', applicationTemplateRouter);

  // app.post("/statusPoints", statusPoints);
  // app.get("/points/:itemId", points);
  // app.get("/templates/:template", templates);

  //logger middleware
  // app.use(asyncHandler(beforeLogger));
  // app.use(asyncHandler(afterLogger));

  //protected routes
  // app.use(asyncHandler(authStrategy));
  // app.use(rateLimit);
  // app.use(asyncHandler(roleVerification));

  // FIXME: route de test à supprimer
  app.use('/test', asyncHandler(authRouter));
};
