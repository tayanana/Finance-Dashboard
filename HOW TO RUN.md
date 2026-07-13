## Local Setup Instructions

### 1. Database Configuration
1. Ensure MySQL Server is running locally.
2. Open your SQL client and run the provided `database_schema.sql` file to create the `finance_dashboard` database and table structures.
3. Run the `seed_data.sql` file to populate the application with initial test data.

### 2. Environment Variables
Create a file named `.env` in the root directory of this project and include the following variables. Update the `DB_PASS` with your local MySQL root password:
```text
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=finance_dashboard
APP_PASSWORD=securefinance2026