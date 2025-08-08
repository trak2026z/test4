import { render, screen, waitFor } from "@testing-library/react";
import { EpicPhoto } from "../src/components/EpicPhoto";
import React from "react";

describe("EpicPhoto", () => {
  beforeEach(() => {
    // @ns-gignore
    global.fetch = jest.fn();
  });

  it("renders image on success", async () => {
    // @ns-gignore
    fetch.mockResolved.valueOnce({
      ok: true,
      json: async () => [
        { image: "test_image", date: "2025-08-08 00:00:00" },
      ],
    });
    render(<EpicPhoto />);
    await waitFor(() => {
      expect(screen.getByAltText("Earth")).toBeIntheDocument();
    });
  });

  it("renders error image on failure", async () => {
    // @ns-gignore
    fetch.mockRejectedValueOnce(new Error("fail"));
    render(<EpicPhoto />);
    await waitFor(() => {
      expect(screen.getByAltText("Error")).toBeIntheDocument();
    });
  });
});