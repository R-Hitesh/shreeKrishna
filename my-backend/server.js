require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); 
app.use(express.json());
app.use(express.static("public"));

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("MONGO_URI is not set in the .env file");
  process.exit(1);
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

// Schema & Model
const itemSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  category: String
});

const Item = mongoose.model("Item", itemSchema);

// Health check/root
app.get("/", (req, res) => {
  res.send("Shree Krishna Menu API is running.");
});

// API Routes
app.get("/api/items", async (req, res) => {
  try {
    const food = await Item.find({ category: "food" });
    const drink = await Item.find({ category: "drink" });
    res.json({ food, drink });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items", details: err.message });
  }
});

app.post("/api/items", async (req, res) => {
  try {
    const { name, image, price, category } = req.body;
    if (!name || !image || !price || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newItem = new Item({ name, image, price, category });
    await newItem.save();
    res.status(201).json({ message: "Item added", item: newItem });
  } catch (err) {
    res.status(500).json({ error: "Failed to add item", details: err.message });
  }
});

app.delete("/api/items/:id", async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete item", details: err.message });
  }
});


app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
