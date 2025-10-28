import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config(); // loads .env

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

console.log("PORT =", PORT);
console.log("MONGO_URI =", MONGO_URI);

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
