import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import csvParser from "csv-parser";
import { csvFileFilter } from "./middlewares/CsvFileFilter";
import { filterByQuery } from "./utils";

const router = express.Router();

let userFile: any[] = [];

// Configure Multer with the custom filter
const storage: multer.StorageEngine = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "temp/");
  },
  filename: (_, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage, fileFilter: csvFileFilter });

router.post("/files", upload.single("file"), (req: Request, res: Response) => {
  if (req.file) {
    const results: Express.Multer.File[] = [];

    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        userFile = results;

        // Delete the uploaded file after processing
        if (req.file) {
          fs.unlink(req.file.path, (err) => {
            if (err) {
              console.error("Error deleting file:", err);
            }
          });
        }

        res.send({ msg: "File uploaded successfully!", data: userFile });
      });
  } else {
    res.status(400).send("Invalid file format. Please upload a CSV file.");
  }
});

router.delete("/files", (req: Request, res: Response) => {
  userFile = [];
  res.send("File cleared successfully!");
});

router.get("/users", (req: Request, res: Response) => {
  const { q } = req.query;

  let toFront = {};
  if (q) {
    const filteredData = filterByQuery(q as string, userFile);
    toFront = filteredData;
  } else {
    toFront = userFile;
  }
  res.send(toFront);
});

export default router;
