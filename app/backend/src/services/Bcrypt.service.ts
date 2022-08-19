// Referência: https://snyk.io/advisor/npm-package/bcrypt/functions/bcrypt.compareSync
import * as bcryptjs from 'bcryptjs';

export default class BcryptService {
  static compareSyncPassword = (password: string, hashedPassword: string): boolean => bcryptjs
    .compareSync(password, hashedPassword);
}
