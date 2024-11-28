const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Enable CORS for frontend (localhost:3000 for development)
app.use(cors({ origin: '*' })); // Allow all origins for testing

// In-memory user database (for demo purposes, replace with a real database in production)
let users = [];

// POST request for user registration
app.post('/api/register', async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Check if any fields are missing
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Add the new user to the "database"
  const newUser = { username, email, password: hashedPassword };
  users.push(newUser);

  // Return a success message
  res.status(201).json({ message: 'Registration successful' });
});

// POST request for user login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Find user by email
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Compare the password with the stored hash
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Return success message with mock token
  const token = 'mockJWTToken'; // Replace with actual JWT token generation
  res.status(200).json({ token, username: user.username });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
