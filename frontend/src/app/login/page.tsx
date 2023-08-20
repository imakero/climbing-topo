"use client";

import { type Output } from "valibot";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useRouter } from "next/navigation";
import { LoginSchema } from "./LoginSchema";

type LoginData = Output<typeof LoginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: valibotResolver(LoginSchema),
  });

  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const onSubmit = async (data: LoginData) => {
    const res = await fetch("http://localhost:8009/api/v1/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const { user } = await res.json();
    setUser(user);
    router.push("/");
  };

  console.log(user);

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
    </form>
  );
};

export default Login;
