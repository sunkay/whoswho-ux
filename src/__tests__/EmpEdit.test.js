import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import {renderWithRouter} from "./testUtils";
import "jest-dom/extend-expect";
import EmpEdit, { UPDATE_EMP } from "../EmpEdit";
import { GET_EMP } from "../EmpDetails";

import { render } from "react-testing-library";

const wait = require('waait');

const mocks = [
  {
    request: {
      query: UPDATE_EMP,
      variables: { input: {id: '1', firstname: 'BuckChanged', lastname: 'LNChanged' }},
    },
    result: { data: {id: '1', firstname: 'BuckChanged', lastname: 'LNChanged'}},
  },
  {
    request: {
      query: GET_EMP,
      variables: { id: 1 },
    },
    result: {
      data: { employee: { id: 1, firstname: 'Buck', lastname: 'poodle' }},
    },
  },
  {
    request: {
      query: GET_EMP,
      variables: { id: 1 },
    },
    result: {
      data: { employee: { id: 1, firstname: 'Buck', lastname: 'poodle' }},
    },
  },
  {
    request: {
      query: GET_EMP,
      variables: { id: 1 },
    },
    result: {
      data: { employee: { id: 1, firstname: 'Buck', lastname: 'poodle' }},
    },
  },
  {
    request: {
      query: GET_EMP,
      variables: { id: 1 },
    },
    result: {
      data: { employee: { id: 1, firstname: 'Buck', lastname: 'poodle' }},
    },
  }



  
];

it("should render without error", () => {
  const { debug, container } = renderWithRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <EmpEdit match={{params: {id:'1'}}}/>
    </MockedProvider>
  );
});

it("should render loading state initially", () => {
    const { debug, container } = renderWithRouter(
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