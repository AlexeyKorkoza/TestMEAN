import User from '../models/user';
import logger from '../utils/logger';
import {
    checkWorstPassword,
    comparePasswords,
    checkPassword
} from '../services/password';

export default {

    async updateProfile(req, res, next) {
        try {
            const id = req.payload.id;
            if (!req.body.new_password) {

                logger.info('Update data about user', req.body);
                let user = await User.findById(id);
                if (!user) {
                    res.status(400).json('profile is not found');
                }

                user.username = req.body.username;
                user.email = req.body.email;

                const result = user.save();
                if (!result) {
                    return res.status(400).json('profile is not updated');
                }

                return res.status(200).json(result);
            } else {

                logger.info('Update password of user', req.body);
                console.log('TOken', id);
                const input = req.body;

                let user = await User.findById(id);
                if (!user) {
                    return res.status(400).json('profile is not found');
                }

                const isWorstPassword = checkWorstPassword(input.new_password);
                const isComparePasswords = comparePasswords(input.new_password, input.confirm_password);
                const isCorrectOldPassword = checkPassword(user.password, input.old_password);

                console.log(req.session.user, isWorstPassword, isComparePasswords, isCorrectOldPassword);

                if (isWorstPassword) {
                    return res.status(400).json('Password too weak');
                }
                if (!isComparePasswords) {
                    return res.status(400).json('Passwords don`t compare');
                }
                if (!isCorrectOldPassword) {
                    return res.status(400).json('Old password isn`t correct');
                }

                user.password = user.generatePassword(input.new_password);

                const result = await user.save();

                if (!result) {
                    return res.status(400).json('profile is not updated');
                }

                return res.status(200).json('profile is updated');
            }
        }
        catch (err) {
            logger.error('Error: Update data of user', err);
            res.status(500).json(err);
        }
    }
}

