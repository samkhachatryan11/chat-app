import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/features/auth/schemas";
import { authService } from "@/features/auth/services/authService";

export const useLogin = () => {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await authService.login(data);
  });

  return { form, onSubmit };
};
