import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "../Components/Main";

configure({ adapter: new Adapter() });

describe("<Main />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Main />);
  });

  it("No elements in databes -> no items", () => {
    wrapper.setProps({ localElementsContainer: undefined });
    expect(wrapper.find("Item")).toHaveLength(0);
  });

  it("Breadcrumbs render", () => {
    expect(wrapper.find(".breadcrumbs")).toHaveLength(1);
  });
});
