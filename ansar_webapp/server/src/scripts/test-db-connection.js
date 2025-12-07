require('dotenv').config({ path: '../.env' });
const { sequelize } = require('../database/connection');

async function testConnection() {
  try {
    console.log('Testing database connection...');
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // List all models
    console.log('\nAvailable models:');
    Object.keys(sequelize.models).forEach(model => {
      console.log(`- ${model}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

testConnection(); 