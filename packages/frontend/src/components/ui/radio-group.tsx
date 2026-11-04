"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";

import { cn } from "@lib/utils";
import { H1 } from "./typography";
import { Label } from "./label";

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-full gap-2", className)}
      {...props}
    />
  );
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 dark:data-checked:bg-primary",
        className,
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-4 items-center justify-center"
      >
        <span className="absolute inset-s-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground rtl:translate-x-1/2" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
}

export function RadioGroupDemo() {
  return (
    <div className="flex flex-col gap-2">
      <H1>Radio Group</H1>
      <RadioGroup defaultValue="option1" aria-label="Radio Group Demo">
        <div className="flex items-center gap-3">
          <RadioGroupItem value="option1" id="option1" />
          <Label htmlFor="option1">Option 1</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="option2" id="option2" />
          <Label htmlFor="option2">Option 2</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="option3" id="option3" />
          <Label htmlFor="option3">Option 3</Label>
        </div>
      </RadioGroup>
    </div>
  );
}

export { RadioGroup, RadioGroupItem };
