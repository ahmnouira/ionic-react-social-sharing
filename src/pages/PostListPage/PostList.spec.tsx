import { render } from "@testing-library/react";
import { PostListPage } from "./PostListPage";
import { expect, test } from "vitest";

test("renders without crashing", () => {
  const { baseElement } = render(<PostListPage />);
  expect(baseElement).toBeDefined();
});
