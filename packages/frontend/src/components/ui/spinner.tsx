import { cn } from "@lib/utils";
import { IconLoader } from "@tabler/icons-react";
import { H1 } from "./typography";
import { Button } from "./button";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <IconLoader
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export function SpinnerDemo() {
  return (
    <div className="flex flex-col gap-2">
      <H1>Spinner</H1>
      <Spinner />
      <Button variant="secondary" className="flex w-fit items-center gap-2">
        <Spinner className="size-4" />
        Loading...
      </Button>
    </div>
  );
}

export { Spinner };
