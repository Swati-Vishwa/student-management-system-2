import express from "express";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express()

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.static("public"));

app.use(cors(
  {
    origin: process.env.CORS_ORIGIN?.split(',') || "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ["Content-Type", "Authorization"]
  }
))
//Importing routes
import studenRoutes from "./routes/student.route.js"
app.use('/api/students', studenRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Studend API running' })
})

app.use(notFound);
app.use(errorHandler);

export default app