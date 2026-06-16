"use client";

import { createContext, useContext, useState } from "react";

type NotificationType = "success" | "error";

type NotificationContextType = {
  message: string;
  type: NotificationType;
  showNotification: (msg: string, notifType: NotificationType) => void;
};

const NotificationContext = createContext<NotificationContextType>({
  message: "",
  type: "success",
  showNotification: () => {},
});

export const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<NotificationType>("success");

  const showNotification = (msg: string, notifType: NotificationType) => {
    setMessage(msg);
    setType(notifType);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <NotificationContext value={{ message, type, showNotification }}>
      {message && (
        <p
          className={`bg-${type === "success" ? "green" : type === "error" ? "red" : "blue"}-700 p-2 rounded`}
        >
          {message}
        </p>
      )}
      {children}
    </NotificationContext>
  );
};

export const useNotification = () => useContext(NotificationContext);
