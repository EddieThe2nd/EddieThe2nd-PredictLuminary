const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
//const nodemailer = require('nodemailer'); // For sending OTP emails

const app = express();
const PORT = 3002;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Create database connection
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '', // Enter your database password if set
    database: 'predictions',
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
    console.log('Database connected successfully');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Endpoint to fetch registering companies
app.get('/registering-companies', (req, res) => {
    const SQL = 'SELECT * FROM registeringcompanies';
    db.query(SQL, (err, results) => {
        if (err) {
            console.error('Error fetching registering companies:', err);
            res.status(500).send('Database query error');
        } else {
            console.log('Fetched registering companies:', results);
            res.send(results);
        }
    });
});

// Endpoint to register a company
app.post('/register-company', (req, res) => {
    const {
        companyName,
        contactPersonName,
        contactPersonSurname,
        contactPersonNumber,
        email,
        entityNumber
    } = req.body;

    console.log('Received data:', {
        companyName,
        contactPersonName,
        contactPersonSurname,
        contactPersonNumber,
        email,
        entityNumber
    });

    const SQL1 = 'INSERT INTO registeringcompanies (companyName, contactPersonName, contactPersonSurname, contactPersonNumber, email, entityNumber) VALUES (?, ?, ?, ?, ?, ?)';
    const SQL2 = 'INSERT INTO registeredcompanies (companyName, contactPersonName, contactPersonSurname, contactPersonNumber, email, entityNumber) VALUES (?, ?, ?, ?, ?, ?)';
    const Values = [companyName, contactPersonName, contactPersonSurname, contactPersonNumber, email, entityNumber];

    db.beginTransaction(err => {
        if (err) {
            console.error("Error starting transaction:", err);
            return res.send({ success: false, message: 'Transaction error', error: err });
        }

        db.query(SQL1, Values, (err, results) => {
            if (err) {
                console.error("Error inserting into registeringcompanies:", err);
                return db.rollback(() => {
                    res.send({ success: false, message: 'Database insertion error in registeringcompanies', error: err });
                });
            }
            console.log('Company inserted into registeringcompanies successfully');

            db.query(SQL2, Values, (err, results) => {
                if (err) {
                    console.error("Error inserting into registeredcompanies:", err);
                    return db.rollback(() => {
                        res.send({ success: false, message: 'Database insertion error in registeredcompanies', error: err });
                    });
                }
                console.log('Company inserted into registeredcompanies successfully');

                db.commit(err => {
                    if (err) {
                        console.error("Error committing transaction:", err);
                        return db.rollback(() => {
                            res.send({ success: false, message: 'Transaction commit error', error: err });
                        });
                    }
                    console.log('Transaction committed successfully');
                    res.send({ success: true, message: 'Company registered successfully in both tables!' });
                });
            });
        });
    });
});

// Endpoint to register a user
app.post('/register', (req, res) => {
    const { entityNumber, password } = req.body;

    console.log('Received registration data:', { entityNumber, password });

    const checkEntitySQL = 'SELECT * FROM registeringcompanies WHERE entityNumber = ?';
    db.query(checkEntitySQL, [entityNumber], (err, results) => {
        if (err) {
            console.error('Error checking entity number:', err);
            res.status(500).send({ success: false, message: 'Database query error' });
        } else if (results.length === 0) {
            console.log('Entity number does not exist in registeringcompanies');
            res.send({ success: false, message: 'Entity number does not exist' });
        } else {
            console.log('Entity number exists:', results);

            const insertUserSQL = 'INSERT INTO users_insurance (entityNumber, password) VALUES (?, ?)';
            db.query(insertUserSQL, [entityNumber, password], (err, results) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    res.status(500).send({ success: false, message: 'Database insertion error' });
                } else {
                    console.log('User registered successfully:', results);
                    res.send({ success: true, message: 'User registered successfully' });
                }
            });
        }
    });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { entityNumber, password } = req.body;

    console.log('Received login data:', { entityNumber, password });

    // Check in admins table first
    const adminLoginSQL = 'SELECT * FROM admins_insuranace WHERE username = ?';
    db.query(adminLoginSQL, [entityNumber.toLowerCase()], (err, adminResults) => {
        if (err) {
            console.error('Error during admin login:', err);
            return res.status(500).send({ error: 'Database query error' });
        }

        if (adminResults.length > 0) {
            if (password === adminResults[0].password) {
                console.log('Admin login successful');
                return res.send({ success: true, message: 'Login successful', role: 'admin' });
            }
            console.log('Invalid admin credentials');
            return res.send({ success: false, message: 'Invalid entity number or password' });
        }

        // Check in users table
        const userLoginSQL = 'SELECT * FROM users_insurance WHERE entityNumber = ?';
        db.query(userLoginSQL, [entityNumber.toLowerCase()], (err, userResults) => {
            if (err) {
                console.error('Error during user login:', err);
                return res.status(500).send({ error: 'Database query error' });
            }

            if (userResults.length > 0) {
                if (password === userResults[0].password) {
                    console.log('User login successful');
                    return res.send({ success: true, message: 'Login successful', role: 'user' });
                }
                console.log('Invalid user credentials');
                return res.send({ success: false, message: 'Invalid entity number or password' });
            }

            console.log('Invalid entity number or password');
            return res.send({ success: false, message: 'Invalid entity number or password' });
        });
    });
});

// Endpoint to check if email exists
app.post('/check-email', (req, res) => {
    const { email } = req.body;
    const query = 'SELECT * FROM users_insurance WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error checking email:', err);
            return res.status(500).send({ success: false, message: 'Database query error' });
        }
        res.send({ exists: results.length > 0 });
    });
});
