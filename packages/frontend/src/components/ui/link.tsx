import { Link as RouterLink, MemoryRouter } from "react-router";

export function Link({
  to,
  prefetch,
  ...props
}: React.ComponentProps<typeof RouterLink>) {
  return (
    <RouterLink prefetch={prefetch ? prefetch : "intent"} to={to} {...props} />
  );
}

export function LinkDemo() {
  return (
    <MemoryRouter>
      <Link to="/">Link</Link>
    </MemoryRouter>
  );
}
