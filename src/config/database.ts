import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";

configDotenv();

const sequelize =  new Sequelize({
 host: process.env.DB_HOST || 'localhost',
 port: Number(process.env.DB_PORT) || 5432,
 username: process.env.DB_USERNAME || 'postgres',
 password: process.env.DB_PASSWORD || '',
 database: process.env.DB_NAME || '',
 dialect: (process.env.DB_DIALECT || 'postgres') as 'postgres',
})

export default sequelize;