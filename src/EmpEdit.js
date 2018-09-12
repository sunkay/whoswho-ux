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
      id: ""
    });
  }

  componentWillReceiveProps() {
    this.setState({ open: true });
  }

  handleInputChange = evt => {
    const target = evt.target;
    switch(target.name){
      case "id":
        this.data.employee.id = target.value;
        break;
      case "firstname":
        this.data.employee.firstname = target.value;
        break;
      case "lastname":
        this.data.employee.lastname = target.value;
        break;
      default:
        break;
    }
  };

  handleSubmit = (updateEmp, e) => {
    e.preventDefault();
    console.log(this.state);
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

  handleQueryCompleted = (data) => {
    console.log("in querycompleted", data);
    if(!data.employee) return;
    this.setState({
      firstname: data.employee.firstname,
      lastname: data.employee.lastname,
      id: data.employee.id
    });
    
  };

  render() {
    const { match } = this.props;
    var id = match.params.id;
    return (
      <Query
        query={GET_EMP}
        variables={{ id }}
      >
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error :( {console.log(error)}</div>;
          this.data = data;
          console.log("data:", data);
          return (
            <Mutation mutation={UPDATE_EMP} update={this.handleUpdate}>
              {(updateEmp, { loading, error }) => {
                {loading && <p>Loading...</p>}
                {error && <p>Error :( Please try again</p>}
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
                          value={this.data.employee.firstname}
                          onChange={this.handleInputChange}
                          label="First Name"
                          fullWidth
                        />
                        <TextField
                          margin="dense"
                          name="lastname"
                          value={this.data.employee.lastname}
                          onChange={this.handleInputChange}
                          label="Last Name"
                          fullWidth
                        />
                        <TextField
                          margin="dense"
                          name="id"
                          value={this.data.employee.id}
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
