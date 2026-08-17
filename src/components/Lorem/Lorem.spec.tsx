import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { Lorem } from "./Lorem";

test("renders without crashing", () => {
  const { baseElement } = render(<Lorem />);
  expect(baseElement).toBeDefined();
});
