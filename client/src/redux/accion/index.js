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
export const ACTIVITY_DELETED = "ACTIVITY_DELETED";
export const GET_ALL_ACTIVITY_ID = "GET_ALL_ACTIVITY_ID";

export const getCountry = () => {
  try {
    return async function (dispatch) {
      const result = await axios.get(`/countries`);
      return dispatch({
        type: GET_ALL_COUNTRY,
        payload: result.data,
      });
    };
  // eslint-disable-next-line no-unreachable
  } catch (error) {
    console.log(error);
  }
};
export function getCountriesID(id) {
  try {
    return async function (dispatch) {
      const result = await axios.get(`/countries/${id}`);
      return dispatch({
        type: GET_ALL_COUNTRIESID,
        payload: result.data,
      });
    };
  // eslint-disable-next-line no-unreachable
  } catch (erro) {
    console.log(erro);
  }
}

export const getActivity = () => {
  try {
    return async function (dispatch) {
      const result = await axios.get("/activity");
      return dispatch({
        type: GET_ALL_ACTIVITY,
        payload: result.data,
      });
    };
    // eslint-disable-next-line no-unreachable
  } catch (error) {
    console.log(error);
    return alert("not found");
  }
};
export function addActivity(activity) {
  try {
    return async function (dispatch) {
      const result = await axios.post(
        "/activity",
        activity
      );
      console.log("Esto es result", result);
      return dispatch({
        type: ADD_ACTIVITY,
        payload: result.data,
      });
    };
    // eslint-disable-next-line no-unreachable
  } catch (error) {
    console.log(error);
  }
}

export function getActivityID(id) {
  return async function (dispatch) {
    return await axios
      .get(`/activity/${id}`)
      .then((result) => {
        return dispatch({
          type: GET_ALL_ACTIVITY_ID,
          payload: result.data,
        });
      });
  };
}
export function activityDelet(id) {
  try {
    console.log("Esto es action id ", id);
    return async function (dispatch) {
      const result = await axios.delete(`/activity/${id}`);
      return dispatch({
        type: ACTIVITY_DELETED,
        payload: result.data,
      });
    };
  } catch (error) {
    // eslint-disable-next-line no-unreachable
    console.log(error);
  }
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
export function filterActivity(payload) {
  return {
    type: "FILTER_ACTIVITY",
    payload,
  };
}

export function AddCountryByActivity(payload) {
  return {
    type: "ADD_COUTRYBYACTIVITY",
    payload,
  };
}

export function getSearch(payload) {
  return {
    type: GET_ALL_COUNTRIESNAME,
    payload,
  };
}
