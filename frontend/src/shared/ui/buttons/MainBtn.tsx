import type { ReactNode } from "react";

interface MainBtnProps {
  children: ReactNode;
  btnType: "primary" | "secondary";
  disabled?: any;
  onClick: any;
}

export function MainBtn({
  children,
  btnType,
  disabled,
  onClick,
}: MainBtnProps) {
  return (
    <button
      onClick={onClick}
      type="submit"
      disabled={disabled}
      className={`${btnType === "primary" ? "bg-primary hover:opacity-95 text-white" : "bg-white hover:bg-gray-200 text-blue-500"} flex items-center justify-center font-bold py-2 px-4 rounded-md transition duration-200 w-full min-h-10`}
    >
      {children}
    </button>
  );
}
