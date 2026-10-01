import connectDB from "./config/dbConnect.js";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({
  path: "./.env"
})

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.log("Connection to mongoDB failed", error)
    process.exit(1)
  });  