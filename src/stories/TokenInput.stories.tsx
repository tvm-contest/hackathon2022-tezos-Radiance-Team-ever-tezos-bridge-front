import {ComponentMeta, ComponentStory} from "@storybook/react";

import TokenInputComponent from "../components/TokenInput";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: TokenInputComponent,
  title: "Inputs",
} as ComponentMeta<typeof TokenInputComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TokenInputComponent> = (args) => (
  <TokenInputComponent {...args} />
);

export const TokenInput = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TokenInput.args = {
  label: "Input",
};

export const TokenInputError = Template.bind({});
TokenInputError.args = {
  error: true,
  errorLabel: "Error message",
  label: "Input (with error)",
};
