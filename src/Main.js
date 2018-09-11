import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Route } from "react-router-dom";
import EmpList from "./EmpList";
import MgrList from "./MgrList";
import EmpDetails from "./EmpDetails";
import ApolloAutoComplete from "./ApolloAutoComplete";
import EmpAdd from "./EmpAdd";
import EmpDelete from "./EmpDelete";
import EmpEdit from "./EmpEdit";


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
        <Route path="/employee/:id" component={EmpDetails} />
        <Route path="/addemployee" component={EmpAdd} />
        <Route path="/editEmployee/:id" component={EmpEdit} />
        <Route path="/deleteEmployee/:id/:firstname" component={EmpDelete} />
      </div>
    </main>
  );
}

export default withStyles(styles)(Main);
