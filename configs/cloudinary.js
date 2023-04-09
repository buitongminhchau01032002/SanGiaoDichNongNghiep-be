import { v2 as cloudinary } from 'cloudinary';

const configCloudinary = () => {
    if (typeof process.env.CLOUDINARY_URL === 'undefined') {
        console.warn('!! cloudinary config is undefined !!');
        console.warn('export CLOUDINARY_URL or set dotenv file');
    } else {
        console.log('cloudinary config:');
        console.log(
            cloudinary.config({
                cloud_name: 'dbxfq9usa',
                api_key: '849914937344752',
                api_secret: 'qMgeXT9yuCQ2yEMEVU1VHf7ubo0',
            })
        );
    }
};

export default configCloudinary;
