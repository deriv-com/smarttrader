import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const CallbackContainer = () => {
  return <h1>Hello</h1>;
};

export const init = () => {
  console.log("init lmao");
  ReactDOM.render(<CallbackContainer />, getElementById("callback_container"));
};

export default init;
