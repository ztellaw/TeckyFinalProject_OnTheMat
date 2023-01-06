import React from "react";
import { showNotification } from "@mantine/notifications";
export function successNotifications(messages: string) {
  showNotification({
    title: "Successful",
    autoClose: 2000,
    message: messages,
    color: "green",
  });
}
export function errorNotifications(messages: string) {
  showNotification({
    title: "Error",
    autoClose: 2000,
    message: messages,
    color: "red",
  });
}
