const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use Routes
app.use('/api', routes);

// Default route
app.get('/', (req, res) => {
  res.send('API Gateway is running');
});

// Start the server
app.listen(port, () => {
  console.log(`Gateway Service running on port ${port}`);
});
