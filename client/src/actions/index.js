import streams from './../apis/streams';
import { SIGN_IN, SIGN_OUT, CREATE_STREAM, FETCH_STREAM,  FETCH_STREAMS, DELETE_STREAM, EDIT_STREAM } from './types';
import history from './../history';

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId
  }
}

export const signOut = () => {
  return {
    type: SIGN_OUT
  }
}

export const createStream = (formValues) => {
  return async (dispatch, getState) => {
    // when we return a function from a action creator, the returned function gets called automatically by redux-thunk with two arguments - dispatch, getState function
    // getState function allows us to reach out into the redux store and pull out some piece of information
    const { userId } = getState().auth;
    // const response = await streams.post('/streams', formValues);
    const response = await streams.post('/streams', { ... formValues, userId });
    dispatch({ type: CREATE_STREAM, payload: response.data });
    // Do some programmatic navigation to 
    // get the user back to the root route
    history.push('/');
  }
}
export const fetchStreams = () => async dispatch => {
  const response = await streams.get('/streams');
  dispatch({ type: FETCH_STREAMS, payload: response.data })
} 
export const fetchStream = (id) => async dispatch => {
  const response = await streams.get(`/streams/${id}`);
  dispatch({ type: FETCH_STREAM, payload: response.data })
}
export const editStream = (id, formValues) => async dispatch => {
  // Update ALL properties of a record - PUT
  // const response = await streams.put(`/streams/${id}`, formValues)
  // Update SOME properties of a record - PATCH
  const response = await streams.patch(`/streams/${id}`, formValues)
  dispatch ({ type: EDIT_STREAM, payload: response.data })
  history.push('/');
}
export const deleteStream = (id) => async dispatch => {
  await streams.delete(`/streams/${id}`);
  dispatch({ type: DELETE_STREAM, payload: id })
  history.push('/');
}
