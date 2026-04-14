import SideBar from "@/app/layouts/SideBar";
import { Outlet } from "react-router";

export function MainLayout() {
  return (
    <div>
      <main>
        <div className="flex bg-gray-200 w-full pt-4 pl-20 pr-20 pb-4">
          <SideBar />
          <div>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
