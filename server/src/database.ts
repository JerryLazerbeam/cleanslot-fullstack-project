import Database from "better-sqlite3";

const db = new Database("database.sqlite");

db.exec(`
CREATE TABLE IF NOT EXISTS organizations (
    organization_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);
    CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        organization_id INTEGER NOT NULL,
        role TEXT NOT NULL DEFAULT 'user',
        profile_image BLOB,
        profile_image_type TEXT,
        FOREIGN KEY (organization_id) REFERENCES organizations(organization_id)
);
CREATE TABLE IF NOT EXISTS washing_slots (
    slot_id INTEGER PRIMARY KEY AUTOINCREMENT,
    organization_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    FOREIGN KEY (organization_id) REFERENCES organizations(organization_id)
);
CREATE TABLE IF NOT EXISTS bookings (
    booking_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    slot_id INTEGER NOT NULL,
    FOREIGN KEY (user_id)
        REFERENCES users(user_id),
    FOREIGN KEY (slot_id)
        REFERENCES washing_slots(slot_id),
    UNIQUE (slot_id)
);
`);

export default db;
