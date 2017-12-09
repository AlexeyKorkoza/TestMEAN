'use strict';

import User from '../models/user';

export default {

    async getUser(req, res) {
        try {
            const id = req.payload.id;
            if (!id) {
                return res.status(403).json('User is not authenticated');
            }
            const user = await User.findById(id).select({'_id': 1});
            if (user) {
                res.status(200).json(user);
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
}
