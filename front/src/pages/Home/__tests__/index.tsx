import React from "react";
import {
  render,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import Home from "../";
import { toast } from "react-toastify";
import * as apiMock from "../../../services/__mocks__/callsApi";

jest.mock("react-toastify");

// Mocking the API module
jest.mock("../../../services/__mocks__/callsApi");

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

    const { getByText, getByTestId } = render(<Home />);

    const fileInput: any = await waitFor(() => getByTestId("import"));
    expect(fileInput).toBeInTheDocument();

    fireEvent.change(fileInput, {
      target: {
        files: [file],
      },
    });

    const users = await waitFor(() => getByText("Users"));
    expect(users).toBeInTheDocument();

    // Check if the file input's files property is correctly set and uploaded
    await waitFor(() => {
      expect(fileInput.files[0]).toStrictEqual(file);
      expect(toast.success).toHaveBeenCalledWith("File successfully uploaded!");
    });
  });

  it("fails file upload if file isn't a csv", async () => {
    const nonCsvBlob = new Blob(["dummy content"], { type: "text/plain" });
    const nonCsvFile = new File([nonCsvBlob], "test.txt", {
      type: "text/plain",
    });

    const { getByTestId } = render(<Home />);

    const fileInput: any = await waitFor(() => getByTestId("import"));
    expect(fileInput).toBeInTheDocument();

    fireEvent.change(fileInput, {
      target: {
        files: [nonCsvFile],
      },
    });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Only CSV files are allowed!");
    });
  });

  /*it("displays error message on failed API call", async () => {
    // Mock the API call to reject with an error
    apiMock.getAll.mockRejectedValue(new Error("API Error"));

    // Render your component that makes the API call
    const { getByText } = render(<Home />);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Something unexpected happened");
    });

    // Optionally, you can also assert that the API function was called
    expect(apiMock.getAll).toHaveBeenCalledTimes(1);
  });*/
});
