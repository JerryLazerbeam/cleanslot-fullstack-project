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
  const statement = db.prepare(`
    UPDATE rules
    SET content = ?
    WHERE organization_id = ?
  `);

  return statement.run(content, organizationId);
}
