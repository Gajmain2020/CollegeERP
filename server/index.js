import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

//importing routes
import adminRoutes from "./router/adminRoutes.js";
import studentRoutes from "./router/studentRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

//get routing over here
app.use("/admin", adminRoutes);
app.use("/student", studentRoutes);
app.use("/student", studentRoutes);

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://localhost:27017/erp-project")
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running At :: http://localhost:${PORT}`)
    )
  )
  .catch((err) => console.log(err.message));
