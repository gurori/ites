"use client";

import UpdateProfileProperty from "./UpdateProfileProperty";
import { useSearchParams } from "next/navigation";
import { useFormHandler } from "@/lib/hooks/useFormHandler";
import { z } from "zod";
import { nameSchema, textSchema } from "@/lib/zod-schemas";
import FormError from "@/components/ui/FormError";
import { useEffect, useState } from "react";
import SelectJobTitle from "./SelectRole";
import { useController } from "react-hook-form";
import { jobTitles, randomGuid } from "@/lib/constants";
import SubmitButton from "@/components/ui/SubmitButton";
import AvatarForm from "./AvatarForm";
import { toast } from "sonner";

export default function ProfileSettings({ token }: { token: string }) {
  const params = useSearchParams();
  const currentJobTitle = params.get("jobTitle")!;
  const userId = params.get("userId") ?? randomGuid;
  const [activeJobTitle, setActiveJobTitle] = useState(currentJobTitle);
  const updateUserSchema = z.object({
    lastName: nameSchema,
    firstName: nameSchema,
    middleName: nameSchema,
    description: textSchema,
    jobTitle: z.string({ message: "Необходимо выбрать 1 роль" }),
  });
  const {
    errors,
    formError,
    formSuccess,
    handleSubmit,
    register,
    onSubmit,
    control,
  } = useFormHandler({
    apiPath: "/api/User/update",
    token: token,
    method: "PUT",
    schema: updateUserSchema,
    defaultValues: {
      lastName: params.get("lastName")!,
      firstName: params.get("firstName")!,
      middleName: params.get("middleName")!,
      description: params.get("description")!,
      jobTitle: currentJobTitle,
    },
  });
  const { field } = useController({
    control,
    name: "jobTitle",
    defaultValue: currentJobTitle,
  });
  useEffect(() => {
    if (formSuccess)
      toast("Данные успешно сохранены!", {
        description: "Обновите страницу, чтобы увидеть измения.",
      });
  }, [formSuccess]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <UpdateProfileProperty
          text="Введите ФИО"
          className="grid place-content-start gap-4"
        >
          <input
            {...register("lastName")}
            className="small-black"
            placeholder="Фамилия"
          />
          <FormError error={errors.lastName} />
          <input
            {...register("firstName")}
            className="small-black"
            placeholder="Имя"
          />
          <FormError error={errors.firstName} />
          <input
            {...register("middleName")}
            className="small-black"
            placeholder="Отчество"
          />
          <FormError error={errors.middleName} />
        </UpdateProfileProperty>
        <UpdateProfileProperty text="О себе" className="grid">
          <textarea
            {...register("description")}
            className="small-black scrollbar-none"
            placeholder="Напишите свои навыки"
          />
          <FormError error={errors.description} />
        </UpdateProfileProperty>
        <UpdateProfileProperty text="Выберите роль">
          <div className="flex gap-6 relative pb-4 flex-wrap">
            {jobTitles.map((title) => (
              <SelectJobTitle
                key={title}
                active={activeJobTitle === title}
                onClick={() => {
                  setActiveJobTitle(title);
                  field.onChange(title);
                }}
                title={title}
              />
            ))}
          </div>
          <FormError error={errors.jobTitle} />
        </UpdateProfileProperty>
        <SubmitButton />
        {formError && <p className="text-red-500 pt-4">{formError}</p>}
      </form>
      <AvatarForm userId={userId} token={token} />
    </>
  );
}