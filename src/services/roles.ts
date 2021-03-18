import User from "../interfaces/user";

export default class RolesService {
  //TO FINISH
  static isSuperAdmin(user: User) {
    return user.profilUtilisateur == 2;
  }
  //TO FINISH
  static isAdminStation(user: User) {
    return user.profilUtilisateur == 2;
  }
}
