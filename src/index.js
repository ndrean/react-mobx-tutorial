import React from "react";
import ReactDOM from "react-dom";

// import AppV2MobxUseCtx from "./AppV2MobxUseCtx";
import AppV1Mobx from "./AppV1Mobx";
import AppV3PropLift from "./AppV3PropLift";

ReactDOM.render(
  <React.StrictMode>
    <div>
      <AppV1Mobx />
      <AppV3PropLift />
      <h3>The divs use "display: inline-block"</h3>
    </div>

    {/* <AppV2MobxUseCtx /> */}
  </React.StrictMode>,
  document.getElementById("root")
);
