/* global beforeTest forAll session resize createDriver afterTest checkLayout */
// TO RUN
// `galen test layout.test.js --htmlreport reports`

const devices = {
  // Had to remove the `smallMobileTests` for now because
  // the selenium driver cannot render a Chrome window that
  // small :(, have not found a way to override that yet...
  // smallMobile: {
  //   deviceName: "smallMobile",
  //   tags: ["smallMobile", "all"],
  //   size: "300x1500"
  // },
  mobile: {
    deviceName: "mobile",
    tags: ["mobile", "all"],
    size: "320x1500"
  },
  smallTablet: {
    deviceName: "smallTablet",
    tags: ["smallTablet", "all"],
    size: "736x1500"
  },
  tablet: {
    deviceName: "tablet",
    tags: ["tablet", "all"],
    size: "1024x1500"
  },
  desktop: {
    deviceName: "desktop",
    tags: ["desktop", "all"],
    size: "1200x1500"
  }
};

beforeTest(() => {
  const driver = createDriver("http://localhost:3000", "1024x768");
  session.put("driver", driver);
});

forAll(devices, device => {
  test(`Home page on ${device.deviceName}`, device => {
    const driver = session.get("driver");
    resize(driver, device.size);
    checkLayout(driver, "layout.gspec", device.tags);
  });
});

afterTest(() => {
  const driver = session.get("driver");

  driver.quit();
});
