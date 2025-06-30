const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const users = [
  { username: 'student', password: 'password123', name: 'Demo Student' }
];

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    return res.json({ success: true, user: { username: user.username, name: user.name } });
  }
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

app.get('/api/profile', (req, res) => {
  res.json({ username: 'student', name: 'Demo Student' });
});

// Changed port to 5000
app.listen(5000, () => console.log('Server running on http://localhost:5000'));