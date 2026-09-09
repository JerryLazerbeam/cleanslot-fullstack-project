import db from "./database";

const insertOrganization = db.prepare(`
    INSERT INTO organizations (name)
    VALUES (?)
`);

const organizationInfo = insertOrganization.run("Test Organization");

const organizationId = Number(organizationInfo.lastInsertRowid);

const insertUser = db.prepare(`
    INSERT INTO users (username, password, organization_id)
    VALUES (?, ?, ?)
`);

insertUser.run("1", "1", organizationId);

const insertSlot = db.prepare(`
    INSERT INTO washing_slots (organization_id, date, start_time, end_time)
    VALUES (?, ?, ?, ?)
`);

insertSlot.run(organizationId, "2026-09-10", "08:00", "09:00");
insertSlot.run(organizationId, "2026-09-10", "09:00", "10:00");
insertSlot.run(organizationId, "2026-09-10", "14:00", "16:00");

insertSlot.run(organizationId, "2026-09-11", "10:00", "11:00");
insertSlot.run(organizationId, "2026-09-11", "11:00", "12:00");

console.log("Organization, user and slots created");
