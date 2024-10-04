const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

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

app.get('/', (req, res) => {
    res.send('Hello World!');
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
    const values = [companyName, contactPersonName, contactPersonSurname, contactPersonNumber, email, entityNumber];

    db.beginTransaction(err => {
        if (err) {
            console.error("Error starting transaction:", err);
            return res.status(500).send({ success: false, message: 'Failed to start transaction', error: err });
        }

        db.query(SQL1, values, (err) => {
            if (err) {
                return db.rollback(() => {
                    console.error("Error inserting into registeringcompanies:", err);
                    res.status(500).send({ success: false, message: 'Database insertion error in registeringcompanies', error: err });
                });
            }

            db.query(SQL2, values, (err) => {
                if (err) {
                    return db.rollback(() => {
                        console.error("Error inserting into registeredcompanies:", err);
                        res.status(500).send({ success: false, message: 'Database insertion error in registeredcompanies', error: err });
                    });
                }

                db.commit(err => {
                    if (err) {
                        return db.rollback(() => {
                            console.error("Error committing transaction:", err);
                            res.status(500).send({ success: false, message: 'Transaction commit error', error: err });
                        });
                    }
                    res.status(200).send({ success: true, message: 'Company registered successfully in both tables!' });
                });
            });
        });
    });
});



// Endpoint to register a user
app.post('/register', async (req, res) => {
    const { entityNumber, password, email } = req.body; // Ensure email is part of the registration data

    console.log('Received registration data:', { entityNumber, password, email });

    // Check if the user is already registered
    const checkUserSQL = 'SELECT * FROM users_insurance WHERE entityNumber = ?';
    db.query(checkUserSQL, [entityNumber], async (err, userResults) => {
        if (err) {
            console.error('Error checking user registration:', err);
            return res.status(500).send({ success: false, message: 'Database query error' });
        } else if (userResults.length > 0) {
            console.log('User already registered:', userResults);
            return res.send({ success: false, message: 'User has already been registered' });
        } else {
            // If user does not exist, proceed with checking entity number
            const checkEntitySQL = 'SELECT * FROM registeringcompanies WHERE entityNumber = ?';
            db.query(checkEntitySQL, [entityNumber], (err, results) => {
                if (err) {
                    console.error('Error checking entity number:', err);
                    return res.status(500).send({ success: false, message: 'Database query error' });
                } else if (results.length === 0) {
                    console.log('Entity number does not exist in registeringcompanies');
                    return res.send({ success: false, message: 'Entity number does not exist' });
                } else {
                    console.log('Entity number exists:', results);

                    // First, insert into user_subscriptions table
                    const insertSubscriptionSQL = 'INSERT INTO user_subscriptions(entityNumber, subscription_planID, subscription_plan, start_date, end_date, paystack_customer_code, paystack_subscriptions_code) VALUES (?, ?, ?, ?, ?, ?, ?)';
                    const startDate = '2000-01-01'; // Use appropriate date values
                    const endDate = '2000-01-01'; // Use appropriate date values

                    db.query(insertSubscriptionSQL, [entityNumber, 'inactive_sub', 'Inactive Subscription', startDate, endDate, 'none', 'none'], (err, subResults) => {
                        if (err) {
                            console.error('Error inserting user subscription:', err);
                            return res.status(500).send({ success: false, message: 'Database insertion error for subscription' });
                        }

                        console.log('User subscription registered successfully:', subResults);

                        // Fetch the sub_ID of the inserted subscription
                        const fetchSubIDSQL = 'SELECT sub_ID FROM user_subscriptions WHERE entityNumber = ?';
                        db.query(fetchSubIDSQL, [entityNumber], async (err, subIDResults) => {
                            if (err) {
                                console.error('Error fetching subscription ID:', err);
                                return res.status(500).send({ success: false, message: 'Database query error for subscription ID' });
                            }

                            const sub_ID = subIDResults.length > 0 ? subIDResults[0].sub_ID : null; // Get the subscription ID

                            if (!sub_ID) {
                                console.error('Subscription ID is null');
                                return res.status(400).send({ success: false, message: 'Failed to retrieve subscription ID' });
                            }

                            // Hash the password before inserting into the database
                            try {
                                const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10

                                // Insert into users_insurance table
                                const insertUserSQL = 'INSERT INTO users_insurance (entityNumber, email, password, sub_ID, subscription_planID) VALUES (?, ?, ?, ?, ?)';
                                db.query(insertUserSQL, [entityNumber, email, hashedPassword, sub_ID, 'inactive_sub'], (err, results) => {
                                    if (err) {
                                        console.error('Error inserting user:', err);
                                        return res.status(500).send({ success: false, message: 'Database insertion error' });
                                    }

                                    console.log('User registered successfully:', results);
                                    res.send({ success: true, message: 'User and subscription registered successfully' });
                                });
                            } catch (hashErr) {
                                console.error('Error hashing password:', hashErr);
                                return res.status(500).send({ success: false, message: 'Password hashing error' });
                            }
                        });
                    });
                }
            });
        }
    });
});




