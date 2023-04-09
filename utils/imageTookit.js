import { v2 as cloudinary } from 'cloudinary';

export const upload = (file) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file, { folder: process.env.CLOUDINARY_FOLDER }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

export const update = (file, id) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            file,
            {
                public_id: process.env.CLOUDINARY_FOLDER + '/' + id,
                invalidate: true,
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
    });
};

export const destroy = (public_id) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(public_id, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};
