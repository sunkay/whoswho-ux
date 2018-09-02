import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import {renderWithRouter} from "./testUtils";
import "jest-dom/extend-expect";
import EmpAdd, { ADD_EMP } from "../EmpAdd";
import { render } from "react-testing-library";

const wait = require('waait');

const mocks = [
  {
    request: {
      query: ADD_EMP,
      variables: { input: {id: '1', firstname: 'Buck', lastname: 'LN' }},
    },
    result: { data: {id: '1'}},
  },
];

it("should render without error", () => {
  const { debug, container } = render(
    <MockedProvider mocks={[]} addTypename={false}>
      <EmpAdd />
    </MockedProvider>
  );
});

it("should render loading state initially", () => {
    const { debug, container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <EmpAdd />
    </MockedProvider>
  );
  debug(container);
});

/*
it('should render employee', async () => {
  const EmpMock = {
    request: {
      query: GET_EMP,
      variables: { id: 1 },
    },
    result: {
      data: { employee: { id: 1, firstname: 'Buck', lastname: 'poodle' }},
    },
  };

  const { debug, container } = renderWithRouter(
    <MockedProvider mocks={[EmpMock]} addTypename={false}>
      <EmpDetails match={{ params: { id: 1 } }} />
    </MockedProvider>,
  );

  await wait(0); // wait for response
  //debug();
  expect(container).toHaveTextContent('Buck');
  expect(container).toHaveTextContent('Poodle');
});
*/