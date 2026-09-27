import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const DB_PATH = fileURLToPath(new URL("../db.json", import.meta.url));

export function readDb() {
  return JSON.parse(readFileSync(DB_PATH, "utf-8"));
}

export function writeDb(data) {
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2) + "\n");
}

export function nextId(collection) {
  const max = collection.reduce(
    (m, item) => Math.max(m, Number(item.id) || 0),
    0,
  );
  return String(max + 1);
}
