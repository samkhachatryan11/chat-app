import Eye from "@/assets/eye";
import EyeClosed from "@/assets/eye-closed";
import { MainBtn } from "@/shared/ui/buttons/MainBtn";
import { Heading } from "@/shared/ui/typography/Heading";
import { useState } from "react";
import { NavLink } from "react-router";
import { useRegister } from "@/features/auth/hooks/useRegister";
import { FormField } from "@/shared/ui/inputs/FormField";
import MainLoader from "@/shared/ui/loaders/MainLoader";
import { useAuthStore } from "@/features/auth/stores/useAuthStore";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { form, onSubmit } = useRegister();
  const isLoading = useAuthStore.getState().isLoading;

  return (
    <div className="pt-4 bg-transparent pl-4 pb-6 pr-4 rounded-lg border-primary border w-full max-w-sm">
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <Heading className="text-primary" level={3}>
          Register
        </Heading>
        <hr className="mb-4 text-primary" />
        <FormField
          label="Username"
          htmlFor="username"
          error={form.formState.errors.username?.message}
        >
          <input
            {...form.register("username")}
            id="username"
            type="text"
            className="text-primary border-primary border"
          />
        </FormField>
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
              type={showPassword ? "text" : "password"}
              id="password"
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
        <FormField
          label="Confirm Password"
          htmlFor="confirmPassword"
          error={form.formState.errors.confirmPassword?.message}
        >
          <input
            {...form.register("confirmPassword")}
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            className="text-primary border-primary border"
          />
        </FormField>
        <NavLink className="mb-2 text-primary" to="/login">
          Already have an account?
        </NavLink>
        <MainBtn
          onClick={onSubmit}
          btnType="primary"
          disabled={form.formState.isSubmitting}
        >
          {isLoading ? <MainLoader /> : "Register"}
        </MainBtn>
      </form>
    </div>
  );
}
