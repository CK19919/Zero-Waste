require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api', require('./routes/health'));

// simple demo deals route (Phase 1)
app.get('/api/deals', (_req, res) => {
  res.json([{ _id: 'demo1', title: '₹59 Samosa Combo', price: 59, vendorId: 'v1' }]);
});

const PORT = process.env.PORT || 8080;

(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
})();
