import dbc22 from "../../dbc22";
import { searchAPIKeyInRateLimitArray, addClientInRateLimitArray, rateLimitArray } from "./rateLimit";

const APIKeyValidation = (APIKey: any) => {
  // TODO: voir ce que l'on entend par validation de l'API Key (compte bloqué, autre ?)
  // FIXME: modifier cette fonction qui actuellement renvoie aléatoirement vrai ou faux
  if (Math.random() < 0.5) {
    return true;
  }
  return new Error("Invalid API Key");
};

export default async (req: any, res: any, next: any) => {
  console.log("🚀 ~ ETAPE 2 ~ ", "API Key validation");
  console.log("🚀 ~ file: APIKeyValidation.ts ~ line 15 ~ ", rateLimitArray);

  const APIKeyExistsInRateLimiteArray = searchAPIKeyInRateLimitArray(req.headers.apikey);
  if (APIKeyExistsInRateLimiteArray) {
    try {
      APIKeyValidation(req.headers.apikey);
      next();
    } catch (err) {
      res.code(401).send(err);
    }
  } else {
    // TODO: voir où récupérer cette APIKey dans la DB
    // TODO: const DatabaseAPIKey = await dbc22.query("SELECT * from operateurs WHERE APIKey = ?", [req.headers.apikey]);
    // FIXME: en attente DatabaseAPIKey est défini à true
    const DatabaseAPIKey = {
      apikey: "GuillemAPIKey",
      subscription: "Free",
    };
    if (DatabaseAPIKey) {
      try {
        APIKeyValidation(DatabaseAPIKey.apikey);
        addClientInRateLimitArray(DatabaseAPIKey);
        next();
      } catch (err) {
        res.code(401).send(err);
      }
    }
  }
};
