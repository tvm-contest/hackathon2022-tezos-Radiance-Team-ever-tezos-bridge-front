import {configureStore} from "@reduxjs/toolkit";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Provider} from "react-redux";

import StepComponent from "../components/Step2";
import currentStep from "../store/reducers/currentStep";

const store = configureStore({
  preloadedState: {
    currentStep: {
      value: 2,
    },
  },
  reducer: {
    currentStep,
  },
});

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: StepComponent,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  title: "Steps",
} as ComponentMeta<typeof StepComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof StepComponent> = () => <StepComponent />;

export const Step2 = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Step2.args = {};
