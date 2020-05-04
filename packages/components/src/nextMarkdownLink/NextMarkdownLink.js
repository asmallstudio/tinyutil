import React from "react";
import { NextAmbiLink } from "../nextAmbiLink/NextAmbiLink";

export function NextMarkdownLink(props) {
  return <NextAmbiLink href={props.href}>{props.children}</NextAmbiLink>;
}
