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

  componentWillReceiveProps(){
    this.setState({ open: true });
  }

  handleSubmit = (addEmp, e) => {
    e.preventDefault();
    addEmp({
        variables:{
            input: {
                id:this.id.value, 
                firstname: this.firstname.value, 
                lastname: this.lastname.value
            }
        }
    }).then(data => {
        console.log(data);
    }).catch(err => {
        console.error("Error: ", JSON.stringify(err, null, 2));
    })
    this.handleClose();
  }

  render() {
    return (
      <div>
        <Mutation mutation={ADD_EMP}>
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
                      inputRef={el => this.firstname = el}                      
                      label="First Name"
                      fullWidth
                    />
                    <TextField
                      margin="dense"
                      id="lastname"
                      inputRef={el => this.lastname = el}                      
                      label="Last Name"
                      fullWidth
                    />
                    <TextField
                      margin="dense"
                      id="ID"
                      inputRef={el => this.id = el}
                      label="ID"
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.handleSubmit.bind(this,addEmp)}
                    color="primary">
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

export default EmpAdd;
