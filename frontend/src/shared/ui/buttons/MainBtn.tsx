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
      className={`${btnType === "primary" ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-white hover:bg-gray-200 text-blue-500"} font-bold py-2 px-4 rounded transition duration-200`}
    >
      {children}
    </button>
  );
}
