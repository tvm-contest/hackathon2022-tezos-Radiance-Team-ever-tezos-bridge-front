import {configureStore} from "@reduxjs/toolkit";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Provider} from "react-redux";

import EnterValuesComponent from "../components/EnterValues";
import currentStep from "../store/reducers/currentStep";
import {Step} from "../types";

const store = configureStore({
  preloadedState: {
    currentStep: {
      value: Step.EnterValues,
    },
  },
  reducer: {
    currentStep,
  },
});

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: EnterValuesComponent,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  title: "Steps",
} as ComponentMeta<typeof EnterValuesComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EnterValuesComponent> = () => (
  <EnterValuesComponent />
);

export const EnterValues = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
EnterValues.args = {};
