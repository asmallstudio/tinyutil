import React from "react";
import { Link } from "@reach/router";

const AmbiLink = ({ to = "", children, ...props }) => {
  const testIsInternal = to => {
    if (typeof to !== "string") return true;
    return (
      !to.match(/^#/) &&
      !to.match(/^[a-z]{1,10}:\/\//) &&
      !to.match(/^mailto:|^tel:/)
    );
  };

  const isInternal = testIsInternal(to);

  if (isInternal) {
    return (
      <Link to={to} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={to} {...props}>
      {children}
    </a>
  );
};

export { AmbiLink };
