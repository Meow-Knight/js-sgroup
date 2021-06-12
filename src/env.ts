require('dotenv').config();

const envConfig = {
    PORT: process.env.PORT,
    DB_CONNECTION: process.env.DB_CONNECTION,
    COOKIE_SECRET: process.env.COOKIE_SECRET,
    SESSION_EXPIRED: 60*60*1000,
    SESSION_RENEW: 30*60*1000
};

export default envConfig;