require('dotenv').config();
const process = require('process');
const rateLimit = require('express-rate-limit');

const { PORT = 3000 } = process.env;
const express = require('express');
const helmet = require('helmet');

const app = express();
app.use(express.json());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // store: ... , // Use an external store for more precise rate limiting
});

app.use(limiter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
