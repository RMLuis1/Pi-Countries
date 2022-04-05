import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";

//!CreateStore va a ser el que crea el store

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;
