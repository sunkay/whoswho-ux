import React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Divider } from "@material-ui/core";

export const ADD_EMP = gql`
  mutation AddEmployee($input: Input!) {
    addEmployee(input: $input) {
      id
      firstname
      lastname
    }
  }
`;
const styles = {
    card: {
      minWidth: 275
    },
    search: {
      marginLeft: 20,
      marginRight: 20
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)"
    },
    title: {
      marginBottom: 16,
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    },
    top: {
      marginTop: 10
    }
  };
  
  function EmpAdd(props) {
    const { classes } = props;
    const { match } = props;
    const bull = <span className={classes.bullet}>•</span>;
    var id = "1", firstname="ded", lastname="asfasf";

    return (
      <Mutation
        mutation={ADD_EMP}
        variables={{
          firstname,
          lastname
        }}
      >
        {({ loading, error, data }) => {
            console.log(loading, error, data);
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error :(</div>;
            console.log(data, error);
          return (
            <Paper>
              <div className={classes.search}>
                <Divider className={classes.top}/>
              </div>
            </Paper>
          );
        }}
      </Mutation>
    );
  }
  
  export default withStyles(styles)(EmpAdd);
  