import SideBar from "@/app/layouts/SideBar";
import { useAuthStore } from "@/features/auth/stores/useAuthStore";
import { MainBtn } from "@/shared/ui/buttons/MainBtn";
import MainLoader from "@/shared/ui/loaders/MainLoader";
import { Outlet } from "react-router";

export function MainLayout() {
  const logout = useAuthStore((state) => state.logout);
  const isLoading = useAuthStore((state) => state.isLoading);

  return (
    <div>
      <main>
        <div className="flex gap-5 bg-background w-full pt-4 pl-20 pr-20 pb-4">
          <SideBar />
          <div className="w-full rounded-xl bg-white">
            <Outlet />
          </div>
          <div className="flex flex-col w-30.5">
            <MainBtn btnType="primary" onClick={logout}>
              {isLoading ? <MainLoader /> : "Logout"}
            </MainBtn>
          </div>
        </div>
      </main>
    </div>
  );
}
