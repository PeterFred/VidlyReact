import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {}
  };

  validate = () => {
    const errors = {};
    const { account } = this.state;
    if (account.username.trim() === "")
      errors.username = "Username is required";
    if (account.password.trim() === "")
      errors.password = "Password is required";
    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} }); //Makes sure an object is not set to null
    if (errors) return;
    //call the server
    console.log("Submitted");
    //const username = this.username.current.value;
  };

  validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "Username is required";
    }
    if (name === "password") {
      if (value.trim() === "") return "Password is required";
    }
  };

  /**
   Copy the state, capture input(with currentTarget) then set state
   */
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {/* Below comment out when 'name' props is resolved */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              value={account.username}
              onChange={this.handleChange}
              id="username"
              type="text"
              className="form-control"
              //   error={errors.username}
            />
            {errors.username && (
              <div className="alert alert-danger">{errors.username}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              value={account.password}
              onChange={this.handleChange}
              id="password"
              type="text"
              className="form-control"
              error={errors}
            />
            {errors.password && (
              <div className="alert alert-danger">{errors.password}</div>
            )}
          </div>
          {/* Above comment out when 'name' props is resolved, and uncomment below */}

          {/* <Input
            //name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            // name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.passwrod}
          /> */}
          {/* {errors && <div className="alert alert-danger">{errors}</div>} */}
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
