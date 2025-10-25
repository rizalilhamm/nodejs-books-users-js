const Database = require('better-sqlite3');
const path = require('path');

// Determine the path to the database file (in the parent directory)
// Assuming your project structure is /parent/project-folder/config/db-config.js
const DB_PATH = path.join(__dirname, '..', '..', 'app_data.db'); // '..' jumps up one level

// Open the database connection
const db = new Database(DB_PATH); 

console.log(`Connected to the SQLite database: ${DB_PATH}`);

// Enable foreign key constraints (recommended for integrity)
db.exec('PRAGMA foreign_keys = ON;');

// Function to initialize the database schema
function initializeDatabase() {
    // 1. Create the fundraisers table
    db.prepare(`
        CREATE TABLE IF NOT EXISTS fundraisers (
            id INTEGER PRIMARY KEY,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            Tenant TEXT NOT NULL,
            City TEXT
        )
    `).run();

    // 2. Create the campaigns table (using 'campaigns' for the table name for clarity)
    db.prepare(`
        CREATE TABLE IF NOT EXISTS campaigns (
            id INTEGER PRIMARY KEY,
            title TEXT,
            fundraiser_id INTEGER NOT NULL,
            amounts INTEGER NOT NULL,  -- Handles BIGINT
            currency TEXT,
            City TEXT,
            FOREIGN KEY (fundraiser_id) REFERENCES fundraisers(id)
        )
    `).run();

    // 3. Create the donors table (using 'donors' for the table name)
    db.prepare(`
        CREATE TABLE IF NOT EXISTS donors (
            id INTEGER PRIMARY KEY,
            fullname TEXT,
            firstName TEXT,
            Tenant TEXT,
            City TEXT,
            currency TEXT,
            campaign_id INTEGER,
            FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
        )
    `).run();

    console.log('Database tables checked/created.');
}

// Run the initialization when the application starts
initializeDatabase();

// Export the database object
module.exports = db;