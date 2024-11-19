import React, { Component } from "react";
import UserForm from "./UserForm";
import UserTable from "./UserTable";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: null,
      isEditing: false,
    };

    this.startEditing = this.startEditing.bind(this);
    this.stopEditing = this.stopEditing.bind(this);
  }

  startEditing(user) {
    this.setState({ selectedUser: user, isEditing: true });
  }

  stopEditing() {
    this.setState({ selectedUser: null, isEditing: false });
  }

  render() {
    const { users, onAddUser, onEditUser, onDeleteUser } = this.props;
    const { selectedUser, isEditing } = this.state;

    return (
      <div>
        {isEditing ? (
          <UserForm
            user={selectedUser}
            onSave={(user) => {
              if (selectedUser) {
                onEditUser(user);
              } else {
                onAddUser(user);
              }
              this.stopEditing();
            }}
            onCancel={this.stopEditing}
          />
        ) : (
          <button onClick={() => this.startEditing(null)}>Add User</button>
        )}
        <UserTable
          users={users}
          onEdit={this.startEditing}
          onDelete={onDeleteUser}
        />
      </div>
    );
  }
}

export default UserList;
