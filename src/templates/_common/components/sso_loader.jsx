import React from "react";

const SSOLoader = () => (
  <div className="sso-loader">
    <div className="sso-loader__content">
      <img
        src="/images/common/sso_loader.gif"
        width={234}
        height={234}
        alt="loader"
      />
      <h3 className="sso-loader__title">Getting your account ready</h3>
    </div>
  </div>
);

export default SSOLoader;
