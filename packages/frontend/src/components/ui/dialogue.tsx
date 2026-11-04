"use client";

import * as React from "react";
import { Dialog as DialoguePrimitive } from "@base-ui/react/dialog";

import { cn } from "@lib/utils";
import { Button } from "@components/ui/button";
import { IconX } from "@tabler/icons-react";
import { H1 } from "./typography";

function Dialogue({ ...props }: DialoguePrimitive.Root.Props) {
  return <DialoguePrimitive.Root data-slot="dialogue" {...props} />;
}

function DialogueTrigger({ ...props }: DialoguePrimitive.Trigger.Props) {
  return <DialoguePrimitive.Trigger data-slot="dialogue-trigger" {...props} />;
}

function DialoguePortal({ ...props }: DialoguePrimitive.Portal.Props) {
  return <DialoguePrimitive.Portal data-slot="dialogue-portal" {...props} />;
}

function DialogueClose({ ...props }: DialoguePrimitive.Close.Props) {
  return <DialoguePrimitive.Close data-slot="dialogue-close" {...props} />;
}

function DialogueOverlay({
  className,
  ...props
}: DialoguePrimitive.Backdrop.Props) {
  return (
    <DialoguePrimitive.Backdrop
      data-slot="dialogue-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/10 duration-100 data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0 supports-backdrop-filter:backdrop-blur-xs",
        className,
      )}
      {...props}
    />
  );
}

function DialogueContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialoguePrimitive.Popup.Props & {
  showCloseButton?: boolean;
}) {
  return (
    <DialoguePortal>
      <DialogueOverlay />
      <DialoguePrimitive.Popup
        data-slot="dialogue-content"
        className={cn(
          "fixed inset-s-1/2 top-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 sm:max-w-sm rtl:translate-x-1/2",
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialoguePrimitive.Close
            data-slot="dialogue-close"
            render={
              <Button
                variant="ghost"
                className="absolute inset-e-2 top-2"
                size="icon-sm"
              />
            }
          >
            <IconX />
            <span className="sr-only">Close</span>
          </DialoguePrimitive.Close>
        )}
      </DialoguePrimitive.Popup>
    </DialoguePortal>
  );
}

function DialogueHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialogue-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function DialogueFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean;
}) {
  return (
    <div
      data-slot="dialogue-footer"
      className={cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialoguePrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialoguePrimitive.Close>
      )}
    </div>
  );
}

function DialogueTitle({ className, ...props }: DialoguePrimitive.Title.Props) {
  return (
    <DialoguePrimitive.Title
      data-slot="dialogue-title"
      className={cn(
        "font-heading text-base leading-none font-medium",
        className,
      )}
      {...props}
    />
  );
}

function DialogueDescription({
  className,
  ...props
}: DialoguePrimitive.Description.Props) {
  return (
    <DialoguePrimitive.Description
      data-slot="dialogue-description"
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function DialogueDemo() {
  return (
    <div className="flex flex-col gap-2">
      <H1>Dialogue</H1>
      <Dialogue>
        <DialogueTrigger
          render={<Button variant="outline" />}
          className="w-fit"
        >
          Open Dialogue
        </DialogueTrigger>
        <DialogueContent>
          <DialogueHeader>
            <DialogueTitle>Are you absolutely sure?</DialogueTitle>
            <DialogueDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogueDescription>
          </DialogueHeader>
          <DialogueFooter>
            <DialogueClose render={<Button variant="outline">Close</Button>} />
          </DialogueFooter>
        </DialogueContent>
      </Dialogue>
    </div>
  );
}

export {
  Dialogue,
  DialogueClose,
  DialogueContent,
  DialogueDescription,
  DialogueFooter,
  DialogueHeader,
  DialogueOverlay,
  DialoguePortal,
  DialogueTitle,
  DialogueTrigger,
};
