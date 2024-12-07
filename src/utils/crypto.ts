import CryptoJS from "crypto-js";
import Utf8 from "crypto-js/enc-utf8";
import AES from "crypto-js/aes";
import Pkcs7 from "crypto-js/pad-pkcs7";

const AESC_KEY = process.env.VUE_APP_AESC_KEY;
const AESC_IV = process.env.VUE_APP_AESC_IV;

class AESCipher {
  // 将key/iv的格式转为 WordArray，以此保证每次生成的加密字符都一致
  key = Utf8.parse(AESC_KEY);
  iv = Utf8.parse(AESC_IV);
  mode = CryptoJS.mode.CBC;
  padding = Pkcs7;

  encrypt(plaintext: string) {
    const encrypted = AES.encrypt(plaintext, this.key, {
      iv: this.iv,
      mode: this.mode,
      padding: this.padding
    }).toString();

    return encrypted;
  }

  decrypt(encryptedText: string) {
    const decrypted = AES.decrypt(encryptedText, this.key, {
      iv: this.iv,
      mode: this.mode,
      padding: this.padding
    }).toString(Utf8);
    return decrypted;
  }
}

export default new AESCipher();
