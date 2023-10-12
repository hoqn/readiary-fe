import { Meta, StoryObj } from "@storybook/react";
import { Button } from "ui";

const meta = {
  title: "MyUI/Button",
  tags: ["autodocs"],
  component: Button,
  args: {
    children: "Button",
  },
  argTypes: {
    tint: {
      options: ["primary", "neutral"],
      control: { type: "radio" },
    },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
    variant: {
      options: ["tonal", "contained", "text"],
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onClick: () => {},
    tint: "primary",
    size: "medium",
    variant: "tonal",
  },
};
