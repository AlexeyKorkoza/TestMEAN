import dumbPasswords from 'dumb-passwords';
import bcrypt from 'bcrypt-nodejs';

const comparePasswords = (newPass, confirmNewPass) => newPass === confirmNewPass;

const checkWorstPassword = password => dumbPasswords.check(password);

const checkPassword = (password, newPassword) => bcrypt.compareSync(newPassword, password);

export {
    comparePasswords,
    checkWorstPassword,
    checkPassword,
};
