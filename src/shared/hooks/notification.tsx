import { addToast } from "@heroui/react";

export function useNotification() {

  const showNotification = (
    description: string,
    type: "success" | "danger" | "warning" | "default"
  ) => {
    addToast({
      description,
      color: type,
      timeout: 5000,
      classNames: {
        closeButton: "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
      },
    });
  };

  return { showNotification };
}
