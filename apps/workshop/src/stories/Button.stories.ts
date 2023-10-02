import { Meta, StoryObj } from "@storybook/react";
import { Button } from "ui";

const meta = {
  title: "MyUI/Button",
  tags: ["autodocs"],
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Button as Anchor",
    as: "a",
    href: "#",
  },
};
