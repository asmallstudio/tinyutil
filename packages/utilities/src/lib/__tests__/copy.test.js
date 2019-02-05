const copy = require("../copy");
const { expect } = require("chai");

describe("Utils - Copy", function() {
  describe("Phone number unformat", () => {
    it("creates a sanitized phone number", () => {
      const dirtyPhone = "+1 555-5555";
      expect(copy.phoneNumberUnformat(dirtyPhone)).to.equal("+15555555");
    });

    it("removes spaces and other invalid characters", () => {
      const dirtyPhone = "   +1 5a5a5a-5d5s5d5s    ";
      expect(copy.phoneNumberUnformat(dirtyPhone)).to.equal("+15555555");
    });
  });

  describe("Pick first available string", () => {
    it("returns first string value", () => {
      const strings = ["cat", "dog"];
      expect(copy.pickFirstAvailableString(...strings)).to.equal(strings[0]);
    });

    it("returns first string value that is not empty", () => {
      const strings = ["", "dog"];
      expect(copy.pickFirstAvailableString(...strings)).to.equal(strings[1]);
    });

    it("returns undefined for no valid string found", () => {
      const strings = ["", ""];
      expect(copy.pickFirstAvailableString(...strings)).to.be.undefined;
    });

    it("returns undefined for no input", () => {
      expect(copy.pickFirstAvailableString()).to.be.undefined;
    });
  });

  describe("Get full page title", () => {
    it("combines strings", () => {
      const titleInfo = ["Page Title", "Site Title"];
      expect(copy.getFullPageTitle(...titleInfo)).to.equal(
        "Page Title | Site Title"
      );
    });

    it("combines strings with extra spaces", () => {
      const titleInfo = ["  Page Title     ", "  Site Title     "];
      expect(copy.getFullPageTitle(...titleInfo)).to.equal(
        "Page Title | Site Title"
      );
    });
  });

  describe("Get absolute url", () => {
    it("returns absolute url", () => {
      const urlInfo = ["https://bigbertsbananas.info/", "user/login"];
      expect(copy.getAbsoluteUrl(...urlInfo.reverse())).to.equal(
        "https://bigbertsbananas.info/user/login"
      );
    });
  });

  describe("Format relative date string", () => {
    function getPastDate(s) {
      const pastDateObj = new Date(Date.now() - s * 1000);
      return pastDateObj.toUTCString();
    }

    it("returns seconds ago", () => {
      const pastTime = getPastDate(30);
      const [num, unit, ago] = copy
        .formatRelativeDateString(pastTime)
        .split(" ");
      expect(+num).to.be.closeTo(30, 1);
      expect(unit).to.equal("seconds");
      expect(ago).to.equal("ago");
    });

    it("returns minutes ago", () => {
      const pastTime = getPastDate(120);
      const res = copy.formatRelativeDateString(pastTime);
      expect(res).to.equal("2 minutes ago");
    });

    it("returns hours ago", () => {
      const pastTime = getPastDate(60 * 60);
      const res = copy.formatRelativeDateString(pastTime);
      expect(res).to.equal("1 hours ago");
    });

    it("returns days ago", () => {
      const pastTime = getPastDate(60 * 60 * 24);
      const res = copy.formatRelativeDateString(pastTime);
      expect(res).to.equal("1 days ago");
    });

    it("returns months ago", () => {
      const pastTime = getPastDate(60 * 60 * 24 * 31);
      const res = copy.formatRelativeDateString(pastTime);
      expect(res).to.equal("1 months ago");
    });

    it("returns years ago", () => {
      const pastTime = getPastDate(60 * 60 * 24 * 31 * 12);
      const res = copy.formatRelativeDateString(pastTime);
      expect(res).to.equal("1 years ago");
    });
  });

  describe("Create slug from title", () => {
    it("creates a url safe slug", () => {
      const res = copy.createSlugFromTitle({
        title: "My @##$)()horse likes beets"
      });
      expect(res).to.equal("my-horse-likes-beets");
    });
  });

  describe("Create slug from title and date", () => {
    it("creates a formatted and url safe slug", () => {
      const title = "Boom chika /wow %*@&#@wow";
      const date = new Date("01-15-2019");
      const res = copy.createSlugFromTitleAndDate({
        title,
        date
      });
      expect(res).to.equal(`2019-1-15-boom-chika-wow-wow`);
    });
  });
});
