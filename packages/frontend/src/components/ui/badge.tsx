import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@lib/utils";
import { H1 } from "./typography";

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40",
        outline: "border-border text-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props,
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  });
}

export function BadgeDemo() {
  return (
    <div className="flex flex-col gap-2">
      <H1>Badge</H1>
      <Badge>Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
        Blue
      </Badge>
      <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
        Green
      </Badge>
      <Badge className="bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
        Sky
      </Badge>
      <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
        Purple
      </Badge>
      <Badge className="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
        Red
      </Badge>
    </div>
  );
}

export { Badge, badgeVariants };
