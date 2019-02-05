import React from "react";

import styles from "./layoutGuide.scss";

const LayoutGuide = ({ ...props }) => (
  <div className={styles.container} {...props}>
    <div className={styles.row} id="layout-row">
      <div className="col-xs-12">
        <h1>Layout Guide</h1>
      </div>
      <div
        className="col-xs-12 col-sm-9 col-md-7 col-lg-6 col-xl-3"
        id="layout-test-a"
      >
        <h3>xs 12; sm 10; md 8; lg 6; xl 4</h3>
      </div>
    </div>
    <div className={styles.row} id="layout-row-b">
      <div
        className="col-xs-1 col-xs-offset-1 col-sm-offset-2 col-md-offset-3 col-lg-offset-4 col-xl-offset-5"
        id="layout-test-b"
      >
        <h3>hi</h3>
      </div>
    </div>
    <div className={styles.row} id="layout-row-c">
      <div className="col-xs-12 hidden-md-down hidden-lg-up" id="layout-test-c">
        <h3>hi</h3>
      </div>
    </div>
    <div className={styles.row} id="layout-row-d">
      <div className="col-xs-12">
        <h3 className={styles.mqTest} id="layout-test-d">
          media query test
        </h3>
      </div>
    </div>
  </div>
);

export default LayoutGuide;
