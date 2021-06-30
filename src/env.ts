require('dotenv').config();

const envConfig = {
  PORT: process.env.PORT,
  DB_CONNECTION: process.env.DB_CONNECTION,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  SESSION_EXPIRED: 60 * 60 * 1000,
  SESSION_RENEW: 30 * 60 * 1000,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_API_UPLOAD_PRESET_NAME:
    process.env.CLOUDINARY_API_UPLOAD_PRESET_NAME,
  CLOUDINARY_API_BASE_URL: process.env.CLOUDINARY_API_BASE_URL,
};

export default envConfig;
