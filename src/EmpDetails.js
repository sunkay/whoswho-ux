import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { withStyles } from "@material-ui/core/styles";
import ApolloAutoComplete from "./ApolloAutoComplete";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const GET_EMP = gql`
  query Employee($id: String!) {
    employee(id: $id) {
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
      marginTop: 75
  }
};


function EmpDetails(props) {
  const { classes } = props;
  const { match } = props;
  const bull = <span className={classes.bullet}>•</span>;
  var id = match.params.id;
  return (
    <Query
      query={GET_EMP}
      variables={{
        id
      }}
    >
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error :(</div>;
        return (
          <Card className={classes.card}>
          <CardContent>
            <ApolloAutoComplete />
            <Typography variant="headline" component="h2" className={classes.top}>
              {data.employee.firstname}
              {bull}
              {data.employee.lastname}
              {bull}
              {data.employee.id}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">More...</Button>
          </CardActions>
        </Card>
        );
      }}
    </Query>
  );
}

export default withStyles(styles)(EmpDetails);
