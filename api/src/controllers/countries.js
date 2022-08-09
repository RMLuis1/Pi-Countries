const axios = require("axios");
const { Country, Activity, tablaInt } = require("../db");

//get all countries
const allCountries = async () => {
  try {
    const currentUrl = await axios.get("https://restcountries.com/v3/all");
    const db = await Country.findAll({ include: [Activity] });
    if (!db.length) {
      await Country.bulkCreate(
        currentUrl?.map((e) => {
          return {
            id: e.cca3,
            name: e.name.common,
            flags: e.flags[1],
            continents: e.continents[0],
            capital: e.capital ? e.capital[0] : "No hay capital",
            subregion: e.subregion ? e.subregion : "No hay Subregion",
            area: e.area,
            population: e.population,
            languages: e.languages && Object.values(e.languages),
          };
        })
      );

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
