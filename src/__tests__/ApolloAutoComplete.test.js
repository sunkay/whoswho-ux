import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import {renderWithRouter} from "./testUtils";
import { render, getByPlaceholderText } from "react-testing-library";
import "jest-dom/extend-expect";
import ApolloAutocompleteRoute, {GET_ALL_EMP } from "../ApolloAutoComplete";
const wait = require('waait');

it("should render search box", () => {
    const { debug, getByPlaceholderText, container } = renderWithRouter(
    <MockedProvider mocks={[]} addTypename={false}>
      <ApolloAutocompleteRoute />
    </MockedProvider>
  );
  //debug(getByPlaceholderText("Search an employee"));
  expect(getByPlaceholderText("Search an employee")).toBeVisible();

});

/*
it('should render autocomplete input', async () => {
  const AllEmpMock = {
    request: {
      query: GET_ALL_EMP,
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
    <MockedProvider mocks={[AllEmpMock]} addTypename={false}>
      <ApolloAutoComplete />
    </MockedProvider>,
  );

  await wait(1); // wait for response
  //debug(getByText('Buck1'));
  expect(container).toHaveTextContent('Buck0');
  expect(container).toHaveTextContent('Buck1');
  expect(container).toHaveTextContent('Buck2');
  expect(container).toHaveTextContent('Buck3');

});
*/