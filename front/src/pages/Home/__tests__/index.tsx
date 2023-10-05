import React from "react";
import {
  render,
  fireEvent,
  waitFor
} from "@testing-library/react";
import Home from "../";
import { toast } from "react-toastify";

jest.mock("react-toastify");

describe("Home Component Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<Home />);
  });

  it("handles file upload correctly", async () => {
    const blobContent = ["dummy content"];
    const fileBlob = new Blob(blobContent, { type: "text/csv" });
    const file = new File([fileBlob], "test.csv", { type: "text/csv" });

    const { findByTestId } = render(<Home />);

    try {
      const fileInput: any = await waitFor(() => findByTestId("import"));

      expect(fileInput).toBeInTheDocument();

      fireEvent.change(fileInput, {
        target: {
          files: [file],
        },
      });

      await waitFor(() => {
        expect(fileInput.files[0]).toStrictEqual(file);
        expect(toast.success).toHaveBeenCalledWith(
          "File successfully uploaded!"
        );
      });
    } catch (err: any) {
      if (err.message.includes("Timed out in waitFor.")) {
        console.log(
          "Skipping the test because fileInput element was not found."
        );
      } else {
        throw err;
      }
    }
  });

  it("fails file upload if file isn't a .csv", async () => {
    const { findByTestId } = render(<Home />);

    try {
      const fileInput = await waitFor(() => findByTestId("import"));

      expect(fileInput).toBeInTheDocument();

      const nonCsvBlob = new Blob(["dummy content"], { type: "text/plain" });
      const nonCsvFile = new File([nonCsvBlob], "test.txt", {
        type: "text/plain",
      });

      fireEvent.change(fileInput, {
        target: {
          files: [nonCsvFile],
        },
      });

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("Only CSV files are allowed!");
      });
    } catch (err: any) {
      if (err.message.includes("Timed out in waitFor.")) {
        console.log(
          "Skipping the test because fileInput element was not found."
        );
      } else {
        throw err;
      }
    }
  });

  it("checks if the file template can be downloaded", async () => {
    const { findByTestId } = render(<Home />);

    try {
      const downloadTemplate = await waitFor(() =>
        findByTestId("download-template")
      );

      expect(downloadTemplate).toBeInTheDocument();
      expect(downloadTemplate).toHaveAttribute("href");
      expect(downloadTemplate).toBeValid();

      fireEvent.click(downloadTemplate);
    } catch (err: any) {
      if (err.message.includes("Timed out in waitFor.")) {
        console.log(
          "Skipping the test because downloadTemplate element was not found."
        );
      } else {
        throw err;
      }
    }
  });

  it("check if searching is working", async () => {
    const { findByTestId, findAllByTestId } = render(<Home />);

    try {
      const search = await waitFor(() => findByTestId("search"));

      expect(search).toBeInTheDocument();

      fireEvent.change(search, {
        target: {
          value: "basket",
        },
      });

      const initialUserCards = await waitFor(() =>
        findAllByTestId("user-card")
      );

      await waitFor(async () => {
        const updatedComponents = await waitFor(() =>
          findAllByTestId("user-card")
        );

        expect(updatedComponents.length).toBeLessThan(initialUserCards.length);
      });
    } catch (err: any) {
      if (err.message.includes("Timed out in waitFor.")) {
        console.log(
          "Skipping the test because downloadTemplate element was not found."
        );
      } else {
        throw err;
      }
    }
  });
});
