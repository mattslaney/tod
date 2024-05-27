import type { Meta, StoryObj } from "@storybook/react";

import Button, { ButtonType } from "../../app/components/dialpad/Button";
import "../../app/globals.css";

const meta: Meta<typeof Button> = {
  title: "Dialpad/Button",
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Number: Story = {
  args: {
    label: "0",
    type: ButtonType.default,
  },
};
