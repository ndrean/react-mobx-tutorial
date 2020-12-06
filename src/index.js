import React from "react";
import ReactDOM from "react-dom";

// import AppV2MobxUseCtx from "./AppV2MobxUseCtx";
import AppMobx from "./AppMobx";
import AppReact from "./AppReact";

ReactDOM.render(
  <React.StrictMode>
    <div>
      <AppMobx />
      <AppReact />
      <h3>The divs use "display: inline-block"</h3>
    </div>

    {/* <AppV2MobxUseCtx /> */}
  </React.StrictMode>,
  document.getElementById("root")
);
