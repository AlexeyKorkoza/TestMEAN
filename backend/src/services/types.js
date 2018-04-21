import fs from 'fs';
import Type from '../models/type';

/**
 * @param id
 * @returns {Promise.<void>}
 */
const removeImage = id => {
    const type = Type.findOne({ id_type: id });
    if (type) {
        fs.unlink(`uploads/${type.image}`);
    }
};

export {
    removeImage,
};
