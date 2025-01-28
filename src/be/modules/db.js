import initSqlJs from "sql.js/dist/sql-asm.js";
import { log } from "./log";

// const initialQuery = 
// `
// drop database if exists hackhaton;
// create database hackhaton;
// use hackhaton;

// drop table if exists users;
// create table users (
//     uID int auto_increment,
// 	business_name varchar(64) unique not null,
//     email varchar(64) not null,
//     password varchar(64) not null,
//     created_at datetime not null default current_timestamp(),
//     updated_at datetime not null default current_timestamp(),
//     primary key(uID)
// );
// `;

const initialQuery = 
`
create table users (uID int);
`;

export let db;
export async function initDB(bytes = Uint8Array.from([])) {
    const SQL = await initSqlJs({});
    db = new SQL.Database(bytes);

    log("Initiated!");
    if(bytes.length === 0) {
        log("Running query!");
        db.exec(initialQuery);
    }
}