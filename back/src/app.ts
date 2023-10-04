// src/app.ts
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import router from "./routes";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(morgan("dev"));

app.use(bodyParser.json());

app.use(cors());

// Middleware for request logging using Morgan
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Request URL: ${req.originalUrl}, at: ${new Date()}`);
  next();
});

app.use('/api', router);

// Error handling middleware for 404 Not Found
app.use((req: Request, res: Response) => {
  res.status(404).send('Route not Found');
});

// Error handling middleware for other errors
app.use((err: Error, req: Request, res: Response) => {
  // Send an error response to the client
  res.status(500).send('Internal server error');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
