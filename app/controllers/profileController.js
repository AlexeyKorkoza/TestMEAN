import User from '../models/user';
import logger from '../utils/logger';
import {
    checkWorstPassword,
    comparePasswords,
    checkPassword,
} from '../services/password';

export default {

    /**
     * @request /api/v1/profile
     * @param req
     * @param res
     * @returns {Promise.<void>}
     */
    async updateProfile(req, res) {
        try {
            const { id } = req.payload;
            if (!req.body.new_password) {
                logger.info('Update data about user', req.body);
                const user = await User.findById(id);
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
            }

            logger.info('Update password of user', req.body);
            const input = req.body;

            const user = await User.findById(id);
            if (!user) {
                return res.status(400).json('profile is not found');
            }

            const isWorstPassword = checkWorstPassword(input.new_password);
            const isComparePasswords = comparePasswords(input.new_password, input.confirm_password);
            const isCorrectOldPassword = checkPassword(user.password, input.old_password);

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
        } catch (err) {
            logger.error('Error: Update data of user', err);
            return res.status(500).json(err);
        }
    },
};

