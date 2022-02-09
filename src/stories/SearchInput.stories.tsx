import {ComponentMeta, ComponentStory} from "@storybook/react";

import SearchInput from "../components/SearchInput";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: SearchInput,
  title: "Search Input",
} as ComponentMeta<typeof SearchInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SearchInput> = (args) => (
  <SearchInput {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};
