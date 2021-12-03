const express = require("express");
const connectDB = require("./config/db");
const authRouter = require("./routes/auth-router");
const errorHandler = require("./middleware/error");
require("dotenv").config({ path: "./.env" });
connectDB();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);

// Error Handler Should Be Last Piece of Middleware
app.use(errorHandler);
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
