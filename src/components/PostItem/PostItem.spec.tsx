import { render } from "@testing-library/react";
import { PostItem } from "./PostItem";
import { expect, test } from "vitest";
import { posts } from "../../mocks/posts";

test("renders without crashing", () => {
  const { baseElement } = render(<PostItem item={posts[0]} />);
  expect(baseElement).toBeDefined();
});
