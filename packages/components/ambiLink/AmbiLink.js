import React from "react";
import { Link } from "@reach/router";

class AmbiLink extends React.Component {
  isInternal(to) {
    if (typeof to !== "string") return true;
    return (
      !to.match(/^#/) &&
      !to.match(/^[a-z]{1,10}:\/\//) &&
      !to.match(/^mailto:|^tel:/)
    );
  }

  render() {
    const { to = "", children, ...rest } = this.props;
    const isInternal = this.isInternal(to);
    if (isInternal) {
      return (
        <Link to={to} {...rest}>
          {children}
        </Link>
      );
    }
    return (
      <a href={to} {...rest}>
        {children}
      </a>
    );
  }
}

export { AmbiLink };
