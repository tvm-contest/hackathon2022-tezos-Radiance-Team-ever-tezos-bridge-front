import {ComponentMeta, ComponentStory} from "@storybook/react";

import TokenInput from "../components/TokenInput";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: TokenInput,
  title: "Input",
} as ComponentMeta<typeof TokenInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TokenInput> = (args) => (
  <TokenInput {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  label: "Token Input",
};
