import {configureStore} from "@reduxjs/toolkit";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Provider} from "react-redux";

import ConfirmTezosEverComponent from "../components/ConfirmTezosEver";
import currentStep from "../store/reducers/currentStep";
import {Step} from "../types";

const store = configureStore({
  preloadedState: {
    currentStep: {
      value: Step.ConfirmTezosEver,
    },
  },
  reducer: {
    currentStep,
  },
});

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: ConfirmTezosEverComponent,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  title: "Steps",
} as ComponentMeta<typeof ConfirmTezosEverComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ConfirmTezosEverComponent> = () => (
  <ConfirmTezosEverComponent />
);

export const ConfirmTezosEver = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ConfirmTezosEver.args = {};
