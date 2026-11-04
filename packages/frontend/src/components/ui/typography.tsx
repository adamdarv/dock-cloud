import { cn } from "@lib/utils";

export function H1({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "mb-4 text-4xl font-bold tracking-tight text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function H2({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "mb-3 text-3xl font-bold tracking-tight text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function H3({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "mb-1.5 text-2xl font-bold tracking-tight text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function H4({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={cn(
        "mb-1.5 text-2xl font-bold tracking-tight text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function H5({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      className={cn(
        "mb-1 text-xl font-bold tracking-tight text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function H6({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h6
      className={cn(
        "mb-1 text-lg font-bold tracking-tight text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function P({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("leading-7", className)} {...props} />;
}

export function TypographyDemo() {
  return (
    <div>
      <H1>Typography</H1>
      <H1>H1 Lorem Ipsum</H1>
      <H2>H2 Lorem Ipsum</H2>
      <H3>H3 Lorem Ipsum</H3>
      <H4>H4 Lorem Ipsum</H4>
      <H5>H5 Lorem Ipsum</H5>
      <H6>H6 Lorem Ipsum</H6>
      <P>Paragraph</P>
    </div>
  );
}
