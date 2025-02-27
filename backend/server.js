const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const movieSchema = new mongoose.Schema({
  title: String,
  rating: Number,
  description: String,
  poster: String,
});

const Movie = mongoose.model("Movie", movieSchema);

app.get("/movies/trending", async (req, res) => {
  const movies = await Movie.find().sort({ rating: -1 }).limit(10);
  res.json(movies);
});

app.get("/movies/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.json(movie);
});

app.post("/movies/:id/rate", async (req, res) => {
  const { rating } = req.body;
  const movie = await Movie.findByIdAndUpdate(req.params.id, { $set: { rating } }, { new: true });
  res.json(movie);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
