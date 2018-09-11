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
        firstname: "",
        lastname: "",
        id: "",
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

  handleSubmit = (e) => {
      e.preventDefault();
      console.log(this.state);
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
                    name="firstname"
                    value={this.state.firstname}
                    onChange={this.handleInputChange}
                    label="First Name"
                    fullWidth
                  />
                  <TextField
                    margin="dense"
                    name="lastname"
                    value={this.state.lastname}
                    onChange={this.handleInputChange}
                    label="Last Name"
                    fullWidth
                  />
                  <TextField
                    margin="dense"
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
                    onClick={this.handleSubmit.bind(this)}
                    color="primary"
                  >
                    Submit
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
