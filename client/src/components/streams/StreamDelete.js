import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from './../Modal';
import history from './../../history';
import { fetchStream, deleteStream } from './../../actions'

class StreamDelete extends React.Component {
  componentDidMount(){
    console.log(this.props)
    this.props.fetchStream(this.props.match.params.id);
  }
  // const actions = (
  //   <React.Fragment>
  //     <button className="ui button negative">Delete</button>
  //     <button className="ui button">Cancel</button>
  //   </React.Fragment>
  // )
  renderActions(){
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <button onClick={() => this.props.deleteStream(id)} className="ui button negative">Delete</button>
        {/* <button className="ui button">Cancel</button> */}
        <Link to="/" className="ui button">Cancel</Link>
      </React.Fragment>
    )
  }
  renderContent(){
    if(!this.props.stream){
      return 'Are you sure you want to delete this stream ?'
    }
    return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`
  }
  render(){
    // if(!this.props.stream){
    //   return <div>Loading...</div>
    // }
    return (
        <Modal 
          title="Delete Stream"
          // content="Are you sure you want to delete this stream ?"
          content={this.renderContent()}
          // actions={actions}
          actions={this.renderActions()}
          onDismiss={() => history.push('/')}
        />
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}
// export default connect(null, { fetchStream })(StreamDelete);
export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);