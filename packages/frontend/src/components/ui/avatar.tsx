"use client";

import * as React from "react";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";

import { cn } from "@lib/utils";
import { useRender } from "@base-ui/react/use-render";
import { mergeProps } from "@base-ui/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { H1 } from "./typography";

function Avatar({
  className,
  size = "default",
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: "default" | "sm" | "lg";
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-full object-cover",
        className,
      )}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs",
        className,
      )}
      {...props}
    />
  );
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute inset-e-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        className,
      )}
      {...props}
    />
  );
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className,
      )}
      {...props}
    />
  );
}

function AvatarGroupCount({
  className,
  render,
  ...props
}: React.ComponentProps<"div"> & useRender.ComponentProps<"div">) {
  const element = useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      {
        className: cn(
          "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
          className,
        ),
        ["data-slot" as string]: "avatar-group-count",
      },
      props,
    ),
  });

  return element;
}

export function AvatarDemo() {
  return (
    <div className="flex flex-col gap-2">
      <H1>Avatar</H1>
      <Avatar>
        <AvatarImage
          src="https://github.com/C0mplexity0.png"
          alt="@C0mplexity0"
        />
        <AvatarFallback>C0</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage alt="@user1" />
        <AvatarFallback>AV</AvatarFallback>
        <AvatarBadge className="bg-green-600 dark:bg-green-800" />
      </Avatar>
      <AvatarGroup>
        <Avatar>
          <AvatarImage
            src="https://github.com/C0mplexity0.png"
            alt="@C0mplexity0"
          />
          <AvatarFallback>C0</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage alt="@user2" />
          <AvatarFallback>RG</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage alt="@user3" />
          <AvatarFallback>HJ</AvatarFallback>
        </Avatar>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <AvatarGroupCount>+2</AvatarGroupCount>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="flex items-center gap-3">
              <Avatar>
                <AvatarImage alt="@user4" />
                <AvatarFallback>LM</AvatarFallback>
              </Avatar>
              User 4
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-3">
              <Avatar>
                <AvatarImage alt="@user5" />
                <AvatarFallback>LM</AvatarFallback>
              </Avatar>
              User 5
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </AvatarGroup>
    </div>
  );
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
};
