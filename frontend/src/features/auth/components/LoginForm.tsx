import Eye from "@/assets/eye";
import EyeClosed from "@/assets/eye-closed";
import { MainBtn } from "@/shared/ui/buttons/MainBtn";
import { FormField } from "@/shared/ui/inputs/FormField";
import { Heading } from "@/shared/ui/typography/Heading";
import { useState } from "react";
import { NavLink } from "react-router";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { useAuthStore } from "../stores/useAuthStore";
import MainLoader from "@/shared/ui/loaders/MainLoader";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { form, onSubmit } = useLogin();
  const isLoading = useAuthStore.getState().isLoading;

  return (
    <div className="pt-4 bg-transparent pl-4 pb-6 pr-4 rounded-lg border-primary border w-full max-w-sm">
      <form className="flex flex-col gap-3">
        <Heading className="text-primary" level={2}>
          Login
        </Heading>
        <hr className="mb-4 text-primary" />
        <FormField
          label="Email"
          htmlFor="email"
          error={form.formState.errors.email?.message}
        >
          <input
            {...form.register("email")}
            type="email"
            id="email"
            className="text-primary border-primary border"
          />
        </FormField>
        <FormField
          label="Password"
          htmlFor="password"
          error={form.formState.errors.password?.message}
        >
          <div className="relative">
            <input
              {...form.register("password")}
              id="password"
              type={showPassword ? "text" : "password"}
              className="text-primary border-primary border w-full"
            />
            <span
              className="absolute bottom-2.5 right-3 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Eye /> : <EyeClosed />}
            </span>
          </div>
        </FormField>
        <NavLink className="mb-2 text-primary" to="/register">
          Don't have an account?
        </NavLink>
        <MainBtn
          onClick={onSubmit}
          btnType="primary"
          disabled={form.formState.isSubmitting}
        >
          {isLoading ? <MainLoader /> : "Login"}
        </MainBtn>
      </form>
    </div>
  );
}
