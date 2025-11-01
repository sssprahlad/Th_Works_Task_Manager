const express = require("express");
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 8080;
const authenticationRouter = require("./routes/authenticationRouter");
const taskRouter = require("./routes/taskRouter");
require("dotenv").config();



const app = express();
// app.use(express.json());

const allowedOrigins = [
     'https://th-works-task-manager.vercel.app/',
  'http://localhost:3000'
 
];


 const corsOptions = {
    origin: function(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET','POST','PUT','DELETE','PATCH','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization'],
    optionsSuccessStatus: 204
  };

  app.use(cors(corsOptions));
// app.options('/*', cors(corsOptions));
app.use(express.json()); 

// app.use(cors({
//     origin: || "http://localhost:3000",
//     credentials:true,
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     method:["GET","POST","PATCH","DELETE"]

// }));


app.use("/api", authenticationRouter);
app.use("/api", taskRouter);


app.get("/",(req, res) => {
    res.send("Hello World");
})

app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
})



