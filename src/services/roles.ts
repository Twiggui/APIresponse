import User from "../model/user";

export default class RolesService {
  static isSuperAdmin(user : User) {
    return user.profilUtilisateur == 2;
  }

  static isAdminStation(user : User) {
    return user.profilUtilisateur == 2;
  }
}
