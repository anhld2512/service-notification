const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const corsConfig = require('./middlewares/corsConfig');
const notificationRoutes = require('./routes/routes.Notification');
const errorHandler = require('./middlewares/middlewares.ErrorHandler');

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(corsConfig);
app.use('/api/notifications', notificationRoutes)
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});