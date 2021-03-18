const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY, JWT_EXPIRES_IN } = require("../../env");

export default async (req: any, res: any, next: any) => {
  console.log("🚀 ~ ETAPE 2 ~ ", "Vérification du token");

  // We can obtain the session token from the requests cookies, which come with every request
  const authHeader = req.headers.authorization;

  let token = "";
  if (authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7, authHeader.length);
  }

  // if the cookie is not set, return an unauthorized error
  if (!token) {
    return res.status(401).end();
  }

  var payload;
  try {
    // Parse the JWT string and store the result in `payload`.
    // Note that we are passing the key in this method as well. This method will throw an error
    // if the token is invalid (if it has expired according to the expiry time we set on sign in),
    // or if the signature does not match
    payload = jwt.verify(token, JWT_PRIVATE_KEY);
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      return res.status(401).send(err);
      //TODO: voir comment traiter le refresh du token, pour l'instant si la durée nest plus valable une erreur est renvoyée et utilisateur bloqué
    }
    // otherwise, return a bad request error
    return res.status(400).end();
  }

  // Finally, return the welcome message to the user, along with their
  // username given in the token
  req.tokenPayload = payload;
  return next();
};
