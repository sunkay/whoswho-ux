import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = {
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 700,
    tableLayout: 'auto'
  },
  tablecell: {
    fontSize: "100pt",
    width: 'auto'
  },
};

const GET_EMP = gql`
  query {
    employees {
      id
      firstname
      lastname
    }
  }
`;

function EmpList(props) {
  const { classes } = props;

  return (
    <Query query={GET_EMP}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error :(</div>;
        var listItems = data.employees.map(emp => {
          return (
            <TableRow key={emp.id} className={classes.tablecell}>
              <TableCell>{emp.firstname}</TableCell>
              <TableCell>{emp.lastname}</TableCell>
              <TableCell>{emp.id}</TableCell>
            </TableRow>
          );
        });
        return (
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow className={classes.tablecell}>
                  <TableCell>FirstName</TableCell>
                  <TableCell>LastName</TableCell>
                  <TableCell>ID</TableCell>
                </TableRow>
                {listItems}
              </TableHead>
            </Table>
          </Paper>
        );
      }}
    </Query>
  );
}

export default withStyles(styles)(EmpList);
