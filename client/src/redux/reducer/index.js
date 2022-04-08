import {
  GET_ALL_ACTIVITY,
  GET_ALL_COUNTRIESID,
  GET_ALL_COUNTRY,
  FILTER_CONTINENTS,
  FILTER_ALFABETICAMENTE,
  GET_ALL_COUNTRIESNAME,
  FILTER_POPULATION,
  ADD_ACTIVITY,
} from "../accion";

const initialState = {
  countries: [],
  countries2: [],
  country: [],
  activity: [],
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COUNTRY:
      return {
        ...state,
        countries: action.payload,
        countries2: action.payload,
      };
    case GET_ALL_COUNTRIESNAME:
      return {
        ...state,
        countries: action.payload,
      };
    case GET_ALL_COUNTRIESID:
      return {
        ...state,
        country: action.payload,
      };
    case GET_ALL_ACTIVITY:
      return {
        ...state,
        activity: action.payload,
      };
    case ADD_ACTIVITY:
      return {
        ...state,
      };

    case FILTER_ALFABETICAMENTE:
      let soredArr =
        action.payload === "ascendente"
          ? state.countries.sort((a, b) => a.name.localeCompare(b.name))
          : state.countries.sort((a, b) => b.name.localeCompare(a.name));
      // action.payload === "ascendente"?
      //    state.countries.sort(function (a, b) {
      //       if (a.name > b.name) {
      //         return 1;
      //       }
      //       if (b.name > a.name) {
      //         return -1;
      //       }

      //       return 0;
      //     })
      //   : state.countries.sort(function (a, b) {
      //       if (a.name > b.name) {
      //         return -1;
      //       }
      //       if (b.name > a.name) {
      //         return 1;
      //       }
      //       return 0;
      //     });
      return {
        ...state,
        countries: soredArr,
      };
    case FILTER_CONTINENTS:
      const allCountry = state.countries2;
      const continentsFilter =
        action.payload === "All"
          ? allCountry
          : allCountry.filter((e) => e.continents === action.payload);
      return {
        ...state,
        countries: continentsFilter,
      };
    case FILTER_POPULATION:
      let sortPopulation =
        action.payload === "ascendente"
          ? state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return 1;
              }
              if (b.population > a.population) {
                return -1;
              }

              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return -1;
              }
              if (b.population > a.population) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        countries: sortPopulation,
      };

    default:
      return state;
  }
}
