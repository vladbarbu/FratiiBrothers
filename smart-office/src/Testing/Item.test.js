import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Item from "../Components/Item";

configure({ adapter: new Adapter() });

describe("<Item />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Item />);
  });

  it("Breadcrumbs render", () => {});
});
