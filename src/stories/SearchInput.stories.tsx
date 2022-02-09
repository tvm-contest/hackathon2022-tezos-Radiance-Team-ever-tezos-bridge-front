import {ComponentMeta, ComponentStory} from "@storybook/react";

import SearchInputComponent from "../components/SearchInput";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: SearchInputComponent,
  title: "Inputs",
} as ComponentMeta<typeof SearchInputComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SearchInputComponent> = (args) => (
  <SearchInputComponent {...args} />
);

export const SearchInput = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SearchInput.args = {};
