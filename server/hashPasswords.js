const mysql = require('mysql');
const bcrypt = require('bcrypt');

// Create database connection
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '', // Enter your database password if set
    database: 'predictions',
});

const saltRounds = 10; // Number of salt rounds

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
    console.log('Database connected successfully');
    
    // Hash passwords for admins
    const hashPasswordsForTable = async (tableName) => {
        const selectSQL = `SELECT * FROM ${tableName}`;
        db.query(selectSQL, async (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                return;
            }

            for (const user of results) {
                const hashedPassword = await bcrypt.hash(user.password, saltRounds);
                const updateSQL = `UPDATE ${tableName} SET password = ? WHERE id = ?`; // Adjust id field if necessary
                db.query(updateSQL, [hashedPassword, user.id], (err) => {
                    if (err) {
                        console.error('Error updating password:', err);
                    } else {
                        console.log(`Password updated for user ID ${user.id}`);
                    }
                });
            }
        });
    };

    // Hash passwords for both tables
    hashPasswordsForTable('admins_insurance');
    hashPasswordsForTable('users_insurance');
});
