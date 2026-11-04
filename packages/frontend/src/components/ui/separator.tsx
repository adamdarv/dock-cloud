"use client";

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";

import { cn } from "@lib/utils";
import { H1 } from "./typography";

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
        className,
      )}
      {...props}
    />
  );
}

export function SeparatorDemo() {
  return (
    <div className="flex flex-col gap-2">
      <H1>Separator</H1>
      <div className="flex h-5 items-center gap-4 text-sm">
        <div>Item 1</div>
        <Separator orientation="vertical" />
        <div>Item 2</div>
        <Separator orientation="vertical" />
        <div>Item 3</div>
      </div>
    </div>
  );
}

export { Separator };
