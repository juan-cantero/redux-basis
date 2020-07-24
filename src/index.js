const redux = require('redux');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

const BUY_CAKE = 'buyCake';
const BUY_ICECREAM = 'buyIcecream';

const buyCake = () => {
  return {
    type: BUY_CAKE,
  };
};

const buyIcecream = () => {
  return {
    type: BUY_ICECREAM,
  };
};

const initialCakeState = {
  cakes: 10,
};

const initialIceCreamState = {
  iceCreams: 20,
};

const buyCakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return { ...state, cakes: state.cakes - 1 };
    default:
      return state;
  }
};

const buyIcecreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return { ...state, iceCreams: state.iceCreams - 1 };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  iceCream: buyIcecreamReducer,
  cake: buyCakeReducer,
});
const store = createStore(rootReducer);

store.dispatch(buyCake());
store.dispatch(buyIcecream());

console.log(store.getState());
