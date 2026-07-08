This is a Financial Analytical Dashboard
# Finance Analytics Dashboard

## Project Overview
This project is a full-stack web application designed to simulate a user-facing financial analytics tool. It allows users to explore and understand their financial activity by displaying transaction data in interactive tables and visualizing financial insights through dynamic charts. 

This project is developed as part of the "Getting it started in web programming" portfolio course for the B.Sc. in Software Development at IU International University of Applied Sciences.

## Core Features
* **Transaction Log:** An interactive, paginated tabular view of user-generated financial transactions (income and expenses) using DataTables.
* **Analytics Visualizer:** A dashboard featuring monthly spending trends and categorical expense distribution via Chart.js.
* **API Integration:** Custom backend API routing that delivers structured JSON data directly from a relational database.

## Technology Stack
**Frontend:**
* HTML5 & CSS3
* Vanilla JavaScript
* Bootstrap (for responsive UI design)
* DataTables.js (for tabular data manipulation)
* Chart.js (for graphical data visualization)

**Backend:**
* Node.js
* Express.js (for API routing and server logic)

**Database:**
* MySQL (Relational database for transactions, categories, and summarized data)

## System Architecture
The application follows a standard client-server model. The frontend browser sends asynchronous requests to the Node.js/Express backend. The backend queries the MySQL database, formats the result set into JSON, and returns it to the client, where DataTables and Chart.js render the data into the UI.

---
*Developed by Tayanana Zifamba.*
