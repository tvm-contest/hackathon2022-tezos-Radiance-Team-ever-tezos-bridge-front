import {ComponentMeta, ComponentStory} from "@storybook/react";

import tonAssets from "../../ton-assets.json";
import TokenListPopup from "../components/TokenListPopup";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: TokenListPopup,
  title: "Popups",
} as ComponentMeta<typeof TokenListPopup>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TokenListPopup> = (args) => (
  <TokenListPopup {...args} />
);

export const TokenListEmpty = Template.bind({});
TokenListEmpty.args = {
  tokens: [],
};

export const TokenListWithTonTokens = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TokenListWithTonTokens.args = {
  tokens: tonAssets.tokens.map((t) => ({...t, balance: 0})),
};
