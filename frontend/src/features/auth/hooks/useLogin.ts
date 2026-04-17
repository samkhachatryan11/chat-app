import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/features/auth/schemas";
import { useAuthStore } from "../stores/useAuthStore";
import { router } from "@/app/router";

export const useLogin = () => {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = useAuthStore((state) => state.login);

  const onSubmit = form.handleSubmit(async (data) => {
    await login(data);
    router.navigate("/", { replace: true });
    window.location.reload();
  });

  return { form, onSubmit };
};
