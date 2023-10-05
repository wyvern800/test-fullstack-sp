import React from "react";
import {
  render,
} from "@testing-library/react";
import Toast from "../";

describe("Toast Component Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<Toast />);
  });
});
