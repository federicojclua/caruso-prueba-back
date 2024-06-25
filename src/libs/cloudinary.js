const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

async function uploadImage(filePath) {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'caruso',
            format: 'png',
            public_id: `${Date.now()}-${filePath}`
        });
        return result;
    } catch (error) {
        console.error('Error subiendo imagen:', error);
        throw error;
    }
}

module.exports = uploadImage;
