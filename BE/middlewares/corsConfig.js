const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:1000', 'https://notification-service-fe-abcde45dfafc.herokuapp.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

module.exports = cors(corsOptions);