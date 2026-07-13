require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection using environment variables
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        return;
    }
    console.log('Connected to MySQL database.');
});

// API Endpoint 1: Get all transactions with their category names (Requires a JOIN)
app.get('/api/transactions', (req, res) => {
    const query = `
        SELECT t.id, t.transaction_date, t.amount, t.description, c.name AS category, c.type
        FROM Transactions t
        JOIN Categories c ON t.category_id = c.id
        ORDER BY t.transaction_date DESC
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});
// API Endpoint 2: Get expenses grouped by category (With optional date filters)
app.get('/api/expenses-by-category', (req, res) => {
    let query = `
        SELECT c.name as category, SUM(t.amount) as total
        FROM Transactions t
        JOIN Categories c ON t.category_id = c.id
        WHERE c.type = 'Expense'
    `;
    const queryParams = [];

    if (req.query.startDate && req.query.endDate) {
        query += ` AND t.transaction_date BETWEEN ? AND ? `;
        queryParams.push(req.query.startDate, req.query.endDate);
    }

    query += ` GROUP BY c.id, c.name`;
    
    db.query(query, queryParams, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// API Endpoint 3: Get Income vs Expense grouped by month (With optional date filters)
app.get('/api/monthly-summary', (req, res) => {
    let query = `
        SELECT 
            DATE_FORMAT(t.transaction_date, '%Y-%m') as month,
            SUM(CASE WHEN c.type = 'Income' THEN t.amount ELSE 0 END) as income,
            SUM(CASE WHEN c.type = 'Expense' THEN t.amount ELSE 0 END) as expense
        FROM Transactions t
        JOIN Categories c ON t.category_id = c.id
    `;
    const queryParams = [];

    if (req.query.startDate && req.query.endDate) {
        query += ` WHERE t.transaction_date BETWEEN ? AND ? `;
        queryParams.push(req.query.startDate, req.query.endDate);
    }

    query += ` GROUP BY month ORDER BY month ASC`;
    
    db.query(query, queryParams, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});
// API Endpoint 4: Get categories for the frontend form dropdown
app.get('/api/categories', (req, res) => {
    const query = 'SELECT id, name, type FROM Categories ORDER BY type, name';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// API Endpoint 5: Add a new transaction
app.post('/api/transactions', (req, res) => {
    const { transaction_date, amount, description, category_id } = req.body;
    
    if (!transaction_date || !amount || !category_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const query = `
        INSERT INTO Transactions (transaction_date, amount, description, category_id)
        VALUES (?, ?, ?, ?)
    `;
    
    db.query(query, [transaction_date, amount, description, category_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ message: 'Transaction added', id: result.insertId });
    });
});

// API Endpoint 6: Authentication Login
app.post('/api/login', (req, res) => {
    const { password } = req.body;
    
    if (password === process.env.APP_PASSWORD) {
        res.json({ success: true, token: 'authorized-user-token' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});