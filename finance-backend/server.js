const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const financeRoutes = require('./src/routes/financeRoutes');
const authRoutes = require('./src/routes/authRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/finance', financeRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`http://localhost/${port}`);
});
