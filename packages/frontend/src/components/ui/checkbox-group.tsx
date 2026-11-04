import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react/checkbox-group";
import { cn } from "@lib/utils";
import { Field } from "./field";
import { Label } from "./label";
import { Checkbox } from "./checkbox";
import { H1 } from "./typography";

export function CheckboxGroup({
  className,
  ...props
}: CheckboxGroupPrimitive.Props) {
  return (
    <CheckboxGroupPrimitive
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

export function CheckboxGroupDemo() {
  return (
    <div className="flex flex-col gap-2">
      <H1>Checkbox Group</H1>
      <CheckboxGroup aria-label="Checkbox group" defaultValue={["checkbox-2"]}>
        <Field orientation="horizontal">
          <Checkbox id="checkbox-1" name="checkbox-1" />
          <Label htmlFor="checkbox-1">Checkbox 1</Label>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="checkbox-2" name="checkbox-2" />
          <Label htmlFor="checkbox-2">Checkbox 2</Label>
        </Field>
      </CheckboxGroup>
    </div>
  );
}
