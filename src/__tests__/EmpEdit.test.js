import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import { renderWithRouter, renderWithRouterEdit } from "./testUtils";
import "jest-dom/extend-expect";
import EmpEdit, { UPDATE_EMP } from "../EmpEdit";
import { GET_EMP } from "../EmpDetails";

import { mount, render, fireEvent } from "react-testing-library";
import { MemoryRouter, Route } from "react-router-dom";
import { createMemoryHistory } from "history";

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

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.func = this.func.bind(this);
  }
  componentDidMount() {
    this.func();
  }
  func() {
    // noop
  };
  render() {
    return null;
  }
};

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

it("should render dialog with employee data", async () => {

  console.error(EmpEdit.prototype);
  const spy = jest.spyOn(Test.prototype, 'func');
  let comp = (
    <MemoryRouter initialEntries={["/employeeEdit/1"]}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Route exact path="/employeeEdit/:id" component={EmpEdit} />
      </MockedProvider>
    </MemoryRouter>
  );

  const { debug, getByTestId, getByText } = render(comp);
  

  await wait(0); // wait for response
  //console.error(prettyDOM(getByTestId('id-input', {selector: 'input'}).querySelector('input')))
  //expect(getByTestId('id-input').querySelector('input')).toHaveAttribute('name', 'id');
  expect(getByTestId("id-input").querySelector("input").value).toBe("1");
  expect(getByTestId("firstname-input").querySelector("input").value).toBe(
    "Buck"
  );

  fireEvent.click(getByText("Submit"));
  //debug();
  expect(spy).toHaveBeenCalledTimes(1);
});
