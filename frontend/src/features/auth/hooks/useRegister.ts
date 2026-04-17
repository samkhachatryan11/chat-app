import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterInput,
} from "@/features/auth/schemas/registerSchema";
import { useAuthStore } from "@/features/auth/stores/useAuthStore";
import { router } from "@/app/router";

export const useRegister = () => {
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: "all",
  });

  const register = useAuthStore((state) => state.register);

  const onSubmit = form.handleSubmit(async (data) => {
    await register(data);
    router.navigate("/", { replace: true });
    window.location.reload();
  });

  return { form, onSubmit };
};
