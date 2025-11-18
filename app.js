const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(express.json());
port = 3000;


app.use("/auth",require("./routes/auth")); // mounting the auth routes
app.use("/image",require("./routes/images")); //mounting the image routes



mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("mongo DB connected")
})
.catch((err) => console.log("DB error", err));

app.listen(port, () => console.log(`Server running in port ${port}`));
