import {
  GET_ALL_ACTIVITY,
  GET_ALL_COUNTRIESID,
  GET_ALL_COUNTRY,
  FILTER_CONTINENTS,
  FILTER_ALFABETICAMENTE,
  GET_ALL_COUNTRIESNAME,
  FILTER_POPULATION,
  ADD_ACTIVITY,
  FILTER_ACTIVITY,
  GET_ALL_ACTIVITY_ID,
  ADD_COUTRYBYACTIVITY,
} from "../accion";

const initialState = {
  countries: [],
  countries2: [],
  country: [],
  activity: [],
  activit:[]
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
      const search = state.countries2;
      console.log("esto es search", search)
      console.log("Esto es el reducer",action.payload)
      const buscador =
        action.payload.length > 1
          ? search.filter((e) =>
              e.name.toLowerCase().includes(action.payload.toLowerCase())
            )
          : search;
          console.log("esto es buscador",buscador)
      return {
        ...state,
        countries: buscador,
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
    case GET_ALL_ACTIVITY_ID:
      return{
        ...state,
        activit: action.payload
      }

    case ADD_ACTIVITY:
      return {
        ...state,
      };
    case ADD_COUTRYBYACTIVITY:
      return {
        ...state,
        activity: action.payload,
      };

    case FILTER_ACTIVITY:
      const filterActivities = state.countries2;
      
      const activit =
        action.payload === "All"
          ?
          filterActivities
          
          : filterActivities.filter((e) => {
              return e.activities
                .map((e) => (e.name ? e.name : e))
                .includes(action.payload);
            });
      return {
        ...state,
        countries: activit,
      };

    case FILTER_ALFABETICAMENTE:
      if (action.payload === "ascendente") {
        return {
          ...state,
          countries: state.countries.sort((a, b) =>
            a.name.localeCompare(b.name)
          ),
        };
      } else if (action.payload === "descendente") {
        return {
          ...state,
          countries: state.countries.sort((a, b) =>
            b.name.localeCompare(a.name)
          ),
        };
      } else {
        return {
          ...state,
          countries: state.countries,
        };
      }

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
      if (action.payload === "ascendente") {

        let order= state.countries.sort(function (a, b) {
            if (a.population > b.population) {
              return 1;
            }
            if (b.population > a.population) {
              return -1;
            }

            return 0;
          })
        return {
          ...state,
          countries: order
        };
      } else if (action.payload === "descendente") {
        const descendent = state.countries.sort(function (a, b) {
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
          countries: descendent,
        };
      } else {
        return { ...state, countries: state.countries };
      }

    default:
      return state;
  }
}
