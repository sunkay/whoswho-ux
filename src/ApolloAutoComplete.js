import React from "react";
import { gql } from "apollo-boost";
import Downshift from "downshift";

import EmpList from "./EmpList";

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250
  },
  container: {
    flexGrow: 1,
    position: "relative"
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  inputRoot: {
    flexWrap: "wrap"
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

const GET_EMP = gql`
  query {
    employees {
      id
      firstname
      lastname
    }
  }
`;

export default function ApolloAutoComplete(props) {
  const { classes } = props;

  return (
    <Downshift onChange={item => alert(item)}>
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        inputValue,
        selectedItem,
        highlightedIndex,
        isOpen
      }) => (
        <div>
          <label {...getLabelProps()}>Enter a color</label>
          <br />
          <input {...getInputProps()} />
          {isOpen ? (
            <div>
              <EmpList />
            </div>
          ) : null}
        </div>
      )}
    </Downshift>
  );
}

function ApolloAutocompleteMenu({
  data: {allColors, loading},
  selectedItem,
  highlightedIndex,
  getItemProps,
}) {
  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      {allColors.map(({name: item}, index) =>
        <div
          {...getItemProps({
            item,
            index,
            key: item,
            style: {
              backgroundColor: highlightedIndex === index ? 'gray' : 'white',
              fontWeight: selectedItem === item ? 'bold' : 'normal',
            },
          })}
        >
          {item}
        </div>,
      )}
    </div>
  )
}
