const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Default user for WAMP
    password: '', // Leave blank if no password is set
    database: 'student_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Routes
app.post('/register', (req, res) => {
    const { name, city } = req.body;
    if (name && city) {
        const query = 'INSERT INTO students (name, city) VALUES (?, ?)';
        db.query(query, [name, city], (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).json({ message: 'Database error' });
            }
            res.json({ message: 'Student registered successfully!' });
        });
    } else {
        res.status(400).json({ message: 'Please provide all fields.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
