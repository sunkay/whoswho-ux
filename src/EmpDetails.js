import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Divider } from "@material-ui/core";
import ApolloAutoComplete from "./ApolloAutoComplete";

const GET_EMP = gql`
  query Employee($id: String!) {
    employee(id: $id) {
      id
      firstname
      lastname
    }
  }
`;

function EmpDetails({ match }) {
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
          <div>
            <ApolloAutoComplete />
            <Divider />
            Firstname: {data.employee.firstname}
            <Divider />
            Lastname: {data.employee.lastname}
            <Divider />
            ID: {data.employee.id}
          </div>
        );
      }}
    </Query>
  );
}

export default EmpDetails;
