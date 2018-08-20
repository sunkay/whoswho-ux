import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Route } from "react-router-dom";
import EmpList from "./EmpList";
import MgrList from "./MgrList";
import ApolloAutoComplete from "./ApolloAutoComplete";

const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "auto"
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  }
});

function Main(props) {
  const { classes } = props;

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <div className={classes.tableContainer}>
        <Route exact path="/" component={ApolloAutoComplete} />
        <Route path="/employees" component={EmpList} />
        <Route path="/managers" component={MgrList} />
      </div>
    </main>
  );
}

export default withStyles(styles)(Main);
