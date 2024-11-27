const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();

// Use middleware to parse incoming JSON requests
app.use(express.json());

// Enable CORS to allow requests from the frontend
app.use(cors());

// In-memory "database" to store users (you can replace this with a real database)
let users = [];

// POST request to register a new user
app.post('/api/register', async (req, res) => {
  // Log the incoming request body to see if confirmPassword is missing or undefined
  console.log('Request body:', req.body);

  let { username, email, password, confirmPassword } = req.body;

  // Log each field to ensure it's being parsed correctly
  console.log('Username:', username);
  console.log('Email:', email);
  console.log('Password:', password);
  console.log('Confirm Password:', confirmPassword);

  // Trim the inputs to remove any leading/trailing whitespace
  username = username ? username.trim() : '';
  email = email ? email.trim() : '';
  password = password ? password.trim() : '';
  confirmPassword = confirmPassword ? confirmPassword.trim() : '';
  

  // Log the trimmed values
  console.log('Trimmed Username:', username);
  console.log('Trimmed Email:', email);
  console.log('Trimmed Password:', password);
  console.log('Trimmed Confirm Password:', confirmPassword);

  // Check if all fields are provided and that the passwords match
  if (!username || !email || !password || !confirmPassword) {
    console.log('Error: Missing fields');
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    console.log('Error: Passwords do not match');
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // Check if the user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    console.log('Error: User already exists');
    return res.status(400).json({ message: 'User with this email already exists' });
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Add the new user to the "database"
  const newUser = { username, email, password: hashedPassword };
  users.push(newUser);

  console.log('User registered successfully:', newUser);

  res.status(201).json({ message: 'Registration successful' });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
