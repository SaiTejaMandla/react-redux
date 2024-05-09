import { combineReducers, createStore, applyMiddleware } from "redux";
import customerReducer from "./features/customers/customersSlice";
import accountReducer from "./features/accounts/accountsSlice";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
