"use client";

import { z } from "zod";
import { nameSchema, emailSchema, passwordSchema } from "@/lib/zod-schemas";
import { useFormHandler } from "@/lib/hooks/useFormHandler";
import ErrorMessage from "@/components/ErrorMessage";

export default function RegisterPage() {
  const userSchema = z.object({
    firstName: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    role: nameSchema, //FIX
  });

  const { register, handleSubmit, onSubmit, errors, formError, formSuccess } =
    useFormHandler({
      schema: userSchema,
      apiPath: "https://localhost:52666/api/User/register",
      pushPath: "/login",
      userInputError: "Ошибка при регистрации. Пожалуста, повторите попытку",
    });
  return (
    <div className="h-screen bg-purple center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 place-items-center"
      >
        <div className="text-center">
          {formError && <ErrorMessage className="text-yellow-300">{formError}</ErrorMessage>}
          {formSuccess && <p className="text-white">Регистрация прошла успешно!</p>}
        </div>
        <div className="grid gap-1.5">
          <input
            {...register("firstName")}
            type="text"
            className="white drop-light"
            placeholder="Имя"
          />
          <ErrorMessage className="text-yellow-300">
            {errors.firstName && errors.firstName.message}
          </ErrorMessage>
          <input
            {...register("email")}
            type="email"
            className="white drop-light"
            placeholder="Почта"
          />
          <ErrorMessage className="text-yellow-300">
            {errors.email && errors.email.message}
          </ErrorMessage>
          <input
            {...register("password")}
            type="password"
            className="white drop-light"
            placeholder="Пароль"
          />
          <ErrorMessage className="text-yellow-300">
            {errors.password && errors.password.message}
          </ErrorMessage>
          <input
            {...register("role")}
            type="text"
            className="white drop-light"
            placeholder="Роль"
          />
          <ErrorMessage className="text-yellow-300">
            {errors.role && errors.role.message}
          </ErrorMessage>
        </div>
        <button className="large text-white bg-black">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}
