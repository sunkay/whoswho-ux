import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const GET_EMP = gql`
  query Employee($id: String!) {
    employee(id: $id) {
      id
      firstname
      lastname
    }
  }
`;

function EmpDetails({match}) {
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
        return(
          <div>
          {data.employee.firstname}
         </div> 
        )
      }}
    </Query>
  );
}

export default EmpDetails;
