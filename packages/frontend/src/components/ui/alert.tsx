import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@lib/utils";
import { H1 } from "./typography";
import { IconArrowUpRight, IconInfoCircle } from "@tabler/icons-react";
import { Button } from "./button";

const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-start text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pe-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-medium group-has-[>svg]/alert:col-start-2",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-sm text-balance text-muted-foreground md:text-pretty [&_p:not(:last-child)]:mb-4",
        className,
      )}
      {...props}
    />
  );
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute inset-e-2 top-2", className)}
      {...props}
    />
  );
}

export function AlertDemo() {
  return (
    <div className="flex flex-col gap-2">
      <H1>Alert</H1>
      <Alert>
        <IconInfoCircle />
        <AlertTitle>Alert example</AlertTitle>
        <AlertDescription>This is an example of an alert.</AlertDescription>
        <AlertAction>
          <Button size="xs" variant="default">
            <IconArrowUpRight /> Action
          </Button>
        </AlertAction>
      </Alert>
      <Alert variant="destructive">
        <IconInfoCircle />
        <AlertTitle>Alert example</AlertTitle>
        <AlertDescription>
          This is an example of an alert. It can be used to display important
          information to the user.
        </AlertDescription>
      </Alert>
    </div>
  );
}

export { Alert, AlertTitle, AlertDescription, AlertAction };
