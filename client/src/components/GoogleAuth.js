import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from './../actions';

class GoogleAuth extends React.Component {
  // state = { isSignedIn: null }

  componentDidMount(){
    // load additional library and pass a callback function as second arg that is called after this addtional module is loaded up
    window.gapi.load('client:auth2', () => {
      // async request to google to initialize out client(it returns us a promise)
      // so we use .then()
      window.gapi.client.init({
        clientId: '867139672249-vhtl7g75hjurbrgr5rv0qbvg5koginio.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        // this.auth instance can be used to sign the user in or get the users current authentcation status
        this.auth = window.gapi.auth2.getAuthInstance();
        // we want to find out if the user is signed in and print our the authentication status on the screen
        // but when this componentDidMount() gets called, the component has already been rendered to the screen
        // now if we want to update what content this component shows, we need to somehow get the component to rerender
        // So we make use of component level state here

        // After we initialize our library and get access to the auth object
        // we update the component level state of whether or not the user is currently signed in
        // this will cause the component to rerender and we can print the authentication status on the screen

        // right now we are calling setState()
        // this.setState({ isSignedIn: this.auth.isSignedIn.get() })

        // with Redux
        // we should call props.signIn() or props.signOut() actions depending on if user is signed in
        // dispatch an initial action when we finish initiating our libraray to indicate if the user is signed in
        // reuse onAuthChnage() with this.auth.isSignedIn.get()
        // this code runs at inititalization, when the library first boots up
        this.onAuthChange(this.auth.isSignedIn.get()); // isSignedIn.get() gives true/false

        // wait for authentication status to change at some time in future
        this.auth.isSignedIn.listen(this.onAuthChange); // isSignedIn.listen() , if we pass a callback function to listen(), it will be invoked anytime users authentication status is chnaged
      })
    })
  }
  // Arrow functions because these are callback functions
  // called anytime the users authentication status changes according to GAPI
  // onAuthChange = () => {
  onAuthChange = (isSignedIn) => { // when called from inside .listen(), it gets called with Boolean true/false (so recieve as an argument)
    // getting the value of isSignedIn from this.auth.isSignedIn.get()
    // this.setState({ isSignedIn: this.auth.isSignedIn.get() }); // not required to reach to auth instance

    if(isSignedIn){
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  }
  onSignInClick = () => {
    this.auth.signIn();
  }
  onSignOutClick = () => {
    this.auth.signOut();
  }
  renderAuthbutton(){
    // if(this.state.isSignedIn === null){
    if(this.props.isSignedIn === null){
      // return <div>I dont know if we are signed in</div>
      return null;
    // } else if(this.state.isSignedIn){
    } else if(this.props.isSignedIn){
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon"></i>
            Sign Out
        </button>
      )
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon"></i>
          Sign In with Google
        </button>
        )
    }
  }

  render(){
    return (
      <div>
        {this.renderAuthbutton()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn }
}

// export default connect(null, { signIn, signOut })(GoogleAuth);
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);

// Auth Component
// - Get a reference to the 'auth' object after it is initialized
// - Figure out if the user is currently signed in
// - Print their authentication status on the screen