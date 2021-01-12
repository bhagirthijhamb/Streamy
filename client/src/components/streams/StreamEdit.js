import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchStream, editStream } from './../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
  // console.log(props)
  componentDidMount(){
    this.props.fetchStream(this.props.match.params.id);
  }
  onSubmit = (formValues) => {
    // console.log(formValues);
    this.props.editStream(this.props.match.params.id, formValues);
  }
  render (){
    console.log(this.props)
    if(!this.props.stream){
      return <div>Loading...</div>
    }
    return (
      <div>
        <h3>Edit a Stream</h3>
        {/* <StreamForm initialValues={{ title: 'edit me', description: 'Chnage me too'}} onSubmit={this.onSubmit} /> */}
        {/* stream is an object with title and description property */}
        {/* <StreamForm initialValues={this.props.stream} onSubmit={this.onSubmit} /> */}
        <StreamForm 
          // initialValues={{ title: this.props.stream.title, description: this.props.stream.description }} 
          initialValues={_.pick(this.props.stream, 'title', 'description')}
          onSubmit={this.onSubmit} 
        />
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps);
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps,  
  { fetchStream, editStream })(StreamEdit);