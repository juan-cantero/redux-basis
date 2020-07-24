// @ts-nocheck
const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

const initialState = {
  loading: false,
  users: [],
  error: '',
};

//actions

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUsersFailure = (error) => {
  return {
    type: fetchUsersFailure,
    payload: error,
  };
};

const fetchUser = () => (dispatch) => {
  dispatch(fetchUsersRequest);

  axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      const userNames = response.data.map((user) => user.name);
      dispatch(fetchUsersSuccess(userNames));
    })
    .catch((error) => dispatch(fetchUsersFailure(error)));
};

//reducer

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_USERS_SUCCESS:
      return { ...state, users: action.payload, loading: false };
    case FETCH_USERS_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

//store

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => console.log(store.getState()));

store.dispatch(fetchUser());
