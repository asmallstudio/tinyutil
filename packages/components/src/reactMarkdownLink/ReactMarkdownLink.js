import React from "react";
import { AmbiLink } from "../ambiLink/AmbiLink";

export function ReactMarkdownLink(props) {
  return <AmbiLink to={props.href}>{props.children}</AmbiLink>;
}
