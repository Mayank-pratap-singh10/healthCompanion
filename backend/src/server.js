 
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoutes.js";


//api config
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());


//api endPoints
app.use("/api/admin",adminRouter)
app.get("/", (req, res) => {
  res.send("Hello World! ");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 
