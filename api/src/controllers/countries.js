const axios = require("axios");
const { Country, Activity, tablaInt } = require("../db");

//get all countries
const allCountries = async () => {
  try {
    const currentUrl = await axios.get("https://restcountries.com/v3.1/all");
    const db = await Country.findAll({ include: [Activity] });
    if (db.length === 0) {
      console.log("ENTRO AQUI?");

      await Country.bulkCreate(
        currentUrl.data.map((e) => {
          return {
            id: e.cca3 ? e.cca3 : e.cioc,
            name: e.name.common ? e.name.common : e.name.official,
            flags: e.flags ? e.flags.png : e.flags.svg,
            continents: e.continents[0] ? e.continents[0] : "unidentified",
            capital: e.capital ? e.capital[0] : "does not have capital",
            subregion: e.subregion
              ? e.subregion
              : "It does not have a subRegion",
            area: e.area,
            population: e.population,
            languages: e.languages && Object.values(e.languages),
            maps: e.maps ? e.maps.googleMaps : e.maps.openStreetMaps,
          };
        })
      );
      // }
      const altCountry = await Country.findAll();

      return altCountry;
    } else {
      return db;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  allCountries,
};
