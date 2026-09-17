import db from "./database";

const insertOrganization = db.prepare(`
    INSERT INTO organizations (name)
    VALUES (?)
`);

const organizationInfo = insertOrganization.run("Test Organization");

const organizationId = Number(organizationInfo.lastInsertRowid);

const insertUser = db.prepare(`
    INSERT INTO users (username, password, organization_id, role)
    VALUES (?, ?, ?, ?)
`);

insertUser.run("1", "1", organizationId, "user");
insertUser.run("2", "2", organizationId, "user");
insertUser.run("a", "a", organizationId, "admin");

const insertSlot = db.prepare(`
    INSERT INTO washing_slots (organization_id, date, start_time, end_time)
    VALUES (?, ?, ?, ?)
`);

insertSlot.run(organizationId, "2026-09-10", "08:00", "09:00");
insertSlot.run(organizationId, "2026-09-10", "09:00", "10:00");
insertSlot.run(organizationId, "2026-09-10", "14:00", "16:00");

insertSlot.run(organizationId, "2026-09-11", "10:00", "11:00");
insertSlot.run(organizationId, "2026-09-11", "11:00", "12:00");

const insertEquipment = db.prepare(`
  INSERT INTO equipment (organization_id, name)
  VALUES (?, ?)
`);

insertEquipment.run(organizationId, "Tvättmaskin 1");
insertEquipment.run(organizationId, "Tvättmaskin 2");
insertEquipment.run(organizationId, "Tvättmaskin 3");
insertEquipment.run(organizationId, "Tvättmaskin 4");
insertEquipment.run(organizationId, "Torktumlare 1");
insertEquipment.run(organizationId, "Torkrum");

console.log("Organization, user and slots created");

const insertRules = db.prepare(`
  INSERT OR IGNORE INTO rules (organization_id, content)
  VALUES (?, ?)
`);

insertRules.run(
  organizationId,
  `• Respektera din bokade tvättid.

• Lämna tvättstugan ren och städad.

• Ta bort tvätt och tillhörigheter när din tid är slut.

• Om du inte längre kan nyttja din bokade tid, vänligen avboka den i god tid så att andra kan använda den.

• Felanmäl maskiner som inte fungerar.`,
);
