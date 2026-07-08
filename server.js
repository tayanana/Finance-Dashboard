const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'finance_dashboard'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
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
// API Endpoint 2: Get expenses grouped by category (For the Pie Chart)
app.get('/api/expenses-by-category', (req, res) => {
    const query = `
        SELECT c.name as category, SUM(t.amount) as total
        FROM Transactions t
        JOIN Categories c ON t.category_id = c.id
        WHERE c.type = 'Expense'
        GROUP BY c.id, c.name
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// API Endpoint 3: Get Income vs Expense grouped by month (For the Bar Chart)
app.get('/api/monthly-summary', (req, res) => {
    const query = `
        SELECT 
            DATE_FORMAT(t.transaction_date, '%Y-%m') as month,
            SUM(CASE WHEN c.type = 'Income' THEN t.amount ELSE 0 END) as income,
            SUM(CASE WHEN c.type = 'Expense' THEN t.amount ELSE 0 END) as expense
        FROM Transactions t
        JOIN Categories c ON t.category_id = c.id
        GROUP BY month
        ORDER BY month ASC
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});
// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});