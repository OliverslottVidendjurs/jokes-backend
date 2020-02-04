import express from "express";
import dotenv from "dotenv";
import moongose from "mongoose";
import jokesRouter from "./routes/jokes";
import cors from "cors";

const PORT = 3000;

dotenv.config();

if (!process.env.dbUrl)
    throw new Error("dbUrl was not found in .env");

moongose.connect(process.env.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = moongose.connection;
db.on("error", (error) => {
    console.error(error);
});
db.on("open", () => {
    console.log("connected to database");
});


const app = express();
app.use(express.json());
app.use(cors());
app.use("/jokes", jokesRouter);
app.listen(PORT, () => console.log("Listning on port " + PORT));