import Country from "../../../countries/entities/country";
import User from "../../../users/entitities/user";
import { DataSource, DataSourceOptions } from "typeorm";
import dotenv from "dotenv";
dotenv.config();


const type = process.env.DB_TYPE || "postgres";
const host = process.env.DB_HOST || "localhost";
const port = Number(process.env.DB_PORT) || 5432;
const username = process.env.DB_USERNAME || "postgres";
const password = process.env.DB_PASSWORD || "postgres";
const database = process.env.DB_DATABASE || "postgres";

const dataSourceOptions: DataSourceOptions = {
    type: type as any,
    host,
    port,
    username,
    password,
    database,
    logging: false,
    // synchronize: true,
    entities: [User, Country],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
