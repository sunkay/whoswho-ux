import React  from "react";
import { gql } from "apollo-boost";
import Downshift from "downshift";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { Query } from "react-apollo";
import { MenuItem } from "@material-ui/core";
//import { Route } from "react-router-dom";
//import EmpDetails from "./EmpDetails";

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
  query AllEmployees($inputValue: String!) {
    allEmployees(filter: $inputValue) {
      id
      firstname
      lastname
    }
  }
`;

function forwardToEmployeeDetailsPage(selectedItem) {
  console.log(selectedItem);

  alert(selectedItem.id);
}

function ApolloAutocomplete(props) {
  const { classes } = props;

  return (
    <Downshift 
      onChange={forwardToEmployeeDetailsPage}
      itemToString={item => (item ? item.firstname+", "+item.lastname : "")}
    >
      {({
        inputValue,
        getInputProps,
        getMenuProps,
        getItemProps,
        selectedItem,
        highlightedIndex,
        isOpen
      }) => (
        <div className={classes.container}>
          {renderInput({
            fullWidth: true,
            classes,
            InputProps: getInputProps({
              placeholder: "Search an employee (start with a)"
            })
          })}
          <ApolloAutoCompleteMenu
            {...{
              inputValue,
              getMenuProps,
              getItemProps,
              selectedItem,
              highlightedIndex,
              isOpen,
              classes
            }}
          />
        </div>
      )}
    </Downshift>
  );
}

function ApolloAutoCompleteMenu({
  selectedItem,
  highlightedIndex,
  isOpen,
  getItemProps,
  getMenuProps,
  inputValue,
  classes
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <Query
      query={GET_EMP}
      variables={{
        inputValue
      }}
    >
      {({ loading, error, data }) => {
        const allEmps = (data && data.allEmployees) || [];

        if (loading) {
          return <div>loading...</div>;
        }

        if (error) {
          return <div>Error! ${error.message}</div>;
        }

        return (
          <Paper className={classes.paper} square>
            <ul
              {...getMenuProps({
                style: { padding: 0, margin: 0, listStyle: "none" }
              })}
            >
              {allEmps.map(({ firstname, id, lastname }, index) => (
                <MenuItem
                  key={id}
                  {...getItemProps({
                    index,
                    item:{firstname: firstname, id: id, lastname: lastname},
                    style: {
                      backgroundColor:
                        highlightedIndex === index ? "lightgray" : "white",
                      fontWeight: selectedItem === firstname ? "bold" : "normal"
                    }
                  })}
                >
                  {firstname}, {lastname}
                </MenuItem>
              ))}
            </ul>
          </Paper>
        );
      }}
    </Query>
  );
}

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot
        },
        ...InputProps
      }}
      {...other}
    />
  );
}

export default withStyles(styles)(ApolloAutocomplete);
