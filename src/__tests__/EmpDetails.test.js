import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import {renderWithRouter} from "./testUtils";
import "jest-dom/extend-expect";
import EmpDetails, { GET_EMP } from "../EmpDetails";

const wait = require('waait');

it("should render loading state initially", () => {
    const { debug, container } = renderWithRouter(
    <MockedProvider mocks={[]} addTypename={false}>
      <EmpDetails match={{ params: { id: 1 } }} />
    </MockedProvider>
  );
  expect(container).toHaveTextContent('Loading...');

});


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