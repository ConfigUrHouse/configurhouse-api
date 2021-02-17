import * as dotenv from "dotenv";
import { Sequelize } from 'sequelize';
dotenv.config();

const instance = new Sequelize(process.env.DB as string, process.env.DB_USER as string, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_HOST_PORT as string),
  dialect: process.env.DB_DIALECT as any,
});

export const db : Record<string,any> = {
  sequelize: Sequelize,
  instance: instance
}