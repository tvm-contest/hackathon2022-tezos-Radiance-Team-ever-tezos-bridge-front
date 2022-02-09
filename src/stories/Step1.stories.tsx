import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Provider} from "react-redux";

import Step1Component from "../components/Step1";
import store from "../store";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: Step1Component,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  title: "Steps",
} as ComponentMeta<typeof Step1Component>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Step1Component> = () => (
  <Step1Component />
);

export const Step1 = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Step1.args = {};
