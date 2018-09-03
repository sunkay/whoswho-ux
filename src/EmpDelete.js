import React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withRouter } from "react-router-dom";
import { GET_EMP_LIST } from "./EmpList";

export const DEL_EMP = gql`
  mutation DeleteEmployee($id: String!, $firstname: String!) {
    deleteEmployee(id: $id, firstname: $firstname) {
      id, 
      firstname, 
      lastname
    }
  }
`;

class EmpDelete extends React.Component {
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

  componentWillReceiveProps(){
    this.setState({ open: true });
  }

  handleSubmit = (deleteEmp, e) => {
    //console.log("In EmpDelete:handleSubmit", this.props.match.params);
    e.preventDefault();
    deleteEmp({
        variables:{
            id: this.props.match.params.id,
            firstname: this.props.match.params.firstname,
        }
    }).then(data => {
        // redirect to list employees
        this.props.history.push("/employees");
    }).catch(err => {
        console.error("Error: ", JSON.stringify(err, null, 2));
    })
    this.handleClose();
  }

  handleUpdate = (cache, { data: {deleteEmployee} }) => {
    const { employees } = cache.readQuery({ query: GET_EMP_LIST})
    let filteredList = employees.filter(item => item.id !== deleteEmployee.id);

    cache.writeQuery({
      query: GET_EMP_LIST,
      data: { employees: filteredList}
    });
  }

  handleCancel = () => {
    this.handleClose();
    this.props.history.push("/employees");
  }

  render() {
    return (
      <div>
        <Mutation 
          mutation={DEL_EMP}
          update={this.handleUpdate}
        >
          {(delEmp, { loading, error }) => {
            return (
              <div>
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Delete Employee</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Are you sure you want to permanently delete an employee record?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleCancel} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.handleSubmit.bind(this, delEmp)}
                    color="secondary">
                      Delete
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

export default withRouter(EmpDelete);
