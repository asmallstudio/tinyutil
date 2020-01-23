import React from "react";
import { NextAmbiLink } from "../nextAmbiLink/NextAmbiLink";

const NextMarkdownLink = props => (
  <NextAmbiLink href={props.href}>{props.children}</NextAmbiLink>
);

export { NextMarkdownLink };
