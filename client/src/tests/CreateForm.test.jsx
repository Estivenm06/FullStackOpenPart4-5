import React from "react";
import { screen, render } from "@testing-library/react";
import CreateForm from "../components/CreateForm.jsx";
import { expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";

test("new blog form", async () => {
  const createBlog = vi.fn();
  render(<CreateForm createBlog={createBlog} />);
  screen.debug()
  const input = screen.getAllByRole("textbox");
  const sendButton = screen.getByText("create");

  await userEvent.type(input[0], "new blog form test");
  await userEvent.type(input[1], "test1");
  await userEvent.type(input[2], "www.test.com");
  await userEvent.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("new blog form test");
  expect(createBlog.mock.calls[0][0].author).toBe("test1");
  expect(createBlog.mock.calls[0][0].url).toBe("www.test.com");
});