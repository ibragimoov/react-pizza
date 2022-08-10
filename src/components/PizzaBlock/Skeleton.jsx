import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="146" cy="132" r="120" />
    <rect x="0" y="287" rx="10" ry="10" width="280" height="37" />
    <rect x="0" y="452" rx="10" ry="10" width="91" height="30" />
    <rect x="147" y="444" rx="30" ry="30" width="133" height="48" />
    <rect x="0" y="343" rx="10" ry="10" width="280" height="88" />
  </ContentLoader>
);

export default Skeleton;
