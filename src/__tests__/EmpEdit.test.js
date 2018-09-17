import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import { renderWithRouter, renderWithRouterEdit } from "./testUtils";
import "jest-dom/extend-expect";
import EmpEdit, { UPDATE_EMP } from "../EmpEdit";
import { GET_EMP } from "../EmpDetails";

import { render } from "react-testing-library";
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const wait = require('waait');

const mocks = [
  {
    request: {
      query: UPDATE_EMP,
      variables: { input: { id: '1', firstname: 'BuckChanged', lastname: 'LNChanged' } },
    },
    result: { data: { id: '1', firstname: 'BuckChanged', lastname: 'LNChanged' } },
  },
  {
    request: {
      query: GET_EMP,
      variables: { id: 1 },
    },
    result: {
      data: { employee: { id: 1, firstname: 'Buck', lastname: 'poodle' } },
    },
  },
  {
    request: {
      query: GET_EMP,
      variables: { id: 1 },
    },
    result: {
      data: { employee: { id: 1, firstname: 'Buck', lastname: 'poodle' } },
    },
  },
  {
    request: {
      query: GET_EMP,
      variables: { id: 1 },
    },
    result: {
      data: { employee: { id: 1, firstname: 'Buck', lastname: 'poodle' } },
    },
  },
  {
    request: {
      query: GET_EMP,
      variables: { id: 1 },
    },
    result: {
      data: { employee: { id: 1, firstname: 'Buck', lastname: 'poodle' } },
    },
  }




];

it.only("should render without error", () => {
  history = createMemoryHistory({ initialEntries: [] });
  history.push({
    pathname: '/editEmployee',
    search: '?id=1'
  })
  const { debug, container } = render(
    <Router history={history}>
      <MockedProvider mocks={mocks}>
        <EmpEdit />
      </MockedProvider>
    </Router>
  );
});