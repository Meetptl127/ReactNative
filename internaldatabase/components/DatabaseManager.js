import * as SQLite from "expo-sqlite";

let db = null;

const getDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("userdatabase.db");
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        mobile TEXT NOT NULL,
        email TEXT NOT NULL
      );
    `);
  }
  return db;
};

export const initDatabase = async () => {
  const database = await getDatabase();
  console.log("Database initialized successfully!");
};

export const addUser = async (username, mobile, email) => {
  const database = await getDatabase();
  const result = await database.runAsync(
    "INSERT INTO users (username, mobile, email) VALUES (?, ?, ?);",
    username,
    mobile,
    email
  );
  return result.lastInsertRowId;
};

export const deleteUser = async (id) => {
  const database = await getDatabase();
  await database.runAsync("DELETE FROM users WHERE id = ?;", id);
};
export const fetchUsersPaginated = async (limit, offset) => {
  const database = await getDatabase();
  const result = await database.getAllAsync(
    "SELECT * FROM users ORDER BY id DESC LIMIT ? OFFSET ?",
    limit,
    offset
  );
  return result;
};
export const updateUser = async (id, username, mobile, email) => {
  const database = await getDatabase();
  await database.runAsync(
    "UPDATE users SET username = ?, mobile = ?, email = ? WHERE id = ?;",
    username,
    mobile,
    email,
    id
  );
};