//Endpoint to handle user login
app.post('/login', (req, res) => {
    const { entityNumber, password } = req.body;

    // Check if the entityNumber is for an admin or a user
    const adminLoginSQL = 'SELECT * FROM admins_insurance WHERE username = ?';
    db.query(adminLoginSQL, [entityNumber.toLowerCase()], async (err, adminResults) => {
        if (err) {
            console.error('Error during admin login query:', err);
            return res.status(500).send({ error: 'Database query error' });
        }

        if (adminResults.length > 0) {
            // Admin found, proceed to check password
            const admin = adminResults[0];
            try {
                const passwordMatch = await bcrypt.compare(password, admin.password);
                if (passwordMatch) {
                    console.log('Admin login successful');
                    
                    // Log login activity
                    const loginActivitySQL = 'INSERT INTO login_activity (entityNumber) VALUES (?)';
                    db.query(loginActivitySQL, [entityNumber], (err) => {
                        if (err) {
                            console.error('Error logging admin login activity:', err);
                        }
                    });

                    return res.send({ 
                        success: true, 
                        message: 'Login successful', 
                        role: 'admin',
                        entityNumber: entityNumber,
                        subscriptionStatus: admin.subscription_status
                    });
                } else {
                    console.log('Invalid password for admin');
                    return res.send({ success: false, message: 'Invalid entity number or password' });
                }
            } catch (compareError) {
                console.error('Error comparing passwords:', compareError);
                return res.status(500).send({ error: 'Error comparing passwords' });
            }
        } else {
            // Check if entityNumber is a user
            const userLoginSQL = 'SELECT * FROM users_insurance WHERE entityNumber = ?';
            db.query(userLoginSQL, [entityNumber.toLowerCase()], async (err, userResults) => {
                if (err) {
                    console.error('Error during user login query:', err);
                    return res.status(500).send({ error: 'Database query error' });
                }

                if (userResults.length > 0) {
                    // User found, proceed to check password
                    const user = userResults[0];
                    try {
                        const passwordMatch = await bcrypt.compare(password, user.password);
                        if (passwordMatch) {
                            console.log('User login successful');

                            // Log login activity
                            const loginActivitySQL = 'INSERT INTO login_activity (entityNumber) VALUES (?)';
                            db.query(loginActivitySQL, [entityNumber], (err) => {
                                if (err) {
                                    console.error('Error logging user login activity:', err);
                                }
                            });

                            return res.send({ 
                                success: true, 
                                message: 'Login successful', 
                                role: 'user',
                                entityNumber: entityNumber,
                                subscriptionStatus: user.subscription_status
                            });
                        } else {
                            console.log('Invalid password for user');
                            return res.send({ success: false, message: 'Invalid entity number or password' });
                        }
                    } catch (compareError) {
                        console.error('Error comparing passwords:', compareError);
                        return res.status(500).send({ error: 'Error comparing passwords' });
                    }
                } else {
                    console.log('Invalid entity number or password');
                    return res.send({ success: false, message: 'Invalid entity number or password' });
                }
            });
        }
    });
});


