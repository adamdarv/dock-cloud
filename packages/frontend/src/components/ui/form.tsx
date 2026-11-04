import { Form as FormPrimitive } from "@base-ui/react";
import { H1 } from "./typography";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "./field";
import { Input } from "./input";
import { Button } from "./button";

export function Form({ ...props }: FormPrimitive.Props) {
  return <FormPrimitive {...props} />;
}

export function FormDemo() {
  return (
    <div className="flex flex-col gap-2">
      <H1>Form</H1>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          console.log(formData.get("test1"), formData.get("test2"));
        }}
      >
        <FieldSet>
          <FieldLegend>Test</FieldLegend>
          <FieldDescription>Enter some test values.</FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="test1">Test 1</FieldLabel>
              <Input
                id="test1"
                name="test1"
                autoComplete="off"
                placeholder="Test 1"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="test2">Test 2</FieldLabel>
              <Input
                id="test2"
                name="test2"
                autoComplete="off"
                placeholder="Test 2"
              />
            </Field>
          </FieldGroup>
        </FieldSet>
        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </Form>
    </div>
  );
}
