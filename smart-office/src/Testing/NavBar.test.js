import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavBar from "../Components/NavBar";

configure({ adapter: new Adapter() });

describe("<NavBar />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavBar />);
  });

  it("Back button not visible", () => {
    wrapper.setProps({ element: null });
    expect(wrapper.find("button")).toHaveLength(2);
  });

  it("Back button visible", () => {
    expect(wrapper.find("button")).toHaveLength(3);
  });
});
