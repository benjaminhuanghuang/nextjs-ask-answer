"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/routes";
import { updateUser } from "@/lib/actions/user.action";
import { ProfileSchema } from "@/lib/validations";

import { Textarea } from "../ui/textarea";

interface Params {
  user: User;
}

const ProfileForm = ({ user }: Params) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      portfolio: user.portfolio || "",
      location: user.location || "",
      bio: user.bio || "",
    },
  });

  const handleUpdateProfile = async (values: z.infer<typeof ProfileSchema>) => {
    startTransition(async () => {
      const result = await updateUser({
        ...values,
      });

      if (result.success) {
        toast.success("Your profile has been updated successfully.");

        router.push(ROUTES.PROFILE(user._id));
      } else {
        toast.error(`Error (${result.status})`, {
          description: result.error?.message,
        });
      }
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleUpdateProfile)}
      className="mt-9 flex w-full flex-col gap-9"
    >
      <Controller
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error} className="space-y-3.5">
            <FieldLabel
              htmlFor={field.name}
              className="text-base font-semibold text-dark-400 dark:text-light-800"
            >
              Name <span className="text-primary-500">*</span>
            </FieldLabel>
            <Input
              id={field.name}
              className="focus-visible:ring-0 focus-visible:ring-offset-0 text-base font-normal border-light-800 dark:border-dark-300 bg-light-800 dark:bg-dark-300 text-dark-300 dark:text-light-700 min-h-[56px] border"
              placeholder="Your Name"
              {...field}
            />
            <FieldError errors={fieldState.error ? [fieldState.error] : []} />
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="username"
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error} className="space-y-3.5">
            <FieldLabel
              htmlFor={field.name}
              className="text-base font-semibold text-dark-400 dark:text-light-800"
            >
              Username <span className="text-primary-500">*</span>
            </FieldLabel>
            <Input
              id={field.name}
              className="focus-visible:ring-0 focus-visible:ring-offset-0 text-base font-normal border-light-800 dark:border-dark-300 bg-light-800 dark:bg-dark-300 text-dark-300 dark:text-light-700 min-h-[56px] border"
              placeholder="Your username"
              {...field}
            />
            <FieldError errors={fieldState.error ? [fieldState.error] : []} />
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="portfolio"
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error} className="space-y-3.5">
            <FieldLabel
              htmlFor={field.name}
              className="text-base font-semibold text-dark-400 dark:text-light-800"
            >
              Portfolio Link
            </FieldLabel>
            <Input
              id={field.name}
              type="url"
              className="focus-visible:ring-0 focus-visible:ring-offset-0 text-base font-normal border-light-800 dark:border-dark-300 bg-light-800 dark:bg-dark-300 text-dark-300 dark:text-light-700 min-h-[56px] border"
              placeholder="Your Portfolio link"
              {...field}
            />
            <FieldError errors={fieldState.error ? [fieldState.error] : []} />
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="location"
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error} className="space-y-3.5">
            <FieldLabel
              htmlFor={field.name}
              className="text-base font-semibold text-dark-400 dark:text-light-800"
            >
              Location <span className="text-primary-500">*</span>
            </FieldLabel>
            <Input
              id={field.name}
              className="focus-visible:ring-0 focus-visible:ring-offset-0 text-base font-normal border-light-800 dark:border-dark-300 bg-light-800 dark:bg-dark-300 text-dark-300 dark:text-light-700 min-h-[56px] border"
              placeholder="Where do you live?"
              {...field}
            />
            <FieldError errors={fieldState.error ? [fieldState.error] : []} />
          </Field>
        )}
      />

      <Controller
        control={form.control}
        name="bio"
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error} className="space-y-3.5">
            <FieldLabel
              htmlFor={field.name}
              className="text-base font-semibold text-dark-400 dark:text-light-800"
            >
              Bio <span className="text-primary-500">*</span>
            </FieldLabel>
            <Textarea
              id={field.name}
              rows={5}
              className="focus-visible:ring-0 focus-visible:ring-offset-0 text-base font-normal border-light-800 dark:border-dark-300 bg-light-800 dark:bg-dark-300 text-dark-300 dark:text-light-700 min-h-[56px] border"
              placeholder="What's special about you?"
              {...field}
            />
            <FieldError errors={fieldState.error ? [fieldState.error] : []} />
          </Field>
        )}
      />

      <div className="mt-7 flex justify-end">
        <Button
          type="submit"
          className="bg-linear-to-r from-primary-500 to-primary-500/70 w-fit"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>Submit</>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
