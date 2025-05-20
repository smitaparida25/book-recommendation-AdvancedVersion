const bcrypt = require('bcrypt');
const db = require('../server');

const login = (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE name = ?';
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    console.log("Username from client:", req.body.username);
    
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = results[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.warn(`Password mismatch for user "${username}"`);
      return res.status(401).json({ message: 'Invalid password' });
    }
    
    res.status(201).json({ success : true ,message: 'Login successful'});
  });
};

module.exports = { login };