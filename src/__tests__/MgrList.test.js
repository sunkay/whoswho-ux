import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import {renderWithRouter} from "./testUtils";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import MgrList, { GET_MGR_LIST } from "../MgrList";
const wait = require('waait');

it("should render loading state initially", () => {
    const { debug, container } = renderWithRouter(
    <MockedProvider mocks={[]} addTypename={false}>
      <MgrList />
    </MockedProvider>
  );
  expect(container).toHaveTextContent('Loading...');

});


it('should render Manager', async () => {
  const MgrMock = {
    request: {
      query: GET_MGR_LIST,
    },
    result: {
      data: { 
        managers: [
          { id: '0', firstname: 'Buck0', lastname: 'poodle0' },
          { "id": '1', firstname: 'Buck1', lastname: 'poodle1' },
          { id: '2', firstname: 'Buck2', lastname: 'poodle2' },
          { id: '3', firstname: 'Buck3', lastname: 'poodle3' },
        ]
      },
    },
  };

  const { getByText, debug, container } = render(
    <MockedProvider mocks={[MgrMock]} addTypename={false}>
      <MgrList />
    </MockedProvider>,
  );

  await wait(1); // wait for response
  //debug(getByText('Buck1'));
  expect(container).toHaveTextContent('Buck0');
  expect(container).toHaveTextContent('Buck1');
  expect(container).toHaveTextContent('Buck2');
  expect(container).toHaveTextContent('Buck3');

});
