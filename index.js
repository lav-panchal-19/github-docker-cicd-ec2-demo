const express = require('express');
const app = express();
let PORT = 3000;

// Global users array
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
];

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Express App</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(to right, #74ebd5, #acb6e5);
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    color: #fff;
                }
                .container {
                    text-align: center;
                    background-color: rgba(0, 0, 0, 0.6);
                    padding: 30px 40px;
                    border-radius: 12px;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                }
                h1 {
                    font-size: 36px;
                    margin-bottom: 10px;
                }
                p {
                    font-size: 18px;
                    margin: 10px 0;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 14px;
                    color: #ddd;
                }
                .btn {
                    display: inline-block;
                    margin-top: 20px;
                    padding: 10px 20px;
                    font-size: 16px;
                    color: #fff;
                    background-color: #4CAF50;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    text-decoration: none;
                }
                .btn:hover {
                    background-color: #45a049;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to the Express App!</h1>
                <p>Your journey into web development with Express.js starts here.</p>
                <p>Explore the app, experiment with features, and build something great!</p>
                <a href="/users" class="btn">See all users</a>
                <div class="footer">Thank you for visiting! Have a great day!</div>
            </div>
        </body>
        </html>
    `);
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
    // eslint-disable-next-line no-console
    console.log(`Server is running on http://localhost:${PORT}`);
});
