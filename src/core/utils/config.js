import env from "dotenv";
env.config();

const getConfig = () => {
  return {
    PORT: process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  };
};

const config = getConfig();

export default config;
