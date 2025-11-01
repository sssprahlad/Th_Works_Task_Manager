const express = require("express");
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 8080;
const authenticationRouter = require("./routes/authenticationRouter");
const taskRouter = require("./routes/taskRouter");
require("dotenv").config();



const app = express();
app.use(express.json());


app.use(cors({
    origin: "https://th-works-task-manager.vercel.app/" || "http://localhost:3000",
    credentials:true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    method:["GET","POST","PATCH","DELETE"]

}));


app.use("/api", authenticationRouter);
app.use("/api", taskRouter);


app.get("/",(req, res) => {
    res.send("Hello World");
})

app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
})



