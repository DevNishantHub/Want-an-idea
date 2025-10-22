"use client";
import React, { FormEvent, useState } from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showVerificationPrompt, setShowVerificationPrompt] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("email")?.toString() || "";
    const firstname = formData.get("firstname")?.toString() || "";
    const lastname = formData.get("lastname")?.toString() || "";

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setShowVerificationPrompt(true);
        setMessage(data.message);
        setIsError(false);
      } else {
        setMessage(data.message || "Signup failed");
        setIsError(true);
      }
    } catch (error) {
      setMessage("Something went wrong");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }

  if (showVerificationPrompt) {
     return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white/50 p-4 md:rounded-2xl md:p-8 dark:bg-black mt-40 mb-15">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
          Verify Your Email
        </h2>
        <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-300">
          {message}
        </p>
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-200">
            📧 Check your email inbox for a verification link. Click it to confirm your account.
          </p>
        </div>
        <button
          onClick={() => {
            setShowVerificationPrompt(false);
            router.push("/pages/login"); // use /login, not /pages/login
          }}
          className="mt-6 group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
        >
          Back to Login
          <BottomGradient />
        </button>
      </div>
    </div>
  ); }

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white/50 p-4 md:rounded-2xl md:p-8 dark:bg-black mt-40 mb-15">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to Want An IDEA
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Create your account to get started
      </p>

      {message && (
        <div
          className={`mt-4 p-3 rounded-md text-sm ${
            isError
              ? "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-200"
              : "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-200"
          }`}
        >
          {message}
        </div>
      )}

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" name="firstname" placeholder="Tyler" type="text" required />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" name="lastname" placeholder="Durden" type="text" required />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" placeholder="projectmayhem@fc.com" type="email" required />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" placeholder="••••••••" type="password" required />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="confirmpassword">Re-Enter password</Label>
          <Input
            id="confirmpassword"
            name="confirmpassword"
            placeholder="••••••••"
            type="password"
            required
          />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign up →"}
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="button"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
