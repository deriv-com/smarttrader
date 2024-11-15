import React from "react";
import AntiClickjack from "../_common/includes/anti_clickjack.jsx";

const Callback = () => (
  <html>
    <head>
      <AntiClickjack />
      {it.js_files.map((js_file, inx) => (
        <script
          key={inx}
          src={js_file.replace(
            "{PLACEHOLDER_FOR_LANG}",
            it.language.toLowerCase()
          )}
        />
      ))}
      <link href="https://style.binary.com/binary.css" rel="stylesheet" />
      <meta name="referrer" content="origin" />
    </head>
    <body>
      <div id="content-holder">
        <div id="content">
          <div id="callback_container" />
          <div id="deriv_iframe" />
        </div>
      </div>
    </body>
  </html>
);

export default Callback;
