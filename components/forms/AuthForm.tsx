"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Controller,
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { ZodType } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/routes";

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<ActionResponse>;
  formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const router = useRouter();

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = (await onSubmit(data)) as ActionResponse;

    if (result?.success) {
      toast.success(
        formType === "SIGN_IN"
          ? "Signed in successfully"
          : "Signed up successfully"
      );

      router.push(ROUTES.HOME);
    } else {
      toast.error(`Error ${result?.status}`, {
        description: result?.error?.message,
      });
    }
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="mt-10 space-y-6"
    >
      {Object.keys(defaultValues).map((fieldKey) => (
        <Controller
          key={fieldKey}
          control={form.control}
          name={fieldKey as Path<T>}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={!!fieldState.error}
              className="flex w-full flex-col gap-2.5"
            >
              <FieldLabel
                htmlFor={field.name}
                className="text-base font-medium text-dark-400 dark:text-light-700"
              >
                {field.name === "email"
                  ? "Email Address"
                  : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
              </FieldLabel>
              <Input
                id={field.name}
                required
                type={field.name === "password" ? "password" : "text"}
                {...field}
                className="text-base font-normal bg-light-900 dark:bg-dark-300 border-light-800 dark:border-dark-300 text-dark-300 dark:text-light-700 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-12 rounded-1.5 border"
              />
              <FieldError errors={fieldState.error ? [fieldState.error] : []} />
            </Field>
          )}
        />
      ))}

      <Button
        disabled={form.formState.isSubmitting}
        className="bg-linear-to-r from-primary-500 to-primary-500/70 text-base font-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter text-light-900!"
      >
        {form.formState.isSubmitting
          ? buttonText === "Sign In"
            ? "Signin In..."
            : "Signing Up..."
          : buttonText}
      </Button>

      {formType === "SIGN_IN" ? (
        <p>
          Don&apos;t have an account?{" "}
          <Link
            href={ROUTES.SIGN_UP}
            className="text-base font-semibold bg-linear-to-r from-primary-500 to-primary-500/70 bg-clip-text text-transparent"
          >
            Sign up
          </Link>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <Link
            href={ROUTES.SIGN_IN}
            className="text-base font-semibold bg-linear-to-r from-primary-500 to-primary-500/70 bg-clip-text text-transparent"
          >
            Sign in
          </Link>
        </p>
      )}
    </form>
  );
};

export default AuthForm;
