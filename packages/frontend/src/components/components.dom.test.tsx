import { test, expect } from "bun:test";
import { AlertDemo } from "./ui/alert";
import { AlertDialogueDemo } from "./ui/alert-dialogue";
import { AnchorDemo } from "./ui/anchor";
import { AvatarDemo } from "./ui/avatar";
import { BadgeDemo } from "./ui/badge";
import { BreadcrumbDemo } from "./ui/breadcrumb";
import { ButtonDemo } from "./ui/button";
import { ButtonGroupDemo } from "./ui/button-group";
import { CardDemo } from "./ui/card";
import { CheckboxDemo } from "./ui/checkbox";
import { CheckboxGroupDemo } from "./ui/checkbox-group";
import { DialogueDemo } from "./ui/dialogue";
import { DropdownMenuDemo } from "./ui/dropdown-menu";
import { FieldDemo } from "./ui/field";
import { FormDemo } from "./ui/form";
import { InputDemo } from "./ui/input";
import { InputGroupDemo } from "./ui/input-group";
import { KbdDemo } from "./ui/kbd";
import { LabelDemo } from "./ui/label";
import { LinkDemo } from "./ui/link";
import { PopoverDemo } from "./ui/popover";
import { PreviewCardDemo } from "./ui/preview-card";
import { RadioGroupDemo } from "./ui/radio-group";
import { SeparatorDemo } from "./ui/separator";
import { SheetDemo } from "./ui/sheet";
import { SkeletonDemo } from "./ui/skeleton";
import { SliderDemo } from "./ui/slider";
import { ToastDemo } from "./ui/sonner";
import { SpinnerDemo } from "./ui/spinner";
import { SwitchDemo } from "./ui/switch";
import { TabsDemo } from "./ui/tabs";
import { TextareaDemo } from "./ui/textarea";
import { ToggleDemo } from "./ui/toggle";
import { ToggleGroupDemo } from "./ui/toggle-group";
import { TooltipDemo } from "./ui/tooltip";
import { TypographyDemo } from "./ui/typography";
import type { ReactNode } from "react";
import { render, screen, act } from "@testing-library/react";

const components = [
  {
    component: <AlertDemo />,
    componentName: "Alert",
    targetString: "Action",
  },
  {
    component: <AnchorDemo />,
    componentName: "Anchor",
    targetString: "Anchor External",
  },
  {
    component: <AvatarDemo />,
    componentName: "Avatar",
    targetString: "RG",
  },
  {
    component: <BadgeDemo />,
    componentName: "Badge",
    targetString: "Primary",
  },
  {
    component: <BreadcrumbDemo />,
    componentName: "Breadcrumb",
    targetString: "Components",
  },
  {
    component: <ButtonDemo />,
    componentName: "Button",
    targetString: "Primary",
  },
  {
    component: <ButtonGroupDemo />,
    componentName: "Button Group",
    targetString: "Button Group",
  },
  {
    component: <CardDemo />,
    componentName: "Card",
    targetString: "Card",
  },
  {
    component: <CheckboxDemo />,
    componentName: "Checkbox",
    targetString: "Checkbox",
  },
  {
    component: <CheckboxGroupDemo />,
    componentName: "Checkbox Group",
    targetString: "Checkbox Group",
  },
  {
    component: <DialogueDemo />,
    componentName: "Dialogue",
    targetString: "Dialogue",
  },
  {
    component: <DropdownMenuDemo />,
    componentName: "Dropdown Menu",
    targetString: "Dropdown Menu",
  },
  {
    component: <FieldDemo />,
    componentName: "Field",
    targetString: "Field",
  },
  {
    component: <FormDemo />,
    componentName: "Form",
    targetString: "Form",
  },
  {
    component: <InputDemo />,
    componentName: "Input",
    targetString: "Input",
  },
  {
    component: <InputGroupDemo />,
    componentName: "Input Group",
    targetString: "Input Group",
  },
  {
    component: <KbdDemo />,
    componentName: "Kbd",
    targetString: "Kbd",
  },
  {
    component: <LabelDemo />,
    componentName: "Label",
    targetString: "Label",
  },
  {
    component: <LinkDemo />,
    componentName: "Link",
    targetString: "Link",
  },
  {
    component: <PopoverDemo />,
    componentName: "Popover",
    targetString: "Popover",
  },
  {
    component: <PreviewCardDemo />,
    componentName: "Preview Card",
    targetString: "Preview Card",
  },
  {
    component: <RadioGroupDemo />,
    componentName: "Radio Group",
    targetString: "Radio Group",
  },
  {
    component: <SeparatorDemo />,
    componentName: "Separator",
    targetString: "Separator",
  },
  {
    component: <SheetDemo />,
    componentName: "Sheet",
    targetString: "Sheet",
  },
  {
    component: <SkeletonDemo />,
    componentName: "Skeleton",
    targetString: "Skeleton",
  },
  {
    component: <SliderDemo />,
    componentName: "Slider",
    targetString: "Slider",
  },
  {
    component: <ToastDemo />,
    componentName: "Toast",
    targetString: "Toast",
  },
  {
    component: <SpinnerDemo />,
    componentName: "Spinner",
    targetString: "Spinner",
  },
  {
    component: <SwitchDemo />,
    componentName: "Switch",
    targetString: "Switch",
  },
  {
    component: <TabsDemo />,
    componentName: "Tabs",
    targetString: "Tabs",
  },
  {
    component: <TextareaDemo />,
    componentName: "Textarea",
    targetString: "Textarea",
  },
  {
    component: <ToggleDemo />,
    componentName: "Toggle",
    targetString: "Toggle",
  },
  {
    component: <ToggleGroupDemo />,
    componentName: "Toggle Group",
    targetString: "Toggle Group",
  },
  {
    component: <TooltipDemo />,
    componentName: "Tooltip",
    targetString: "Tooltip",
  },
  {
    component: <TypographyDemo />,
    componentName: "Typography",
    targetString: "Typography",
  },
];

function testComponent(
  component: ReactNode,
  componentName: string,
  targetString: string,
) {
  test(`renders the ${componentName} component correctly`, () => {
    render(component);

    const element = screen.getAllByText(targetString);
    expect(element).toBeTruthy();
  });
}

components.forEach((component) => {
  testComponent(
    component.component,
    component.componentName,
    component.targetString,
  );
});

test("renders the AlertDialogueDemo component correctly", () => {
  render(<AlertDialogueDemo />);

  const element = screen.getAllByText("Alert Dialogue");
  expect(element).toBeTruthy();

  act(() => {
    const openButton = screen.getByText("Open Alert Dialogue");
    openButton.click();
  });

  const actionButton = screen.getByText("Delete Project");
  expect(actionButton).toBeTruthy();

  act(() => {
    actionButton.click();
  });
});
