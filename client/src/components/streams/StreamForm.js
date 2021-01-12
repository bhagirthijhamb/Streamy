import React from 'react';
import { Field, reduxForm } from 'redux-form'

class StreamForm extends React.Component {
  // renderError(meta){
  renderError({ error, touched }){
    if(touched && error){
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      )
    }
  }
  // renderInput(formProps){
  renderInput = ({ input, label, meta }) => {
    // console.log(meta);
    // console.log(formProps);
    // return <input onChange={formProps.input.onChange} value={formProps.input.value} />
    // return <input {...formProps.input} />

    const  className = `field ${meta.error && meta.touched ? 'error': ''}`
    return (
      // <div className="field">
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {/* <div>{meta.error}</div> */}
        {this.renderError(meta)}
      </div>
    )
  }
  onSubmit = (formValues) => {
    // console.log(formValues);
    this.props.onSubmit(formValues);
  }
  render (){
    // console.log(this.props);
      return (
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
          <Field name="title" component={this.renderInput} label="Enter Title" />
          <Field name="description" component={this.renderInput} label="Enter Description" />
          <button className="ui button primary">Submit</button>
        </form>
    )
  }
}

const validate = (formValues) => {
  const errors = {};
  if(!formValues.title){
    errors.title = 'You must enter a title';
  }
  if(!formValues.description){
    errors.description = 'Your must enter a description';
  }
  return errors;
}

// export default connect()(reduxForm({
//   form: 'streamCreate',
//   validate: validate
// })(StreamCreate));

export default reduxForm({
  form: 'streamForm',
  validate: validate
})(StreamForm);
