// import currentUsersArray from "./APIKeyValidator";
import clientRateLimit from "../../interfaces/clientRateLimit";
//test
// rateLimiteArray est un tableau d'objets (chaque objet à le forme TS de clientRateLimit). Il sert às tocker la liste en cours des clef d'API connectées
export const rateLimitArray: clientRateLimit[] = [];

export const addClientInRateLimitArray = (clientDatas: any) => {
  const APIKey = "clientDatas.apikey";
  // TODO: Voir si on crée une colonne APIKey dans la BDD
  const subscription = "clientDatas.TypeCompte";
  // TODO: voir à quoi correspond TypeCompte
  const maxReqLimit = 3;
  // TODO: voir comment récupérer ce nombre de requêtes max

  const APIKeyExisting = searchAPIKeyInRateLimitArray(APIKey);
  if (!APIKeyExisting) {
    rateLimitArray.push({
      apikey: APIKey,
      subscription: subscription,
      timeStamp: new Date(),
      reqNb: 0,
      reqNbMax: maxReqLimit,
    });
  }
};

export const searchAPIKeyInRateLimitArray = (APIKey: any) => {
  for (let i = 0; i < rateLimitArray.length; i += 1) {
    if (rateLimitArray[i].apikey === APIKey) {
      return rateLimitArray[i];
    }
    return null;
  }
};

export const rateLimitTimeStampVerification = (APIKey: any) => {
  let clientInRateLimiteArray: clientRateLimit = searchAPIKeyInRateLimitArray(APIKey);
  const dateRequest = new Date();

  //Si la date de la requête > horodatage max dans le tableau alors on réinitialise l'horodatage
  // TODO: les temps sont comparés sur la base d'une heure dans le code ci-dessous il faudra surement le rendre dynamique en fonction des abonnements ou bien ramener le nombre de requêtes maximale à l'heure
  if (dateRequest.getTime() > clientInRateLimiteArray.timeStamp.getTime() + 1 * 60 * 60 * 1000) {
    for (let i = 0; i < rateLimitArray.length; i++) {
      if (rateLimitArray[i].apikey === APIKey) {
        rateLimitArray[i].timeStamp = dateRequest;
        rateLimitArray[i].reqNb = 0;
      }
    }
  }
};

export const rateLimitRequestNumberVerification = (APIKey: any) => {
  let clientInRateLimiteArray: clientRateLimit = searchAPIKeyInRateLimitArray(APIKey);
  if (clientInRateLimiteArray.reqNb >= clientInRateLimiteArray.reqNbMax) {
    return false;
  }
  for (let i = 0; i < rateLimitArray.length; i++) {
    if (rateLimitArray[i].apikey === APIKey) {
      rateLimitArray[i].reqNb++;
    }
  }
  return true;
};

export const rateLimit = (req: any, res: any, next: any) => {
  console.log("🚀 ~ ETAPE 3 ~ ", "Validation du rateLimit");
  console.log("🚀 ~ file: rateLimit.ts ~ line 67 ~ rateLimit ~ rateLimitArray", rateLimitArray);

  const APIKey = req.headers.apikey || req.tokenPayload.apikey;
  console.log("🚀 ~ file: rateLimit.ts ~ line 70 ~ rateLimit ~ APIKey", APIKey);

  rateLimitTimeStampVerification(APIKey);
  if (!rateLimitRequestNumberVerification(APIKey)) {
    return res.status(401).send("Limite de requêtes dépassée");
  }

  return next();
};
