import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: './.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Hello API' });
});

// FCC test endpoints
app.get('/_api/is-mongoose-ok', (req, res) => {
  res.status(mongoose.connection.readyState === 1 ? 200 : 500).send(
    mongoose.connection.readyState === 1 ? 'OK' : 'MongoDB not connected'
  );
});

app.get('/_api/file/package.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'package.json'));
});

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/myDatabase';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log(`MongoDB connected at ${MONGO_URI}`))
  .catch(err => console.log('MongoDB connection error:', err));


// Start server if not testing
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
