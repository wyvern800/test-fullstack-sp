import React from "react";
import {
  render,
} from "@testing-library/react";
import Loading from "../";

describe("Loading Component Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<Loading />);
  });
});
