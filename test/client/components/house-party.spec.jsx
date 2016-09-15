/**
 * Client tests
 */
import React from "react";
import { shallow } from "enzyme";

import HouseParty from "src/components/house-party";

describe("components/resource-list", () => {

  describe("Mounting", () => {

    it("should render into the document", () => {
      const component = shallow(<HouseParty />);
      expect(component).to.not.be.null;
    });

  });

});
