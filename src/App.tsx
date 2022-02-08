import {CssBaseline} from "@mui/material";

import Header from "./components/Header";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Subheader from "./components/Subheader";
import Summary from "./components/Summary";

export default function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Subheader />
      <Summary />
      <Step1 />
      <Step2 />
      <Step3 />
    </>
  );
}
