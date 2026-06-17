import { User } from "@/assets/user";

const sizes = {
  12: "size-12",
  16: "size-16",
  20: "size-20",
  30: "size-30",
} as const;

type Size = keyof typeof sizes;

export default function Avatar({
  userAvatar,
  size = 16,
}: {
  userAvatar?: string | null;
  size?: Size;
}) {
  return (
    <div
      className={`relative cursor-pointer inline-flex items-end-safe box-border hover:outline active:outline outline-secondary justify-center shrink-0 overflow-hidden rounded-full bg-white ${sizes[size]}`}
    >
      {userAvatar ? (
        <img
          src={`${import.meta.env.VITE_BACKEND_API_URL}/${userAvatar}`}
          alt="Avatar"
          className="h-full w-full object-cover"
        />
      ) : (
        <User size={size * 5} />
      )}
    </div>
  );
}
