import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import router from "./Routes/routes.js";
import bicStudents from "./SampleData/sampledata.js";
import BICS from "./models/BIC.js";

//define the server
const app = express();

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
      // const BIC = BICS.BIC;
      // const loadDB = await BIC.insertMany(bicStudents);
      // console.log(loadDB);
      // const deldB = await BIC.deleteMany();
      // console.log(deldB);
    })
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console);
