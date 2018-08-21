import React from "react";
import { gql } from "apollo-boost";
import Downshift from "downshift";

import { Query } from "react-apollo";

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
  query AllEmployees($inputValue: String!){
    allEmployees(filter: $inputValue) {
      id
      firstname
      lastname
    }
  }
`;

function ApolloAutocomplete() {
  return (
    <Downshift onChange={selectedItem => alert(selectedItem)}>
      {({
        inputValue,
        getInputProps,
        getMenuProps,
        getItemProps,
        selectedItem,
        highlightedIndex,
        isOpen,
      }) => (
        <div>
          <input {...getInputProps()} />
          <ApolloAutoCompleteMenu
            {...{
              inputValue,
              getMenuProps,
              getItemProps,
              selectedItem,
              highlightedIndex,
              isOpen,
            }}
          />
        </div>
      )}
    </Downshift>
  )
}

function ApolloAutoCompleteMenu({
  selectedItem,
  highlightedIndex,
  isOpen,
  getItemProps,
  getMenuProps,
  inputValue,
}){
  if(!isOpen){
    return null
  }

  return(
    <Query
      query={GET_EMP}
      variables={{
        inputValue,
      }}
    >
    {({loading, error, data}) => {
      console.log("data", data);
      const allEmps = (data && data.allEmployees) || []

      if(loading){
        return <div>loading...</div>
      }

      if(error){
        return <div>Error! ${error.message}</div>
      }

      return(
        <ul
            {...getMenuProps({
              style: {padding: 0, margin: 0, listStyle: 'none'},
            })}
          >
            {allEmps.map(({firstname: item}, index) => (
              <li
                key={item}
                {...getItemProps({
                  index,
                  item,
                  style: {
                    backgroundColor:
                      highlightedIndex === index ? 'lightgray' : 'white',
                    fontWeight: selectedItem === item ? 'bold' : 'normal',
                  },
                })}
              >
                {item}
              </li>
            ))}
          </ul>
      )
    }}
    </Query>
  )
}

export default ApolloAutocomplete;