const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();
// Use CORS middleware
app.use(cors());

// Use express.json() middleware to parse JSON request body
app.use(express.json());

// Create a MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Create Nodemailer transporter with credentials directly
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, // Use 465 for SSL or 587 for STARTTLS
    secure: false, // Set to true if using port 465
    auth: {
        user: 'Mystirio.02@gmail.com',
        pass: 'tmztefariwffdwbk'
    },
    tls: {
        rejectUnauthorized: false // Disable TLS verification for development
    }
});

const jwtSecret = process.env.JWT_SECRET;

function convertISOToDateTime(isoDateStr) {
    const date = new Date(isoDateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const generateToken = (userId) => {
    return jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' });  // Token expires in 1 hour
};

app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Protected route accessed' });
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;

        next();
    });
};

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
const otpStore = {}; 



app.post('/addthink', authenticateToken, (req, res) => {
    // Extract userId from req.user set by authenticateToken middleware
    const userId = req.user.userId;

    // Extract other data from request body
    const {
        name,
        email,
        phoneNumber,
        birthDate,
        gender,
        emergencyContactName,
        emergencyContactNumber,
        physician,
        insurance,
        insuranceNumber,
        allergies,
        currentMedication, // Corrected name
        familyHistory,
        identificationType,
        identificationNumber,
        pastMedication // Corrected name
    } = req.body;

    // Check if userId is present
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    // Prepare the query and values for insertion
    const query = `INSERT INTO medical (fullname, email, phonenumber, birthdate, gender, emergencyname, emergencyphonenumber, doctor, insurance, insurancenumber, allergies, currentmedication, familymedical, identification, identificationnumber, userid, pastmedical)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        name,
        email,
        phoneNumber,
        birthDate,
        gender,
        emergencyContactName,
        emergencyContactNumber,
        physician,
        insurance,
        insuranceNumber,
        allergies,
        currentMedication, // Corrected name
        familyHistory,
        identificationType,
        identificationNumber,
        userId,
        pastMedication // Corrected name
    ];

    db.query(query, values, (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            res.status(500).json({ error: 'Server error' });
            return;
        }
        res.status(200).json({ message: 'Data inserted successfully' });
    });
});

app.post('/check', (req, res) => {
    const { name, email } = req.body;

    // Validate email presence
    if (!email) return res.status(400).send('Email is required');

    // Insert user into the database
    const insertQuery = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(insertQuery, [name, email], (err, insertResults) => {
        if (err) {
            console.error('Error inserting user into database:', err);
            return res.status(500).send('Failed to insert user into database');
        }

        // Get the last inserted user ID
        const lastInsertIdQuery = 'SELECT id FROM users WHERE name = ? AND email = ?';
        db.query(lastInsertIdQuery, [name, email], (err, idResults) => {
            if (err) {
                console.error('Error fetching user ID:', err);
                return res.status(500).send('Failed to fetch user ID');
            }

            if (idResults.length === 0) {
                return res.status(404).send('User not found');
            }

            // Generate a token for the user
            const userId = idResults[0].id;
            const token = generateToken(userId);

            // Return the response with the user ID and token
            res.json({ message: 'User inserted successfully', userId: userId, token: token });
        });
    });
});



app.post('/send', (req, res) => {
    const { name, email } = req.body;

    // Check if email is provided
    if (!email) return res.status(400).json({ message: 'Email is required', value: false });

    const lastInsertIdQuery = 'SELECT id FROM users WHERE name = ? AND email = ?';

    db.query(lastInsertIdQuery, [name, email], (err, idResults) => {
        if (err) {
            console.error('Error fetching user ID:', err);
            return res.status(500).json({ message: 'Failed to fetch user ID', value: false });
        }

        if (idResults.length === 0) {
            // User not found
            const value = false;
            const otp = generateOTP();

            // Save OTP to the in-memory store
            otpStore[email] = otp;
            console.log('Request body:', req.body);
            console.log('Generated OTP:', otp);
            console.log('Stored OTP:', otpStore[email]);

            // Send OTP via email
            transporter.sendMail({
                from: 'mystirio.02@gmail.com',
                to: email,
                subject: 'Your OTP Code',
                text: `Hello ${name}, your OTP code is: ${otp}`
            }, (err) => {
                if (err) {
                    console.error('Error sending OTP email:', err);
                    return res.status(500).json({ message: 'Failed to send OTP email', value: false });
                }

                // Respond once the OTP is successfully sent
                res.json({ message: 'OTP sent to your email', otp: otp, value: false });
            });

        } else {
            // User found
            const userId = idResults[0].id;
            const token = generateToken(userId);

            // Return the response with the user ID and token
            res.json({ message: 'User inserted successfully', userId: userId, token: token , value: true });
            
        }
    });
});

app.post('/appointements',(req , res) =>
{
    const {doctor , appointmentReason, additionalComments , birthDate , userId  } = req.body
    const query = 'INSERT INTO appointments  (physician_name ,appointment_reason ,additional_comments ,birthdate ,userid) VALUES (?, ? , ?, ?, ?)';
    db.query(query , [doctor , appointmentReason, additionalComments , birthDate , userId] , (err, resultat) =>{
        if (err) {
            console.error('Error inserting user into database:', err);
            return res.status(500).send('Failed to insert user into database');
        }
        res.status(201).json({ message: 'Task added successfully' });
    })
});

app.get('/admin' , (req,res)=>
{
    const otp = generateOTP();
    const email = 'mahdiboukhouima14@gmail.com';
    const type = 'admin'
    transporter.sendMail({
        from: 'mystirio.02@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Hello admin Please Confirm , your OTP code : ${otp}`
    }, (err) => {
        if (err) {
            console.error('Error sending OTP email:', err);
            return res.status(500).json({ message: 'Failed to send OTP email' });
        }

        // Respond once the OTP is successfully sent
        const token = generateToken();
        res.json({ message: 'OTP sent to your email', otp: otp , type : type , token:token });
    });
});

