"use client";

import { Toaster as Sonner, toast, type ToasterProps } from "sonner";
import {
  IconCircleCheck,
  IconInfoCircle,
  IconAlertTriangle,
  IconAlertOctagon,
  IconLoader,
} from "@tabler/icons-react";
import { H1 } from "./typography";
import { Button } from "./button";

export { toast };

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      icons={{
        success: <IconCircleCheck className="size-4" />,
        info: <IconInfoCircle className="size-4" />,
        warning: <IconAlertTriangle className="size-4" />,
        error: <IconAlertOctagon className="size-4" />,
        loading: <IconLoader className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "cn-toast flex w-(--width) items-center gap-2 rounded-lg border border-border bg-popover p-4 text-sm text-popover-foreground shadow-lg",
          content: "flex min-w-0 flex-1 flex-col gap-1",
          title: "font-medium leading-5",
          description: "text-muted-foreground",
          icon: "flex size-4 shrink-0 items-center justify-center",
          actionButton:
            "rounded-md bg-primary px-3 py-1.5 font-medium text-primary-foreground",
          cancelButton:
            "rounded-md bg-secondary px-3 py-1.5 font-medium text-secondary-foreground",
        },
      }}
      {...props}
    />
  );
};

export function ToastDemo() {
  return (
    <div className="flex flex-col gap-2">
      <H1>Toast</H1>
      <Button
        className="w-fit"
        onClick={() => {
          toast("This is a toast notification!", {
            description: "This is a description for the toast notification.",
            action: {
              label: "Undo",
              onClick: () => alert("Undo action clicked!"),
            },
          });
        }}
      >
        Show Toast
      </Button>
    </div>
  );
}

export { Toaster };
