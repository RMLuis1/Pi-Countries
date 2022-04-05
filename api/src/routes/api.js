// const { Country } = require("../db");

// module.exports = async function API() {
//     const res = await fetch("https://restcountries.com/v3/all");
//     await res.json();
//     const db = res.map((e) => {
//         const db_api = {
//             name: e.name,
//             flag: e.flag,
//             Continent: e.Continent,
//             Capital: e.Capital,
//             Subregion: e.Subregion,
//             Area: e.Area,
//             Population: e.Population,
//         };
//         Country.findOrCreate({
//             where: {
//                 id: e.cca3,
//             },
//             default: db_api,
//         });
//         console.log("Es la DB: " + db_api);
//         return db_api;
//     });
//     return db;
// }
