import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import {renderWithRouter} from "./testUtils";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import EmpList, { GET_EMP, GET_EMP_LIST } from "../EmpList";
const wait = require('waait');

it("should render loading state initially", () => {
    const { debug, container } = renderWithRouter(
    <MockedProvider mocks={[]} addTypename={false}>
      <EmpList />
    </MockedProvider>
  );
  expect(container).toHaveTextContent('Loading...');

});


it('should render employee', async () => {
  const EmpMock = {
    request: {
      query: GET_EMP_LIST,
    },
    result: {
      data: { 
        employees: [
          { id: '0', firstname: 'Buck0', lastname: 'poodle0' },
          { "id": '1', firstname: 'Buck1', lastname: 'poodle1' },
          { id: '2', firstname: 'Buck2', lastname: 'poodle2' },
          { id: '3', firstname: 'Buck3', lastname: 'poodle3' },
        ]
      },
    },
  };

  const { debug, container } = render(
    <MockedProvider mocks={[EmpMock]} addTypename={false}>
      <EmpList />
    </MockedProvider>,
  );

  await wait(1); // wait for response
  //debug();
  expect(container).toHaveTextContent('Buck');
});
