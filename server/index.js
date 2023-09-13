import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

//importing routes
import adminRoutes from "./router/adminRoutes.js";
import libraryAdminRoutes from "./router/libraryAdminRoute.js";
import studentRoutes from "./router/studentRoutes.js";
import announcementRoutes from "./router/announcementAdminRoutes.js";
import examRoutes from "./router/examRoutes.js";
import accountsRoutes from "./router/accountsRoutes.js";
import facultyRoutes from "./router/facultyRoutes.js";
import courseRoutes from "./router/courseRoutes.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("files"));
app.use(express.urlencoded({ extended: true }));

//get routing over here
app.use("/admin", adminRoutes);
app.use("/admin/library", libraryAdminRoutes);
app.use("/student", studentRoutes);
app.use("/admin/announcements", announcementRoutes);
app.use("/admin/exams", examRoutes);
app.use("/admin/accounts", accountsRoutes);
app.use("/admin/faculty", facultyRoutes);
app.use("/admin/course", courseRoutes);

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://localhost:27017/erp-project")
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running At :: http://localhost:${PORT}`)
    )
  )
  .catch((err) => console.log(err.message));
