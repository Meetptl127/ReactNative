1. Importing SQLite
   javascript
   Copy
   import \* as SQLite from "expo-sqlite";
   Purpose: Imports the expo-sqlite library, which allows you to interact with a SQLite database in a React Native app.

What it does: Provides functions to open, query, and manage a local SQLite database.

2. Database Initialization
   javascript
   Copy
   let db = null;

const getDatabase = async () => {
if (!db) {
db = await SQLite.openDatabaseAsync("userdatabase.db");
await db.execAsync(`      PRAGMA journal_mode = WAL;
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
Purpose: Ensures the database is initialized and ready to use.

Details:

let db = null: A variable to store the database connection. It starts as null and is initialized only once.

getDatabase Function:

Checks if the database (db) is already open. If not, it opens the database using SQLite.openDatabaseAsync("userdatabase.db").

Creates a users table if it doesn’t already exist. The table has 4 columns:

id: A unique identifier for each user (auto-incremented).

username: Stores the user’s name (required).

mobile: Stores the user’s mobile number (required).

email: Stores the user’s email (required).

PRAGMA journal_mode = WAL: Optimizes the database for better performance by enabling Write-Ahead Logging (WAL) mode.

Returns: The database connection (db).

3. Initialize Database
   javascript
   Copy
   export const initDatabase = async () => {
   const database = await getDatabase();
   console.log("Database initialized successfully!");
   };
   Purpose: Initializes the database and logs a success message.

Details:

Calls getDatabase() to ensure the database is open and the users table exists.

Logs "Database initialized successfully!" to the console once done.

4. Add a User
   javascript
   Copy
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
   Purpose: Adds a new user to the users table.

Details:

Uses database.runAsync to execute an SQL INSERT query.

The query inserts a new row into the users table with the provided username, mobile, and email.

Parameters:

username: The user’s name.

mobile: The user’s mobile number.

email: The user’s email.

Returns: The id of the newly inserted user (result.lastInsertRowId).

5. Delete a User
   javascript
   Copy
   export const deleteUser = async (id) => {
   const database = await getDatabase();
   await database.runAsync("DELETE FROM users WHERE id = ?;", id);
   };
   Purpose: Deletes a user from the users table.

Details:

Uses database.runAsync to execute an SQL DELETE query.

The query deletes the row from the users table where the id matches the provided value.

Parameters:

id: The unique identifier of the user to delete.

6. Fetch Users with Pagination
   javascript
   Copy
   export const fetchUsersPaginated = async (limit, offset) => {
   const database = await getDatabase();
   const result = await database.getAllAsync(
   "SELECT \* FROM users ORDER BY id DESC LIMIT ? OFFSET ?",
   limit,
   offset
   );
   return result;
   };
   Purpose: Fetches a paginated list of users from the users table.

Details:

Uses database.getAllAsync to execute an SQL SELECT query.

The query fetches rows from the users table:

ORDER BY id DESC: Orders the results by id in descending order (newest users first).

LIMIT ?: Limits the number of rows returned (e.g., 4 users per page).

OFFSET ?: Skips a specified number of rows (e.g., for pagination).

Parameters:

limit: The maximum number of users to fetch.

offset: The starting point for fetching users (used for pagination).

Returns: An array of user objects.

7. Update a User
   javascript
   Copy
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
   Purpose: Updates an existing user’s details in the users table.

Details:

Uses database.runAsync to execute an SQL UPDATE query.

The query updates the username, mobile, and email of the user with the specified id.

Parameters:

id: The unique identifier of the user to update.

username: The new username.

mobile: The new mobile number.

email: The new email.

How It All Works Together
Database Setup:

The database is initialized when the app starts, and the users table is created if it doesn’t exist.

CRUD Operations:

Create: Use addUser to insert new users into the database.

Read: Use fetchUsersPaginated to fetch users in chunks (e.g., 4 users at a time) for pagination.

Update: Use updateUser to modify user details.

Delete: Use deleteUser to remove users from the database.

Pagination:

The fetchUsersPaginated function allows fetching users in small batches, which is useful for displaying large datasets efficiently.

Example Workflow
Initialize Database:

Call initDatabase() when the app starts to ensure the database is ready.

Add Users:

Use addUser("John", "1234567890", "john@example.com") to add a new user.

Fetch Users:

Use fetchUsersPaginated(4, 0) to fetch the first 4 users.

Use fetchUsersPaginated(4, 4) to fetch the next 4 users (for pagination).

Update a User:

Use updateUser(1, "John Doe", "0987654321", "johndoe@example.com") to update the user with id = 1.

Delete a User:

Use deleteUser(1) to delete the user with id = 1.

This code provides a robust and efficient way to manage a local SQLite database in a React Native app! 🚀
