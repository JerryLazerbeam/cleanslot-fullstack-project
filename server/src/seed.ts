import db from "./database";

const insertUser = db.prepare(`
    INSERT INTO users (username, password)
    VALUES (?, ?)
`);

insertUser.run("1", "1");

console.log("Test user created");