import Express from "express";

import { configDotenv } from "dotenv";
import sequelize from "./config/database.js";
import cookieParser from "cookie-parser";
configDotenv();

const port = Number(process.env.PORT) || 3000;
const server = Express();
server.use(Express.json());
server.use(cookieParser());

server.listen(port, () => {});

async function bootStrap() {
  try {
    await sequelize.authenticate();
    console.log(`Server is running in port ${port}`);
  } catch (error) {
    console.error(`Error with running the application`);
    process.exit(1);
  }
}

bootStrap();
