import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.routes.js";
import path from "path";

dotenv.config();
const app = express();
app.use(express.json());

connectDB();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use("/api", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.use((req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});
}
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
