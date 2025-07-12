const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// ✅ Proper CORS setup
app.use(cors({
<<<<<<< HEAD
  origin: 'http://localhost:8080',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
=======
  origin: 'http://localhost:8080', 
  credentials: true  
>>>>>>> e3403eb94245b615d82e230cf51b9f009954a2bb
}));

app.use(express.json());
app.use(cookieParser());

// Routes
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes'); // <-- Make sure this exists
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes); // <-- Add this if not added

app.get('/', (req, res) => res.send('ReWear API is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
