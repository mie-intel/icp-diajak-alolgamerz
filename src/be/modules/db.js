import initSqlJs from "sql.js/dist/sql-asm.js";
import { log } from "./log.js";

const initialQuery = 
`
create table if not exists users (
    uID integer not null primary key autoincrement,
	businessName text not null unique,
    email text not null,
    principal text not null,
    isVerified integer not null default 0,
    contracts text not null default "[]"
);
create table if not exists contracts (
    cID integer not null primary key autoincrement,
	contractName text not null,
	contractDescription text not null default "",
	contractParties text not null default "[]",
	isFinalised integer not null default 0,
	lastModified text not null default current_timestamp,
	itemIDs text not null default "[]",
	keyExchange text not null default "[]"
);
create trigger contracts_modified_update_time
after update of cID, contractName, contractDescription, contractParties, isFinalised, itemIDs, keyExchange on contracts
for each row begin
    update contracts set lastModified = current_timestamp;
end;

create table if not exists items (
	iID integer not null primary key autoincrement,
	cID integer not null references contracts (cID) on delete cascade on update cascade,
	title text not null,
	description text not null default "",
    parties text not null default "[]",
	type string not null,
	isFinalised integer not null default 0,
	dateCreated text not null default current_timestamp,
    /* IF_TYPE == file */
	fileURL text,

    /* IF_TYPE == meeting */
	meetingDate text,
	meetingURL text,
	meetingFileURL text
);
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
function joinSQLFilter(filter) {
	if(!filter || filter.length === 0) {return "";}
	return "where " + filter.join(" and ");
}
function queryToObj([queries]) {
	if(!queries) {return [];}
	const arr = [];
	for (let i = 0; i < queries.values.length; i++) {
		const values = queries.values[i];
		const obj = {};
		for (let j = 0; j < values.length; j++) {
			obj[queries.columns[j]] = values[j];
		}
		arr.push(obj);
	}
	return arr;
}

export class Model {
	tableName = "";
	keys = [];

	constructor (tableName, keys) {
		this.keys = keys;
		this.tableName = tableName;
	}

	get(filter = {}) {
		const sqlFilter = [], sqlInput = {};
	
		for (let i = 0; i < this.keys.length; i++) {
			const key = this.keys[i];
			if(filter[key] !== undefined) {
				sqlFilter.push(`${key} = :${key}`);
				sqlInput[`:${key}`] = filter[key];
			}
		}
	
		const sqlQuery = `select * from ${this.tableName} ${joinSQLFilter(sqlFilter)};`;
		return queryToObj(db.exec(sqlQuery, sqlInput));
	}

	delete(filter = {}) {
		const sqlFilter = [], sqlInput = {};
	
		for (let i = 0; i < this.keys.length; i++) {
			const key = this.keys[i];
			if(filter[key] !== undefined) {
				sqlFilter.push(`${key} = :${key}`);
				sqlInput[`:${key}`] = filter[key];
			}
		}
	
		const sqlQuery = `delete from ${this.tableName} ${joinSQLFilter(sqlFilter)};`;
		return queryToObj(db.exec(sqlQuery, sqlInput));
	}
			
	create(input = {}) {
		const sqlColumns = [], sqlInput = {};
	
		for (let i = 0; i < this.keys.length; i++) {
			const key = this.keys[i];
			if(input[key] !== undefined) {
				sqlColumns.push(key);
				sqlInput[`:${key}`] = input[key];
			}
		}
	
		const sqlQuery = `insert into ${this.tableName} (${sqlColumns.join(", ")}) values (${sqlColumns.map(col=>`:${col}`).join(", ")});`;
		return queryToObj(db.exec(sqlQuery, sqlInput));
	}

	update(input = {}, filter = {}) {
		const sqlUpdate = [], sqlFilter = [], sqlInput = {};
	
		for (let i = 0; i < this.keys.length; i++) {
			const key = this.keys[i];
			if(input[key] !== undefined) {
				sqlUpdate.push(`${key} = :u${key}`);
				sqlInput[`:u${key}`] = input[key];
			}
			if(filter[key] !== undefined) {
				sqlFilter.push(`${key} = :f${key}`);
				sqlInput[`:f${key}`] = filter[key];
			}
		}
	
		const sqlQuery = `update ${this.tableName} set ${sqlUpdate.join(", ")} ${joinSQLFilter(sqlFilter)};`;
		return queryToObj(db.exec(sqlQuery, sqlInput));
	}
}