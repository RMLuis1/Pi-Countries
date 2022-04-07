import axios from "axios";

export const GET_ALL_COUNTRY = "GET_ALL_COUNTRY";
export const GET_ALL_COUNTRIESID = "GET_ALL_COUNTRIESID";
export const GET_ALL_ACTIVITY = "GET_ALL_ACTIVITY";
export const ADD_ACTIVITY = "ADD_ACTIVITY";
export const FILTER_ALFABETICAMENTE = "FILTER_ALFABETICAMENTE";
export const FILTER_CONTINENTS = "FILTER_CONTINENTS";
export const GET_ALL_COUNTRIESNAME = "GET_ALL_COUNTRIESNAME";
export const FILTER_POPULATION = "FILTER_POPULATION";

export const getCountry = () => {
  return (dispatch) => {
    //es una funcion que dispacha la accion
    axios.get(`http://localhost:3001/countries`).then((result) => {
      return dispatch({
        type: GET_ALL_COUNTRY,
        payload: result.data,
        //el payload(nombre por convencion) son los datos que le pasamos al reducer
        //las acciones nunca tienen logica, solo agarran algo y lo pasan
        //"esta la respuesta del pedido, tiene el resultado de la accion"
        //!LAS ACCIONES PUEDEN TENER LOGICA, PERO NO DEBEN TENER
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
export function getSearch(name) {
  return async function (dispatch) {
    return await axios
      .get(`http://localhost:3001/countries?name=${name}`)
      .then((result) => {
        return dispatch({
          type: GET_ALL_COUNTRIESNAME,
          payload: result.data,
        });
      })
      .catch(function (error) {
        alert("El pais que buscas no existe"); 
        console.log( error.name + "El pais que busca no existe:" + error.message);
      });
  };
}
