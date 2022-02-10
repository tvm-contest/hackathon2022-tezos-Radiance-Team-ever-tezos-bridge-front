import {ComponentMeta, ComponentStory} from "@storybook/react";

import SwapButtonComponent from "../components/SwapButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: SwapButtonComponent,
  title: "Buttons",
} as ComponentMeta<typeof SwapButtonComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SwapButtonComponent> = (args) => (
  <SwapButtonComponent {...args} />
);

export const SwapButton = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SwapButton.args = {};
