import * as yup from "yup";

export const validation = yup.object({
  email: yup.string().email("Invalid email").required("Email cannot be empty"),
  password: yup
    .string()
    .required("Password cannot be empty")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});
