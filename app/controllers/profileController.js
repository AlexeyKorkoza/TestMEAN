import User from '../models/user';
import logger from '../utils/logger';

export default {

    async updateProfile(req, res, next) {
        try {
            const id = req.payload.id;
            if (!req.body.password) {

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
                let user = await User.findById(id);
                if (!user) {
                    return res.status(400).json('profile is not found');
                }
                user.password = user.generatePassword(req.body.password);

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

