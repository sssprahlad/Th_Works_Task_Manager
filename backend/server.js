const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const port = process.env.PORT || 8080;
const authenticationRouter = require("./routes/authenticationRouter");
const taskRouter = require("./routes/taskRouter");

const app = express();

const allowedOrigins = [
  'https://th-works-task-manager.vercel.app',
  'http://localhost:3000'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204
};


app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api", authenticationRouter);
app.use("/api", taskRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
