import React, { Component } from "react";

class UserForm extends Component {
  constructor(props) {
    super(props);
    const { user } = props;
    this.state = {
      id: user?.id || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      department: user?.department || "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSave(this.state);
  }

  render() {
    const { firstName, lastName, email, department } = this.state;
    const { onCancel } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={this.handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={this.handleChange}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={this.handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="department"
          value={department}
          onChange={this.handleChange}
          placeholder="Department"
          required
        />
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    );
  }
}

export default UserForm;
