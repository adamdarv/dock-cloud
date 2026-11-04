import { IconAlertTriangleFilled } from "@tabler/icons-react";
import { Button } from "../button";
import { H1, P } from "../typography";
import { Link } from "@components/ui/link";

export function NotFoundPage() {
  return (
    <main className="flex size-full items-center justify-center">
      <div className="max-w-100">
        <div className="mb-3 flex flex-row items-center gap-3">
          <IconAlertTriangleFilled className="size-14" />
          <H1 className="mb-0 block size-fit text-5xl">404</H1>
        </div>
        <P>
          Oops! This page could not be found. It may have been moved or deleted.
        </P>
        <Button className="mt-5" nativeButton={false} render={<Link to="/" />}>
          Return Home
        </Button>
      </div>
    </main>
  );
}

export { NotFoundPage as Component };
