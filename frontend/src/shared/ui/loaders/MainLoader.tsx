import styles from "@/shared/ui/loaders/MainLoader.module.css";

interface MainLoaderProps {
  color: "primary" | "secondary";
}

export default function MainLoader({ color }: MainLoaderProps) {
  return (
    <div
      className={
        color === "primary" ? styles.primary_loader : styles.secondary_loader
      }
    ></div>
  );
}
