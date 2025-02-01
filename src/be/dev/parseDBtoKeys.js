const input = `	iID integer not null primary key autoincrement,
	title text not null,
	description text not null default "",
    parties text not null default "[]",
	type string not null,
	isFinalised integer not null default 0,
	dateCreated text not null default current_timestamp,
	fileURL text,
	meetingDate text,
	meetingURL text,
	meetingFileURL text`

console.log(input.split(",").map(str => {
    return "\""+str.trim().split(" ")[0]+"\"";
}).join(", "));