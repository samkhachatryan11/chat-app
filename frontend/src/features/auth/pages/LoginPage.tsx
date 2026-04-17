import { LoginForm } from "@/features/auth/components/LoginForm";
import { Heading } from "@/shared/ui/typography/Heading";

export function LoginPage() {
  return (
    <div className="flex justify-center items-center h-full w-1/2 p-10">
      <div className="flex flex-col gap-6 items-center w-full">
        <Heading level={2} className="text-primary">
          Welcome!
        </Heading>
        <LoginForm />
      </div>
    </div>
  );
}
