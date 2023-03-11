import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useAppDispatch } from "@/store/store";
import { LogInPage } from ".";
import { login } from "services/auth.services";
import { waitFor } from "@testing-library/dom";

jest.mock("store", () => ({
  useAppDispatch: jest.fn().mockReturnValue(jest.fn())
}));

jest.mock("services/auth.services", () => ({
  login: jest.fn()
}));

describe("LogInPage component", () => {
  it("should submit form", async () => {
    const dispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);

    const { getByLabelText, getByText } = render(<LogInPage/>);

    fireEvent.change(getByLabelText("Email"), {
      target: {
        value: "test@example.com"
      }
    });
    fireEvent.change(getByLabelText("Password"), {
      target: {
        value: "password"
      }
    });

    fireEvent.click(getByText("Login"));

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(
        login({
          email: "test@test.com", password: "test1234"
        })
      );
    });
  });
});
