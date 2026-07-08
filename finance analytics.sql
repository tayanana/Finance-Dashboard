-- 1. Creates the database
CREATE DATABASE IF NOT EXISTS finance_dashboard;
USE finance_dashboard;

-- 2. Creates the tables
CREATE TABLE Categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL
);

CREATE TABLE Transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    transaction_date DATE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255),
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES Categories(id)
);

-- 3. Inserts Seed Data: Categories
INSERT INTO Categories (name, type) VALUES 
('Salary', 'Income'),
('Freelance', 'Income'),
('Rent', 'Expense'),
('Groceries', 'Expense'),
('Utilities', 'Expense'),
('Software Subscriptions', 'Expense');

-- 4. Inserts Seed Data: Transactions (Mock data for the last few months)
INSERT INTO Transactions (transaction_date, amount, description, category_id) VALUES 
('2026-05-01', 3200.00, 'May Salary', 1),
('2026-05-03', 850.00, 'Monthly Rent', 3),
('2026-05-10', 120.50, 'Groceries', 4),
('2026-05-15', 65.00, 'Electricity Bill', 5),
('2026-05-22', 45.00, 'Adobe & Logic Pro', 6),
('2026-06-01', 3200.00, 'June Salary', 1),
('2026-06-02', 850.00, 'Monthly Rent', 3),
('2026-06-08', 140.20, 'Groceries', 4),
('2026-06-18', 400.00, 'Audio Engineering Gig', 2),
('2026-06-25', 60.00, 'Water Bill', 5),
('2026-07-01', 3200.00, 'July Salary', 1),
('2026-07-05', 850.00, 'Monthly Rent', 3);