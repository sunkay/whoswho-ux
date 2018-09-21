import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import "jest-dom/extend-expect";
import {EmpEdit, UPDATE_EMP } from "../EmpEdit";
import { GET_EMP } from "../EmpDetails";
import { render, fireEvent } from "react-testing-library";
import { MemoryRouter, Route, withRouter } from "react-router-dom";

const wait = require("waait");

const mocks = [
  {
    request: {
      query: UPDATE_EMP,
      variables: { input: { id: "1", firstname: "Buck", lastname: "poodle" } }
    },
    result: {
      data: { employee: { id: "1", firstname: "Changed", lastname: "Changed" } }
    }
  },
  {
    request: {
      query: GET_EMP,
      variables: { id: "1" }
    },
    result: {
      data: { employee: { id: "1", firstname: "Buck", lastname: "poodle" } }
    }
  }
];

it("should render loading state initially", () => {
  const { debug, getByText, container } = render(
    <MemoryRouter initialEntries={["/employeeEdit/1"]}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Route exact path="/employeeEdit/:id" component={EmpEdit} />
      </MockedProvider>
    </MemoryRouter>
  );
  expect(container).toHaveTextContent("Loading...");
});

it("test wrapped component spying", async () => {
  const spy = jest.spyOn(EmpEdit.prototype, "handleSubmit");
  const { debug, getByTestId } = render(
    <MemoryRouter initialEntries={["/employeeEdit/1"]}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Route exact path="/employeeEdit/:id" component={EmpEdit} />
      </MockedProvider>
    </MemoryRouter>
  );
  await wait(0); // wait for response
  expect(getByTestId("id-input").querySelector("input").value).toBe("1");
  expect(getByTestId("firstname-input").querySelector("input").value).toBe(
    "Buck"
  );

  fireEvent.click(getByTestId("submit-button"));
  expect(spy).toHaveBeenCalledTimes(1);
});


it("Test jest.spyOn", () => {
  class Test extends React.Component {
    constructor(props) {
      super(props);
      this.func = this.func.bind(this);
    }
    componentDidMount() {
      this.func();
      this.func2();
    }
    func = () => {
      // noop
    };
    func2() {
      //noop
    }
    render() {
      return null;
    }
  }
  const spy = jest.spyOn(Test.prototype, "func2");
  const { container } = render(<Test />);
  expect(spy).toHaveBeenCalledTimes(1);
});
