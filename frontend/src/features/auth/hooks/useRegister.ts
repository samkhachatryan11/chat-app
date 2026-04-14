import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterInput,
} from "@/features/auth/schemas/registerSchema";
import { authService } from "@/features/auth/services/authService";

export const useRegister = () => {
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: "all",
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await authService.register(data);
  });

  return { form, onSubmit };
};
