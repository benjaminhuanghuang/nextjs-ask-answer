import Image from "next/image";
import { ReactNode } from "react";

import SocialAuthForm from "@/components/forms/SocialAuthForm";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-auth-light bg-cover bg-center bg-no-repeat px-4 py-10 dark:bg-auth-dark">
      <section className="border-light-700 bg-light-800 shadow-light-100 min-w-full rounded-[10px] border px-4 py-10 dark:border-dark-400 dark:bg-dark-200 dark:shadow-dark-100 sm:min-w-130 sm:px-8">
        <div className="flex items-center justify-between gap-2">
          <div className="space-y-2.5">
            <h1 className="text-heading text-dark-100 dark:text-light-900">
              Join
            </h1>
            <p className="text-base text-dark-500 dark:text-light-400">
              To get your questions answered
            </p>
          </div>
          <Image
            src="images/site-logo.svg"
            alt="DevFlow Logo"
            width={50}
            height={50}
            className="object-contain"
          />
        </div>

        {children}

        <SocialAuthForm />
      </section>
    </main>
  );
};

export default AuthLayout;
