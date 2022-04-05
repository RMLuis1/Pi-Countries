const { Router } = require("express");
const axios = require("axios");
const { Country, Activity, tablaInt } = require("../db");
const { Op } = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//todo: •	En una primera instancia deberán traer todos los
//todo:     países desde restcountries y guardarlos en su propia
//todo: base de datos y luego ya utilizarlos desde allí
//! (Debe almacenar solo los datos necesarios para la ruta principal)
//todo: •	Obtener un listado de los paises.
//  async function API() {
//    const res = await fetch("https://restcountries.com/v3/all");
//    await res.json();
//    const db = res.map((e) => {
//      const db_api = {
//        name: e.name,
//        flag: e.flag,
//        Continent: e.Continent,
//        Capital: e.Capital,
//        Subregion: e.Subregion,
//        Area: e.Area,
//        Population: e.Population,
//      };
//      Country.findOrCreate({
//        where: {
//          id: e.cca3,
//        },
//        default: db_api,
//      });
//      console.log("Es la DB: " + db_api);

const api = async () => {
  const arr = await axios.get("https://restcountries.com/v3/all");

  return arr.data;
};

router.get("/countries", async (req, res) => {
  const apiCountries = await api();
  const { name } = req.query;
  if (name) {
    try {
      const countriesName = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });
      if (countriesName.length === 0) {
        res.status(404).send("no existe el pais que buscas");
      } else {
        return res.json(countriesName);
      }
    } catch (error) {
      console.log(error);
    }
  } else if (name == 0) {
    res.status(404).send("debes ingresar el nombre de un Pais");
  } else {
    try {
      const hay = await Country.findAll({ include: [Activity] });
      if (!hay.length) {
        await Country.bulkCreate(
          apiCountries.map((e) => {
            return {
              id: e.cca3,
              name: e.name.common,
              flags: e.flags[1],
              continents: e.continents[0],
              capital: e.capital ? e.capital[0] : "No hay capital",
              subregion: e.subregion ? e.subregion : "No hay Subregion",
              area: e.area,
              population: e.population,
            };
          })
        );
        const altCountry = await Country.findAll();
        if (altCountry.length) {
          res.status(200).send(altCountry);
        } else {
          res.status(404).send("No existen paises");
        }
      } else {
        res.status(200).send(hay);
      }
    } catch (error) {
      console.log("ERROR EN GET", error);
    }
  }
});

router.get("/countries/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (id.length !== 3) {
      res.status(404).send("ID incorrecto, debe contener 3 caracteres");
    }
    if (id) {
      const countriesID = await Country.findOne({
        where: {
          id: {
            [Op.iLike]: `%${id}%`,
          },
        },
        include: [Activity],
      });

      if (!countriesID) {
        res.status(404).send("no existe ...");
      }

      // const activityDb = await Activity.findAll({
      //   atributes: ["id", "name", "dificulty", "duraction", "season"],
      //   through: {
      //     atributes: [],
      //   },
      // });

      // const CountryId = [countriesID, ...activityDb];

      res.status(200).json(countriesID);
    }
  } catch (error) {
    console.log(error);
  }
});

// router.post("/activity", async (req, res) => {
//   const { name, difficulty, duration, season, country } = req.body;

//   const newActivity = await Activity.create({
//     name: name,
//     difficulty: difficulty,
//     duration: duration,
//     season: season,
//   });

//   const actCountry = Country.findAll({
//     where: {
//       name: country,
//     },
//   });
//   newActivity.addCountry(actCountry);
//   res.status(200).send("Actividad creada!");
// });

router.post("/activity", async (req, res) => {
  const { name, difficulty, duration, season, country } = req.body;
  try {
    const activity = await Activity.create({
      name: name,
      difficulty: difficulty,
      duration: duration,
      season: season,
    });

    const ActivityCountry = await Country.findAll({
      where: {
        name: country,
      },
    });

    activity.addCountry(ActivityCountry);

    res.status(200).send("Actividad creada exitosamente");
  } catch (error) {
    console.log("aqui esta el error wey", error);
  }
});

router.get("/activity", async (req, res) => {
  const activity = await Activity.findAll();
  res.send(activity);
});

router.get("/activityByCountry", async (req, res) => {
  const activityByCountry = await tablaInt.findAll();
  res.send(activityByCountry);
});

// [ ] GET /countries?name="...":
// •	Obtener los países que coincidan con el nombre pasado
//como query parameter (No necesariamente tiene que ser una matcheo exacto)
// •	Si no existe ningún país mostrar un mensaje adecuado
// [ ] POST /activity:
// •	Recibe los datos recolectados desde el formulario
// controlado de la ruta de creación de actividad turística por body
// •	Crea una actividad turística en la base de datos

module.exports = router;
