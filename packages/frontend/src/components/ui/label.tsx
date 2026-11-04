"use client";

import * as React from "react";

import { cn } from "@lib/utils";
import { H1 } from "./typography";
import { Input } from "./input";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 px-1 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export function LabelDemo() {
  return (
    <div className="flex flex-col gap-2">
      <H1>Label</H1>
      <Label htmlFor="input">Label</Label>
      <Input id="input" placeholder="Input" className="rounded-md border p-2" />
    </div>
  );
}

export { Label };
