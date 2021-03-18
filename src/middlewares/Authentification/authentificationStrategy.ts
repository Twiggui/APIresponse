import ApiKeyValidator from "./APIKeyValidation";
import verifyToken from "./verifyToken";

// Ce middleware permet de rediriger soit vers le middleware verifyToken qui surveille le token (cas de connection depuis l'application), soit vers le middleware ApiKeyValidator qui surveille la clef d'API (cas de connection depuis un appel d'une API externe)

export default async (req: any, res: any, next: any) => {
  console.log("🚀 ~ ETAPE 1 ~ ", "Stratégie d'authentification : ");

  // TODO: est-ce qu'en mode API on fait passer la clef dans le header ou dans le body ? (plutôt header j'imagine) -> si c'est le cas, corriger dans le MW APIKeyValidator, utiliser req.headers plutôt que req.body pour la verif
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    //presence of a token verification (Sass mode)
    return verifyToken(req, res, next);
  }
  //appel depuis une API externe
  return ApiKeyValidator(req, res, next);
};
