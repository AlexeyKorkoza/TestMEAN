'use strict';

import User from '../models/user';

export default {

    async getProfile(req, res, next) {
        try {
            const id = req.payload.id;
            const user = await User.findById(id);
            if (user) {
                res.status(200).json(user);
            }

            if (!user) {
                res.status(401).json('profile of user is not found');
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async updateProfile(req, res, next) {
        try {
            const id = req.payload.id;
            if (!req.body.password) {

                let user = await User.findById(id);
                if (!user) {
                    res.status(400).json('profile is not found');
                }

                user.username = req.body.username;
                user.email = req.body.email;

                const result = user.save();
                if (!result) {
                    res.status(400).json('profile is not updated');
                }

                res.status(200).json(result);
            } else {

                let user = await User.findById(id);
                if (!user) {
                    res.status(400).json('profile is not found');
                }
                user.password = user.generatePassword(req.body.password);

                const result = await user.save();

                if (!result) {
                    res.status(400).json('profile is not updated');
                }

                res.status(200).json('profile is updated');
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
}

