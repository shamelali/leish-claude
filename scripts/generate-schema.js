const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

// Helper functions
function quote(id) {
  return `"${id}"`;
}

function columnDDL(c) {
  const parts = [quote(c.name), c.type];
  if (c.notNull) parts.push("NOT NULL");
  if (c.default) parts.push(`DEFAULT ${c.default}`);
  return parts.join(" ");
}

function tableDDL(t) {
  const cols = t.columns.map(columnDDL);
  const pk = t.columns.find(c => c.primary);
  if (pk) cols.push(`PRIMARY KEY (${quote(pk.name)})`);

  const body = cols.join(",\n  ");
  const create = `CREATE TABLE IF NOT EXISTS ${quote(t.name)} (\n  ${body}\n);`;

  const indexes = (t.indexes || []).map(ix => {
    const cols = ix.columns.map(quote).join(", ");
    const uniq = ix.unique ? "UNIQUE " : "";
    return `CREATE ${uniq}INDEX IF NOT EXISTS ${quote(ix.name)} ON ${quote(t.name)} (${cols});`;
  });

  return [create, ...indexes].join("\n");
}

function main() {
  const raw = fs.readFileSync("schema.yaml", "utf8");
  const spec = yaml.load(raw);

  const sql = spec.schema.map(tableDDL).join("\n\n");

  const outDir = path.resolve("generated");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, `000${spec.version}_schema.sql`), sql);

  // Seed data for Station A, B, Studio Suite
  const seeds = `INSERT INTO studios (id, name, description, created_at)
VALUES
  (gen_random_uuid(), 'Station A', 'Open creative station', now()),
  (gen_random_uuid(), 'Station B', 'Second creative station', now()),
  (gen_random_uuid(), 'Studio Suite', 'Private studio suite', now())
ON CONFLICT (name) DO NOTHING;`;

  fs.writeFileSync(path.join(outDir, "init_studios.sql"), seeds);

  console.log("Schema and seed files generated in ./generated");
}

main();