import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { Heading } from "@/shared/ui/typography/Heading";

export function RegisterPage() {
  return (
    <div className="flex justify-center items-center h-full w-1/2 p-10">
      <div className="flex flex-col gap-6 items-center w-full">
        <Heading level={2} className="text-blue-500">
          Welcome!
        </Heading>
        <RegisterForm />
      </div>
    </div>
  );
}
