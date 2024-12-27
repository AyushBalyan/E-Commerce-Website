// backend/server.js
const express = require('express');
const cors = require('cors');
const sneakerRoutes = require('./routes/sneakerRoutes');
const errorHandler = require('./middleware/errorHandler');
const sql = require('./db/db');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/sneakers', sneakerRoutes);

// Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Test database connection
async function testDbConnection() {
  try {
    const result = await sql`SELECT NOW()`;
    console.log('Database connected successfully:', result[0].now);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

testDbConnection();