app.get('/dashbord',authenticateToken, (req, res) => {
    const query = `
        SELECT 
            a.id,
            a.physician_name, 
            a.birthdate, 
            a.status, 
            m.fullname,
            m.email
        FROM 
            appointments a
        INNER JOIN 
            medical m 
        ON 
            a.userid = m.userid;
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching appointments:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json(results);
    });
});

app.put('/cancelmsg' , (req,res)=>
    {
        const {fullname , email , date , reason , id} = req.body
        if(!fullname || !date || !email || !reason)
        {
            return res.status(400).json({ message: 'ID, status, and date are required' });
        }
        query = `
        UPDATE appointments
        SET status = 'cancelled', birthdate = ?
        WHERE id = ?
    `;

    db.query(query , [date , id], (err , results) =>
    {
        if(err)
        {
            console.error('Error fetching appointments:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        transporter.sendMail({
            from: 'mystirio.02@gmail.com',
            to: email.toLowerCase(),
            subject: 'Your Appointement Cancelled',
            text: `We regret to inform you that your appointment scheduled for ${date} has been canceled. cause of : ${reason}.`
        }, (err) => {
            if (err) {
                console.error('Error sending OTP email:', err);
                return res.status(500).json({ message: 'Failed to send OTP email' });
            }
    })
    res.json({ message: 'Appointment updated and cancellation email sent successfully' });
    })
        
        
    });

    app.put('/donemsg', (req, res) => {
        const { fullname, email, date, id, doctor } = req.body;
    
        if (!fullname || !date || !email || !id || !doctor) {
            return res.status(400).json({ message: 'Fullname, email, date, id, and doctor are required' });
        }
    
        // Convert ISO date to MySQL DATETIME format
        const formattedDateTime = convertISOToDateTime(date);
    
        const query = `
            UPDATE appointments
            SET status = 'scheduled'
            WHERE id = ? AND birthdate = ?
        `;
    
        db.query(query, [id, formattedDateTime], (err, results) => {
            if (err) {
                console.error('Error fetching appointments:', err);
                return res.status(500).json({ error: 'Database query error' });
            }
    
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Appointment not found' });
            }
    
            transporter.sendMail({
                from: 'your_email@gmail.com',
                to: email.toLowerCase(),
                subject: 'Your Appointment Confirmed',
                text: `Dear ${fullname}, your appointment with Dr. ${doctor} on ${formattedDateTime} is confirmed.`
            }, (err) => {
                if (err) {
                    console.error('Error sending email:', err);
                    return res.status(500).json({ message: 'Failed to send email' });
                }
    
                res.json({ message: 'Appointment email sent successfully' });
            });
        });
    });
    


// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
