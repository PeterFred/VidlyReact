import React, { Component } from "react";
import Joi from "joi-browser";
// import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    console.log(errors.password);
    return errors;
  };

  //Cannot pass this.state or this.schema as we are not validating the whole form,
  //and therefore should only pass required props
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value }; //[name] is set dynamically at runtime using ES6 computer properties
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} }); //Makes sure an object is not set to null
    if (errors) return;
    this.doSubmit();
  };

  /**
   Copy the state, capture input(with currentTarget) then set state
   */
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }
  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          name={name}
          value={data[name]}
          onChange={this.handleChange}
          id={name}
          type={type}
          className="form-control"
          error={errors[name]}
        />
        {errors[name] && (
          <div className="alert alert-danger">{errors[name]}</div>
        )}
      </div>

      //   <Input
      //     name={name}
      //     value={data[name]}
      //     label={label}
      //     onChange={this.handleChange}
      //     error={errors[name]}
      //   />
    );
  }
}

export default Form;
