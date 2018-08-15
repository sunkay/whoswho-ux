import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const GET_EMP = gql`
    query {
        employees{
            id
            firstname
            lastname
        }
    }
`;

const EmpList = () => (
    <Query query={GET_EMP}>
        {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error :(</div>;  
            var listItems = data.employees.map((emp) => {
                return <li key={emp.id}>{emp.firstname}</li>
            })    
            return(
                <ul>{listItems}</ul>
            ) 

        }}
    </Query>
)


export default EmpList;