import React from "react";
import { AmbiLink } from "../ambiLink/AmbiLink";

const ReactMarkdownLink = props => (
  <AmbiLink to={props.href}>{props.children}</AmbiLink>
);

export { ReactMarkdownLink };
