import React, { Component } from "react";
import axios from "axios";
import UserList from "./components/UserList";
import "./styles.css";

const API_BASE_URL = "http://localhost:5000/users";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      error: null,
    };

    this.fetchUsers = this.fetchUsers.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
    this.handleEditUser = this.handleEditUser.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    axios
      .get(API_BASE_URL)
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((error) => {
        this.setState({ error: "Failed to fetch users." });
      });
  }

  handleAddUser(newUser) {
    axios
      .post(API_BASE_URL, newUser)
      .then((response) => {
        const users = [...this.state.users, response.data];
        this.setState({ users });
      })
      .catch((error) => {
        this.setState({ error: "Failed to add user." });
      });
  }

  handleEditUser(updatedUser) {
    axios
      .put(`${API_BASE_URL}/${updatedUser.id}`, updatedUser)
      .then(() => {
        const users = this.state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
        this.setState({ users });
      })
      .catch((error) => {
        this.setState({ error: "Failed to edit user." });
      });
  }

  handleDeleteUser(userId) {
    axios
      .delete(`${API_BASE_URL}/${userId}`)
      .then(() => {
        const users = this.state.users.filter((user) => user.id !== userId);
        this.setState({ users });
      })
      .catch((error) => {
        this.setState({ error: "Failed to delete user." });
      });
  }

  render() {
    const { users, error } = this.state;

    return (
      <div className="app">
        <h1>User Management</h1>
        {error && <p className="error">{error}</p>}
        <UserList
          users={users}
          onAddUser={this.handleAddUser}
          onEditUser={this.handleEditUser}
          onDeleteUser={this.handleDeleteUser}
        />
      </div>
    );
  }
}

export default App;
