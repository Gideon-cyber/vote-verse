import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import router from "./Routes/routes.js";
import bicStudents from "./SampleData/sampledata.js";
import { BICSTUDENTS } from "./SampleData/sampledata.js";
import BICS from "./models/BIC.js";

//define the server
const app = express();

const allowedOrigins = ["https://vote-verse.vercel.app"];

// Do you want to skip the checking of the origin and grant authorization?
const skipTheCheckingOfOrigin = true;

MIDDLEWARES;
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      // or allow all origines (skipTheCheckingOfOrigin === true)
      if (!origin || skipTheCheckingOfOrigin === true)
        return callback(null, true);

      // -1 means that the user's origin is not in the array allowedOrigins
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";

        return callback(new Error(msg), false);
      }
      // origin is in the array allowedOrigins so authorization is granted
      return callback(null, true);
    },
  })
);

//use modules
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//The routes
app.use("/", router);

//setup mongo connectionI
const PORT = process.env.PORT || 8080;

mongoose
  .connect(
    "mongodb+srv://mongodb:SS6ARbOU4LiwEYAi@cluster0.i9foyr2.mongodb.net/",
    //mongodb+srv://mongodb:SS6ARbOU4LiwEYAi@cluster0.i9foyr2.mongodb.net/?retryWrites=true&w=majority"
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(
    app.listen(PORT, async (req, res) => {
      console.log(`Server is running on port ${PORT}`);
      const BIC = BICS.BIC;
      // const loadDB = await BIC.insertMany(BICSTUDENTS);
      // console.log(loadDB);
      // const deldB = await BIC.deleteMany();
    })
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console);
