import React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { GET_EMP_LIST } from "./EmpList";
import { withRouter } from "react-router-dom";

export const ADD_EMP = gql`
  mutation AddEmployee($input: AddEmployeeInput) {
    addEmployee(input: $input) {
      id
    }
  }
`;

class EmpAdd extends React.Component {
  state = {
    open: true
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.setState({ open: true });
  }

  componentWillReceiveProps() {
    this.setState({ open: true });
  }

  handleSubmit = (addEmp, e) => {
    e.preventDefault();
    addEmp({
      variables: {
        input: {
          id: this.id.value,
          firstname: this.firstname.value,
          lastname: this.lastname.value
        }
      }
    })
      .then(data => {
        // redirect to list employees
        this.props.history.push("/employees");
      })
      .catch(err => {
        console.error("Error: ", JSON.stringify(err, null, 2));
      });
    this.handleClose();
  };

  handleUpdate = (cache, { data: { addEmployee } }) => {
    const { employees } = cache.readQuery({ query: GET_EMP_LIST });
    cache.writeQuery({
      query: GET_EMP_LIST,
      data: {
        employees: employees.concat([
          {
            id: addEmployee.id,
            firstname: this.firstname.value,
            lastname: this.lastname.value,
            __typename: "Employee"
          }
        ])
      }
    });
  };

  handleCancel = () => {
    this.handleClose();
    this.props.history.push("/employees");
  }

  render() {
    return (
      <div>
        <Mutation mutation={ADD_EMP} update={this.handleUpdate}>
          {(addEmp, { loading, error }) => {
            return (
              <div>
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Please fill out all information accurately...
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="firstname"
                      inputRef={el => (this.firstname = el)}
                      label="First Name"
                      fullWidth
                    />
                    <TextField
                      margin="dense"
                      id="lastname"
                      inputRef={el => (this.lastname = el)}
                      label="Last Name"
                      fullWidth
                    />
                    <TextField
                      margin="dense"
                      id="ID"
                      inputRef={el => (this.id = el)}
                      label="ID"
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleCancel} color="primary">
                      Cancel
                    </Button>
                    <Button
                      onClick={this.handleSubmit.bind(this, addEmp)}
                      color="primary"
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
                {loading && <p>Loading...</p>}
                {error && <p>Error :( Please try again</p>}
              </div>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(EmpAdd);
