"use client";

import { type Output } from "valibot";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useRouter } from "next/navigation";
import { LoginSchema } from "./LoginSchema";
import { login } from "../../library/api/auth";

type LoginData = Output<typeof LoginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginData>({
    resolver: valibotResolver(LoginSchema),
  });

  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const onSubmit = async (data: LoginData) => {
    try {
      const { user } = await login(data.username, data.password);
      setUser(user);
      router.push("/");
    } catch (e) {
      console.error(e);
      setError("root", {
        type: "error",
        message: "Username and/or password is incorrect",
      });
    }
  };

  return (
    <form
      className="mx-auto flex max-w-sm flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl">Login</h1>
      <input {...register("username")} />
      {errors.username && (
        <p className="text-red-500">{errors.username.message}</p>
      )}
      <input type="password" {...register("password")} />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}
      <input type="submit" />
      {errors.root && <p className="text-red-500">{errors.root.message}</p>}
    </form>
  );
};

export default Login;
