import axios from "axios";

export const GET_ALL_COUNTRY = "GET_ALL_COUNTRY";
export const GET_ALL_COUNTRIESID = "GET_ALL_COUNTRIESID";
export const GET_ALL_ACTIVITY = "GET_ALL_ACTIVITY";
export const ADD_ACTIVITY = "ADD_ACTIVITY";
export const FILTER_ALFABETICAMENTE = "FILTER_ALFABETICAMENTE";
export const FILTER_CONTINENTS = "FILTER_CONTINENTS";
export const GET_ALL_COUNTRIESNAME = "GET_ALL_COUNTRIESNAME";
export const FILTER_POPULATION = "FILTER_POPULATION";
export const FILTER_ACTIVITY = "FILTER_ACTIVITY";
export const ADD_COUTRYBYACTIVITY = "ADD_COUTRYBYACTIVITY";




export const getCountry = () => {
  return (dispatch) => {
     axios.get(`http://localhost:3001/countries`).then((result) => {
      return dispatch({
        type: GET_ALL_COUNTRY,
        payload: result.data,
        
      });
    });
  };
};
export function getCountriesID(id) {
  return async function (dispatch) {
    return await axios
      .get(`http://localhost:3001/countries/${id}`)
      .then((result) => {
        return dispatch({
          type: GET_ALL_COUNTRIESID,
          payload: result.data,
        });
      });
  };
}



export const getActivity = () => {
  return (dispatch) => {
    axios.get("http://localhost:3001/activity").then((result) => {
      return dispatch({
        type: GET_ALL_ACTIVITY,
        payload: result.data,
      });
    });
  };
};
export function addActivity(activity) {
  return async function (dispatch) {
    return await axios
      .post("http://localhost:3001/activity" , activity)
      .then((result) => {
        dispatch({
          type: ADD_ACTIVITY,
          payload: result.data,
        });
      });
  };
}


export function filterCountryByAfabeticamente(payload) {
  return {
    type: "FILTER_ALFABETICAMENTE",
    payload,
  };
}
export function filterCountryByContinents(payload) {
  return {
    type: "FILTER_CONTINENTS",
    payload,
  };
}
export function filterCountryByPopulation(payload) {
  return {
    type: "FILTER_POPULATION",
    payload,
  };
}
export function filterActivity(payload){
  return{
    type:"FILTER_ACTIVITY",
    payload
  }
}

export function AddCountryByActivity(payload){
  return {
    type: "ADD_COUTRYBYACTIVITY",
    payload
  };
}

export function getSearch(payload){
  return {
    type: GET_ALL_COUNTRIESNAME,
    payload
  }
}

