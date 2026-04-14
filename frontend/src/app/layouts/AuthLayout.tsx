import { Outlet } from "react-router";
import Logo from "./Logo";
import ChatLogo from "@/assets/chat-logo";

export function AuthLayout() {
  return (
    <div>
      <main>
        <div className="flex flex-col justify-center items-center w-1/2 bg-blue-500">
          <Logo />
          <div>
            <ChatLogo />
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
