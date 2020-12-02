import React from "react";
import ReactDOM from "react-dom";

// import AppV2MobxUseCtx from "./AppV2MobxUseCtx";
import AppV1Mobx from "./AppV1Mobx";
import AppV3PropLift from "./AppV3PropLift";

ReactDOM.render(
  <React.StrictMode>
    <AppV1Mobx />
    <AppV3PropLift />
    {/* <AppV2MobxUseCtx /> */}
  </React.StrictMode>,
  document.getElementById("root")
);
