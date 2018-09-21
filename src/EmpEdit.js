import React from "react";
import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { GET_EMP } from "./EmpDetails";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";

export const UPDATE_EMP = gql`
  mutation UpdateEmployee($input: AddEmployeeInput) {
    updateEmployee(input: $input) {
      id
      firstname
      lastname
    }
  }
`;

export class EmpEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }
  

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.setState({ open: true });

    this.setState({
      firstname: this.employee ? this.employee.firstname : "",
      lastname: this.employee ? this.employee.lastname : "",
      id: this.employee ? this.employee.id : ""
    });
  }

  componentWillReceiveProps() {
    this.setState({ open: true });
  }

  handleInputChange = evt => {
    const target = evt.target;
    this.setState({
      [target.name]: target.value
    });
  };

  handleSubmit(updateEmp, e){
    e.preventDefault();
    updateEmp({
      variables: {
        input: {
          id: this.state.id,
          firstname: this.state.firstname,
          lastname: this.state.lastname
        }
      }
    })
      .then(data => {
        this.props.history.push("/employees");
      })
      .catch(err => {
        console.error("Error: ", JSON.stringify(err, null, 2));
      });
    this.handleClose();
  };

  handleCancel = () => {
    this.handleClose();
    this.props.history.push("/employees");
  };

  handleQueryCompleted = ({ employee }) => {
    this.setState({
      firstname: employee.firstname,
      lastname: employee.lastname,
      id: employee.id
    });
  };

  render() {
    const { match } = this.props;
    var id = match.params.id;
    return (
      <Query
        query={GET_EMP}
        variables={{ id }}
        onCompleted={this.handleQueryCompleted}
      >
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error :( {console.log(error)}</div>;
          this.employee = data.employee;
          return (
            <Mutation mutation={UPDATE_EMP} update={this.handleUpdate}>
              {(updateEmp, { loading, error }) => {
                if (loading) return <div>Loading...</div>;
                if (error) return <div>Error :( {console.log(error)}</div>;
                return (
                  <div>
                    <Dialog open={this.state.open} onClose={this.handleClose}>
                      <DialogTitle>Editing employee details</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Please fill out all information accurately...
                        </DialogContentText>
                        <TextField
                          autoFocus
                          margin="dense"
                          data-testid="firstname-input"
                          name="firstname"
                          value={this.state.firstname}
                          onChange={this.handleInputChange}
                          label="First Name"
                          fullWidth
                        />
                        <TextField
                          margin="dense"
                          name="lastname"
                          data-testid="lastname-input"
                          value={this.state.lastname}
                          onChange={this.handleInputChange}
                          label="Last Name"
                          fullWidth
                        />
                        <TextField
                          margin="dense"
                          disabled
                          data-testid="id-input"
                          name="id"
                          value={this.state.id}
                          onChange={this.handleInputChange}
                          label="ID"
                          fullWidth
                        />
                      </DialogContent>

                      <DialogActions>
                        <Button onClick={this.handleCancel} color="primary">
                          Cancel
                        </Button>
                        <Button
                          data-testid="submit-button"
                          onClick={this.handleSubmit.bind(this, updateEmp)}
                          color="primary"
                        >
                          Submit
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(EmpEdit);
