import db from "../database";

export function getRules(organizationId: number) {
  const rules = db
    .prepare(
      `
      SELECT
        rule_id,
        content
      FROM rules
      WHERE organization_id = ?
    `,
    )
    .get(organizationId);

  return rules;
}

export function updateRules(organizationId: number, content: string) {
  // Skapar reglerna om de inte finns, annars uppdateras de
  const statement = db.prepare(`
    INSERT INTO rules (organization_id, content)
    VALUES (?, ?)
    ON CONFLICT (organization_id) DO UPDATE SET content = excluded.content
  `);

  return statement.run(organizationId, content);
}
