import React from "react";
import { render, screen } from "@testing-library/react";
import App from "App";
import { Provider } from "react-redux";
import { store } from "store";

// eslint-disable-next-line no-undef
test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/learn react/i);
  // eslint-disable-next-line no-undef
  expect(linkElement).toBeInTheDocument();
});
