import { mergeProps, useRender } from "@base-ui/react";
import { cn } from "@lib/utils";
import { IconArrowUpRight } from "@tabler/icons-react";
import { H1 } from "./typography";

export function Anchor({
  className,
  render,
  ...props
}: useRender.ComponentProps<"a">) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(
          "text-sky-700 underline underline-offset-3 hover:text-sky-900 dark:text-sky-300 dark:hover:text-sky-200",
          className,
        ),
      },
      props,
    ),
    render,
  });
}

export function AnchorExternalIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <IconArrowUpRight
      className={cn("ml-px inline size-4", className)}
      {...props}
    />
  );
}

export function AnchorDemo() {
  return (
    <div className="flex flex-col gap-2">
      <H1>Anchor</H1>
      <Anchor href="#">Anchor</Anchor>
      <Anchor href="#" target="_blank">
        Anchor External
        <AnchorExternalIcon />
      </Anchor>
    </div>
  );
}
