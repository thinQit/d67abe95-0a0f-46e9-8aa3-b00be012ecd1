const fs = require("fs");
const path = require("path");

const schemaPath = path.join(process.cwd(), "prisma", "schema.prisma");
const schema = fs.readFileSync(schemaPath, "utf8");

const updated = schema
  .replace(/^\s*url\s*=.*$/m, "")
  .replace(/\n{3,}/g, "\n\n");

if (updated !== schema) {
  fs.writeFileSync(schemaPath, updated);
}
