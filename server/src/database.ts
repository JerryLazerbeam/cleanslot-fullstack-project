import Database from "better-sqlite3";

const db = new Database("database.sqlite");

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        profile_image BLOB,
        profile_image_type TEXT
    )
`);

export default db;
