const db = require('../server');
const bcrypt = require('bcrypt');

const signup = (req, res) => {
    const { username, email, password } = req.body;

    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkEmailQuery, [email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const checkUserQuery = 'SELECT * FROM users WHERE name = ?';
        db.query(checkUserQuery, [username], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Database error' });
            }

            if (results.length > 0) {
                return res.status(400).json({ message: 'Username already exists' });
            }

            console.log('Password received:', password);
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    return res.status(500).json({ message: 'Error hashing password' });
                }

                const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
                db.query(insertQuery, [username, email, hashedPassword], (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: 'Error creating user' });
                    }
                    return res.status(201).json({ success: true, message: 'User created successfully' });
                });
            });
        });
    });
};

module.exports = { signup };
