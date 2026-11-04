"use client";

import * as React from "react";
import { AlertDialog as AlertDialoguePrimitive } from "@base-ui/react/alert-dialog";

import { cn } from "@lib/utils";
import { Button } from "@components/ui/button";
import { H1 } from "./typography";
import { IconTrash } from "@tabler/icons-react";
import { Anchor, AnchorExternalIcon } from "./anchor";

function AlertDialogue({ ...props }: AlertDialoguePrimitive.Root.Props) {
  return <AlertDialoguePrimitive.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogueTrigger({
  ...props
}: AlertDialoguePrimitive.Trigger.Props) {
  return (
    <AlertDialoguePrimitive.Trigger
      data-slot="alert-dialog-trigger"
      {...props}
    />
  );
}

function AlertDialoguePortal({
  ...props
}: AlertDialoguePrimitive.Portal.Props) {
  return (
    <AlertDialoguePrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  );
}

function AlertDialogueOverlay({
  className,
  ...props
}: AlertDialoguePrimitive.Backdrop.Props) {
  return (
    <AlertDialoguePrimitive.Backdrop
      data-slot="alert-dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/10 duration-100 data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0 supports-backdrop-filter:backdrop-blur-xs",
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogueContent({
  className,
  size = "default",
  ...props
}: AlertDialoguePrimitive.Popup.Props & {
  size?: "default" | "sm";
}) {
  return (
    <AlertDialoguePortal>
      <AlertDialogueOverlay />
      <AlertDialoguePrimitive.Popup
        data-slot="alert-dialog-content"
        data-size={size}
        className={cn(
          "group/alert-dialog-content fixed inset-s-1/2 top-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm rtl:translate-x-1/2",
          className,
        )}
        {...props}
      />
    </AlertDialoguePortal>
  );
}

function AlertDialogueHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-start sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogueFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogueMedia({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-media"
      className={cn(
        "mb-2 inline-flex size-10 items-center justify-center rounded-md bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-6",
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogueTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialoguePrimitive.Title>) {
  return (
    <AlertDialoguePrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        "font-heading text-base font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogueDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialoguePrimitive.Description>) {
  return (
    <AlertDialoguePrimitive.Description
      data-slot="alert-dialog-description"
      className={cn(
        "text-sm text-balance text-muted-foreground md:text-pretty",
        className,
      )}
      {...props}
    />
  );
}

function AlertDialogueAction({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="alert-dialog-action"
      className={cn(className)}
      {...props}
    />
  );
}

function AlertDialogueCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}: AlertDialoguePrimitive.Close.Props &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <AlertDialoguePrimitive.Close
      data-slot="alert-dialog-cancel"
      className={cn(className)}
      render={<Button variant={variant} size={size} />}
      {...props}
    />
  );
}

export function AlertDialogueDemo() {
  return (
    <div className="flex flex-col gap-2">
      <H1>Alert Dialogue</H1>
      <AlertDialogue>
        <AlertDialogueTrigger
          render={<Button className="w-fit">Open Alert Dialogue</Button>}
        ></AlertDialogueTrigger>
        <AlertDialogueContent>
          <AlertDialogueHeader>
            <AlertDialogueTitle>Alert Dialogue</AlertDialogueTitle>
            <AlertDialogueDescription>
              This is an example of an alert dialogue.
            </AlertDialogueDescription>
          </AlertDialogueHeader>
          <AlertDialogueFooter>
            <AlertDialogueCancel>Cancel</AlertDialogueCancel>
            <AlertDialogueAction>Continue</AlertDialogueAction>
          </AlertDialogueFooter>
        </AlertDialogueContent>
      </AlertDialogue>
      <AlertDialogue>
        <AlertDialogueTrigger
          render={
            <Button variant="destructive" className="w-fit">
              Delete Project
            </Button>
          }
        />
        <AlertDialogueContent size="sm">
          <AlertDialogueHeader>
            <AlertDialogueMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <IconTrash />
            </AlertDialogueMedia>
            <AlertDialogueTitle>Delete project?</AlertDialogueTitle>
            <AlertDialogueDescription>
              This will permanently delete this project.
              <br />
              <Anchor>
                Learn more
                <AnchorExternalIcon />
              </Anchor>
            </AlertDialogueDescription>
          </AlertDialogueHeader>
          <AlertDialogueFooter>
            <AlertDialogueCancel variant="outline">Cancel</AlertDialogueCancel>
            <AlertDialogueAction variant="destructive">
              Delete
            </AlertDialogueAction>
          </AlertDialogueFooter>
        </AlertDialogueContent>
      </AlertDialogue>
    </div>
  );
}

export {
  AlertDialogue,
  AlertDialogueAction,
  AlertDialogueCancel,
  AlertDialogueContent,
  AlertDialogueDescription,
  AlertDialogueFooter,
  AlertDialogueHeader,
  AlertDialogueMedia,
  AlertDialogueOverlay,
  AlertDialoguePortal,
  AlertDialogueTitle,
  AlertDialogueTrigger,
};
