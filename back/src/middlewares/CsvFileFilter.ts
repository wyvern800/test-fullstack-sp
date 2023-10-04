import { Request } from "express";

// Define a custom filter to allow only .csv files
export const csvFileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (file.originalname.endsWith(".csv")) {
    // Accept the file
    cb(null, true);
  } else {
    // Reject the file
    cb("Only CSV files are allowed!", false);
  }
};
