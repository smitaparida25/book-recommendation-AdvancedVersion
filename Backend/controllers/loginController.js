const bcrypt = require('bcrypt');
const db = require('../server');

const loginUser = (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE name = ?';
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = results[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    res.status(200).json({ message: 'Login successful', user: { id: user.id, username: user.name } });
  });
};

module.exports = { login: loginUser };