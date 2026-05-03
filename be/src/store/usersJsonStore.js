import fs from "node:fs";
import path from "node:path";

/**
 * Store user accounts in a plain JSON file (đơn giản cho đồ án học viên).
 * Env: USERS_JSON_FILE — đường dẫn tương đối thư mục chạy BE (vd: db/users.json)
 */
export function getUsersFilePath() {
  const relative = process.env.USERS_JSON_FILE || "db/users.json";
  return path.resolve(process.cwd(), relative);
}

export function ensureUsersDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

export function readUsers() {
  const filePath = getUsersFilePath();
  ensureUsersDir(filePath);

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]\n", "utf8");
    return [];
  }

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function writeUsers(users) {
  const filePath = getUsersFilePath();
  ensureUsersDir(filePath);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2) + "\n", "utf8");
}
