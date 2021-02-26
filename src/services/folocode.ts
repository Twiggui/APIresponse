export default class FolocodeService {
  static generateNewFolocode(length: number) {
    let salt = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let len = salt.length;
    let makepass = "";
    for (let i = 0; i < length; i++) {
      makepass += salt[FolocodeService.mt_rand(0, len - 1)];
    }
    return makepass.toUpperCase();
  }

  static mt_rand(min: number, max: number) {
    // eslint-disable-line camelcase
    //  discuss at: https://locutus.io/php/mt_rand/
    // original by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: Brett Zamir (https://brett-zamir.me)

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
