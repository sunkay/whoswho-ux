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

class EmpEdit extends React.Component {
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
    this.firstname = "";
    this.lastname = "";
    this.id = "";
  }

  componentWillReceiveProps() {
    this.setState({ open: true });
  }

  handleCancel = () => {
    this.handleClose();
    this.props.history.push("/employees");
  };


  render() {
    const { match } = this.props;
    var id = match.params.id;
    return (
      <Query query={GET_EMP} variables={{ id }}>
        {({ loading, error, data }) => {
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
                    id="firstname"
                    value={data.employee.firstname}
                    inputRef={el => (this.firstname = el)}
                    label="First Name"
                    fullWidth
                  />
                  <TextField
                    margin="dense"
                    id="lastname"
                    value={data.employee.lastname}
                    inputRef={el => (this.lastname = el)}
                    label="Last Name"
                    fullWidth
                  />
                  <TextField
                    margin="dense"
                    id="ID"
                    value={data.employee.id}
                    inputRef={el => (this.id = el)}
                    label="ID"
                    fullWidth
                  />
                </DialogContent>

                <DialogActions>
                  <Button onClick={this.handleCancel} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(EmpEdit);