// Endpoint to get subscription status
app.get('/api/get-subscription-status', (req, res) => {
    const entityNumber = req.query.entityNumber;

    if (!entityNumber) {
        return res.status(400).json({ success: false, message: 'Entity number is required' });
    }

    console.log('Received entity number:', entityNumber);

    const query = 'SELECT subscription_status FROM users_insurance WHERE entityNumber = ?';
    db.query(query, [entityNumber], (err, results) => {
        if (err) {
            console.error('Error fetching subscription status:', err);
            return res.status(500).send({ success: false, message: 'Database query error' });
        }

        if (results.length > 0) {
            const subscriptionStatus = results[0].subscription_status;
            res.json({ success: true, subscription_status: subscriptionStatus });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    });
});

// Endpoint to get recent login activity
app.get('/recent-login-activity', (req, res) => {
    // console.log(req.body)
    // console.log(req.query)
    const { entityNumber } = req.query;
  
    // // USE THIS IS YOU WANTS BY ENTITY, FOR TESTING LET GET ALL
    // if (!entityNumber) {
    //     return res.status(400).json({ success: false, message: 'Entity number is required' });
    // }
  
    console.log('Fetching login activity for entity number:', entityNumber); // Debug log
  
    // SQL query to fetch login activity
    // const query = 'SELECT * FROM login_activity WHERE entityNumber = ? ORDER BY login_time DESC';
    const query = 'SELECT * FROM login_activity ORDER BY login_time DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching login activity:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
  
        console.log('Login activity results:', results); // Debug log
        res.json({
            success: true,
            loginActivity: results
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



// Paystack webhook endpoint
app.post('/paystack-webhook', (req, res) => {
    const event = req.body;

    console.log('Received Paystack webhook event:', event);

    // Handle the webhook event here
    // You can check the type of event and perform appropriate actions

    res.status(200).send('Webhook received');
});


// Endpoint to reset password
app.post('/reset-password', async (req, res) => {
    const { entityNumber, newPassword } = req.body; // Use entityNumber instead of email

    console.log('Attempting to reset password for entity number:', { entityNumber });

    try {
        // Hash the new password using bcrypt
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        const updateQuery = 'UPDATE users_insurance SET password = ? WHERE entityNumber = ?';
        db.query(updateQuery, [hashedPassword, entityNumber], (err, result) => {
            if (err) {
                console.error('Failed to update password:', err);
                return res.status(500).json({ success: false, message: 'Database error' });
            }

            if (result.affectedRows === 0) {
                console.log('User not found for entity number:', { entityNumber });
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            console.log('Password updated successfully for entity number:', { entityNumber });
            res.json({ success: true, message: 'Password updated successfully' });
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


// Subscription fetch endpoint
app.get('/subscription/:entityNumber', (req, res) => {
    const entityNumber = req.params.entityNumber;
    console.log(`Fetching subscription details for entityNumber: ${entityNumber}`);

    const query = `
        SELECT us.subscription_plan
        FROM user_subscriptions us
        WHERE us.entityNumber = ?`;

    db.query(query, [entityNumber], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length > 0) {
            console.log(`Subscription found: ${results[0].subscription_plan}`);
            res.status(200).json({ 
                subscription: results[0].subscription_plan 
            });
        } else {
            console.log('No active subscription found for entityNumber');
            res.status(404).json({ message: 'No active subscription found' });
        }
    });
});
  
app.post('/update-subscription', async (req, res) => {
    const { entityNumber, subscription_planID, subscription_plan, start_date, end_date } = req.body;

    try {
        // Check if the user exists in the users_insurance table
        const checkUserQuery = 'SELECT * FROM users_insurance WHERE entityNumber = ?';
        db.query(checkUserQuery, [entityNumber], (err, userInsuranceRows) => {
            if (err) {
                console.error('Error querying users_insurance:', err);
                return res.status(500).send(`Database query error: ${err.message}`);
            }

            if (userInsuranceRows.length === 0) {
                // User does not exist in users_insurance table
                return res.status(404).send('User does not exist');
            }

            // Update the subscription_planID in the users_insurance table
            const updateUserInsuranceQuery = `
                UPDATE users_insurance
                SET subscription_planID = ?
                WHERE entityNumber = ?
            `;

            db.query(updateUserInsuranceQuery, [subscription_planID, entityNumber], (err) => {
                if (err) {
                    console.error('Error updating users_insurance:', err);
                    return res.status(500).send(`Error updating users_insurance: ${err.message}`);
                }

                // Proceed with updating user_subscriptions table
                const updateSubscriptionQuery = `
                    UPDATE user_subscriptions
                    SET subscription_planID = ?, subscription_plan = ?, start_date = ?, end_date = ?
                    WHERE entityNumber = ?
                `;

                db.query(updateSubscriptionQuery, [subscription_planID, subscription_plan, start_date, end_date, entityNumber], (err) => {
                    if (err) {
                        console.error('Error updating user_subscriptions:', err);
                        return res.status(500).send(`Error updating user_subscriptions: ${err.message}`);
                    }

                    res.status(200).send('Subscription updated successfully');
                    console.log('Update Successful');
                });
            });
        });
    } catch (error) {
        console.error('Error updating subscription and insurance:', error);
        res.status(500).send(`Error updating subscription and insurance: ${error.message}`);
    }
});

// Function to check and update expired subscriptions
const checkAndUpdateExpiredSubscriptions = () => {
    console.log('Checking for expired subscriptions...');

    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    console.log('Current date:', currentDate);

    // Query to find expired subscriptions
    const findExpiredSubscriptionsQuery = `
        SELECT entityNumber
        FROM user_subscriptions
        WHERE end_date < ? AND subscription_planID != 'inactive_sub'
    `;

    db.query(findExpiredSubscriptionsQuery, [currentDate], (err, expiredSubscriptions) => {
        if (err) {
            console.error('Error finding expired subscriptions:', err);
            return;
        }

        console.log('Expired subscriptions found:', expiredSubscriptions);

        if (expiredSubscriptions.length === 0) {
            console.log('No expired subscriptions found.');
            return;
        }

        console.log(`Found ${expiredSubscriptions.length} expired subscription(s). Updating...`);

        // Collect entityNumbers from expired subscriptions
        const entityNumbers = expiredSubscriptions.map(sub => sub.entityNumber);

        console.log('Entity numbers to update:', entityNumbers);

        // Update user_subscriptions to set status to 'Inactive Subscription'
        const updateSubscriptionsQuery = `
            UPDATE user_subscriptions
            SET subscription_planID = 'inactive_sub', subscription_plan = 'Inactive Subscription'
            WHERE end_date < ? AND subscription_planID != 'inactive_sub'
        `;

        db.query(updateSubscriptionsQuery, [currentDate], (err) => {
            if (err) {
                console.error('Error updating user_subscriptions:', err);
                return;
            }

            console.log('Expired subscriptions updated in user_subscriptions.');

            // Update users_insurance to set subscription_planID to 'inactive_sub'
            const updateInsuranceQuery = `
                UPDATE users_insurance
                SET subscription_planID = 'inactive_sub'
                WHERE entityNumber IN (?)
            `;

            // Convert entityNumbers to a format suitable for SQL IN clause
            const placeholders = entityNumbers.map(() => '?').join(',');
            const updateInsuranceQueryFormatted = updateInsuranceQuery.replace('(?)', `(${placeholders})`);

            db.query(updateInsuranceQueryFormatted, entityNumbers, (err) => {
                if (err) {
                    console.error('Error updating users_insurance:', err);
                    return;
                }

                console.log('Expired subscriptions updated in users_insurance.');
            });
        });
    });
};

// Schedule the function to run every minute
setInterval(checkAndUpdateExpiredSubscriptions, 60 * 1000); // Runs every 60 seconds (1 minute)

// Endpoint to check if entity number exists
app.post('/api/check-entity', (req, res) => {
    const entityNumber = req.body.entityNumber;
    console.log('Checking if entity number exists:', { entityNumber });
    const query = 'SELECT * FROM users_insurance WHERE entityNumber = ?';

    db.query(query, [entityNumber], (err, results) => {
        if (err) {
            console.error('Error checking entity number:', err);
            res.status(500).send({ error: 'Database error' });
        } else if (results.length > 0) {
            console.log('Found entity number:', { entityNumber });
            res.send({ exists: true, email: results[0].email }); // Sending email associated with entityNumber
        } else {
            console.log('Cannot find entity number:', { entityNumber });
            res.send({ exists: false });
        }
    });
});









// Endpoint to get user subscription details
app.get('/user-subscription', (req, res) => {
    const { entityNumber } = req.query; // Get entityNumber from query params

    // Validate entity number
    if (!entityNumber) {
        return res.status(400).json({ success: false, message: 'Entity number is required' });
    }

    console.log('Fetching subscription details for entity number:', entityNumber); // Debug log

    // Query to fetch subscription details for the user
    const query = `
        SELECT 
            subscription_planID, 
            subscription_plan, 
            start_date, 
            end_date, 
            paystack_customer_data, 
            paystack_subscriptions_code 
        FROM 
            user_subscriptions 
        WHERE 
            entityNumber = ?
    `;

    db.query(query, [entityNumber], (err, results) => {
        if (err) {
            console.error('Error fetching subscription details:', err);
            return res.status(500).json({ success: false, message: 'Database query error' });
        }

        // Check if results are found
        if (results.length > 0) {
            const subscriptionDetails = results[0];
            res.json({ success: true, subscriptionDetails });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    });
});
