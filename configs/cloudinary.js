import cloudinary from 'cloudinary';

const configCloudinary = () => {
    if (typeof process.env.CLOUDINARY_URL === 'undefined') {
        console.warn('!! cloudinary config is undefined !!');
        console.warn('export CLOUDINARY_URL or set dotenv file');
    } else {
        console.log('cloudinary config:');
        console.log(cloudinary.v2.config());
    }
};

export default configCloudinary;
