import React from "react"
import renderer from "react-test-renderer"
import Nav from "../nav"
describe("Nav", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Nav/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})