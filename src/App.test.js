import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders DND spell Saver", () => {
  render(<App />);
  const linkElement = screen.getByText(/DND Spell Saver/i);
  expect(linkElement).toBeInTheDocument();
});
