import { cn } from "@lib/utils";
import { H1 } from "./typography";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export function SkeletonDemo() {
  return (
    <div className="flex flex-col gap-2">
      <H1>Skeleton</H1>
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-62.5" />
          <Skeleton className="h-4 w-50" />
        </div>
      </div>
    </div>
  );
}

export { Skeleton };
