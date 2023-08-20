import { object, string, minLength } from "valibot";

export const LoginSchema = object({
  username: string("username is required", [
    minLength(3, "Needs to be at least 3 characters"),
  ]),
  password: string("password is required"),
});
