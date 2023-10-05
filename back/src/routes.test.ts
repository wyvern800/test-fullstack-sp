import request from "supertest";
import express from "express";
import routes from "./routes";
import { userFile } from "./routes";

const app = express();
app.use(express.json());
app.use("/api", routes);

describe("Routes", () => {
  beforeEach(() => {
    userFile.length = 0;
  });

  it("should upload a CSV file and return the uploaded data", async () => {
    const response = await request(app)
      .post("/api/files")
      .attach("file", "./test.csv");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("msg", "File uploaded successfully!");
    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should handle invalid file format during upload", async () => {
    const response = await request(app)
      .post("/api/files")
      .attach("file", "./test.txt");

    const resposonseParsed = response.text.includes(
      "Only CSV files are allowed!"
    );
    
    expect(response.status).toBe(400);
    expect(resposonseParsed).toBe(true);
  });

  it("should clear the uploaded file data on DELETE request", async () => {
    const uploadResponse = await request(app)
      .post("/api/files")
      .attach("file", "./test.csv");

    const deleteResponse = await request(app).delete("/api/files");

    expect(uploadResponse.status).toBe(200);
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.text).toBe("File cleared successfully!");
  });

  it("should filter user data based on query parameter", async () => {
    // Upload test data
    await request(app).post("/api/files").attach("file", "./test.csv");

    const response = await request(app).get("/api/users?q=query");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
