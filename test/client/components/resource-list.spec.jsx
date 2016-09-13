/**
 * Client tests
 */
import React from "react";
import { shallow } from "enzyme";

import ResourceList from "src/components/resource-list";

describe("components/resource-list", () => {

  describe("Mounting", () => {

    it("should render into the document", () => {
      const component = shallow(<ResourceList />);
      expect(component).to.not.be.null;
    });

  });

});
