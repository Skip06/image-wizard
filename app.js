const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

console.log("JWT_SECRET loaded:", process.env.JWT_SECRET ? "YES" : "NO");
const app = express();
app.use(express.json());



app.use("/auth",require("./routes/auth")); // mounting the auth routes
app.use("/images",require("./routes/images")); //mounting the image routes

const PORT = process.env.PORT || 3000;

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log("mongo DB connected")
})
.catch((err) => console.log("DB error", err));

app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
