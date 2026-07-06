require("dotenv").config();
const express = require("express");
const cookieParser = require('cookie-parser')

const cors = require('cors');


const app = express();
/* request body ko read krega */
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL?.replace(/\/$/, ""),
];

app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);

    const normalizedOrigin = origin.replace(/\/$/, "");

    if (allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }

    console.log("Allowed:", allowedOrigins);
    console.log("Incoming:", normalizedOrigin);

    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));
/** require all the routes here  */
const authRouter = require("./routes/auth.routes");
const interviewRouter = require('./routes/interview.routes')

/**using all the routes here */
app.use("/api/auth", authRouter);
app.use('/api/interview',interviewRouter);
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Resume GenAI API is running 🚀"
    });
});

module.exports = app;
