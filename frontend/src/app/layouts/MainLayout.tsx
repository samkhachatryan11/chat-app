import SideBar from "@/app/layouts/SideBar";
import { useAuthStore } from "@/features/auth/stores/useAuthStore";
import Avatar from "@/shared/ui/Avatar";
import MainLoader from "@/shared/ui/loaders/MainLoader";
import { useState } from "react";
import { NavLink, Outlet } from "react-router";

export function MainLayout() {
  const logout = useAuthStore((state) => state.logout);
  const isLoading = useAuthStore((state) => state.isLoading);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const avatar = useAuthStore((state) => state.user?.avatar ?? null);

  return (
    <div>
      <main>
        <div className="flex gap-5 bg-background w-full pt-4 pl-20 pr-20 pb-4">
          <SideBar />
          <div className="w-full rounded-xl bg-white">
            <Outlet />
          </div>
          <div className="relative flex flex-col">
            <div onClick={() => setIsMenuActive(!isMenuActive)}>
              <Avatar size={16} userAvatar={avatar} />
            </div>
            {isMenuActive ? (
              <li className="absolute bg-white flex flex-col text-lg p-1 rounded-xl gap-0.5 top-17 justify-self-start">
                <NavLink className="text-primary" to="/">
                  <ul className="hover:bg-gray-200 p-2.5 rounded-lg flex justify-center items-center w-full">
                    Profile
                  </ul>
                </NavLink>
                <NavLink className="text-primary" to="/">
                  <ul className="hover:bg-gray-200 p-2.5 rounded-lg flex justify-center items-center w-full">
                    Settings
                  </ul>
                </NavLink>
                <NavLink className="text-primary" onClick={logout} to="/">
                  <ul className="hover:bg-gray-200 p-2.5 rounded-lg flex justify-center items-center w-full">
                    {isLoading ? <MainLoader color="primary" /> : "Logout"}
                  </ul>
                </NavLink>
              </li>
            ) : (
              <></>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
