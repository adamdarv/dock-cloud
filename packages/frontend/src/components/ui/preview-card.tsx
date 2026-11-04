"use client";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";

import { cn } from "@lib/utils";
import { H1 } from "./typography";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

function PreviewCard({ ...props }: PreviewCardPrimitive.Root.Props) {
  return <PreviewCardPrimitive.Root data-slot="preview-card" {...props} />;
}

function PreviewCardTrigger({ ...props }: PreviewCardPrimitive.Trigger.Props) {
  return (
    <PreviewCardPrimitive.Trigger data-slot="preview-card-trigger" {...props} />
  );
}

function PreviewCardContent({
  className,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 4,
  ...props
}: PreviewCardPrimitive.Popup.Props &
  Pick<
    PreviewCardPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <PreviewCardPrimitive.Portal data-slot="preview-card-portal">
      <PreviewCardPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <PreviewCardPrimitive.Popup
          data-slot="preview-card-content"
          className={cn(
            "z-50 w-64 origin-(--transform-origin) rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-start-2 data-[side=inline-start]:slide-in-from-end-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className,
          )}
          {...props}
        />
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  );
}

export function PreviewCardDemo() {
  return (
    <div className="flex flex-col gap-2">
      <H1>Preview Card</H1>
      <span>
        Project assigned to{" "}
        <PreviewCard>
          <PreviewCardTrigger
            delay={10}
            closeDelay={100}
            render={
              <Button variant="link" className="w-fit">
                @c0mplexity0
              </Button>
            }
          />
          <PreviewCardContent className="flex w-64 flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <Avatar>
                <AvatarImage
                  src="https://github.com/C0mplexity0.png"
                  alt="@C0mplexity0"
                />
                <AvatarFallback>C0</AvatarFallback>
              </Avatar>
              <div className="font-semibold">C0mplexity</div>
            </div>
            <span className="mt-1 text-xs text-muted-foreground">
              Joined December 2021
            </span>
          </PreviewCardContent>
        </PreviewCard>
        .
      </span>
    </div>
  );
}

export { PreviewCard, PreviewCardTrigger, PreviewCardContent };
