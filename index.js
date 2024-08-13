const express = require('express');
const app = express();
const PORT = 3000;

// Global users array
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
];

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Express App!' });
});

// Fetch all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Fetch user by ID
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Create a new user
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1, // Simple auto-increment ID (not ideal for production)
        name: req.body.name,
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Update a user
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);
    if (user) {
        user.name = req.body.name;
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Delete a user
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.status(204).json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Catch-all route for undefined routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
