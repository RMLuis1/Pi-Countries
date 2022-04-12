const { Router } = require("express");
const axios = require("axios");
const { Country, Activity, tablaInt } = require("../db");
const { Op, where } = require("sequelize");
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


const api = async () => {
  const arr = await axios.get("https://restcountries.com/v3/all");
  // https://restcountries.com/v3.1/all
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
      const db = await Country.findAll({ include: [Activity] });
      if (!db.length) {
        await Country.bulkCreate(
          apiCountries?.map((e) => {
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
      } 
      
      else {
        res.status(200).send(db);
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

      res.status(200).json(countriesID);
    }
  } catch (error) {
    console.log(error);
  }
});

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
  const activity = await Activity.findAll({
    include: [Country],
  });
  res.send(activity);
});



router.get("/activityByCountry", async (req, res) => {
  const activityByCountry = await tablaInt.findAll();
  res.send(activityByCountry);
});

// router.put("/activity/:id", async (req, res) => {

//   Activity.findByPk(req.params.id).then(function(acti){

// acti.update({
//   countries: req.body.acti
// }).then((acti)=>{
//   res.json(acti)
// })

//   })

// const activId = req.params.id;
// const { country } = req.body;
// // let activities = await Activity.findAll({
// //           where: { name: country }
// //       });

// //       newCountry.addType(activities);
// //       res.status(200).send("Country added")
// Activity.findByIdAndUpdate(activId, country, (err, activityUpdate) => {
//   if (err) {
//     res.statusMessage(400).send("No se Actualizo");
//   }
//   res.status(200).send("actividad actualizada");
// });
// });

// router.delete("/activity", (req, res) => {
//   const { id } = req.params;
//   const deleted = Activity.remove({
//     _id: id,
//   });

//   if (!deleted) {
//     return res.status(404).send({ error: "Mensaje de error" });
//   }

// if (!deleted.length) {
//   res.status(404).send({ error: "No existe la actividad indicado" });
// }
//   const activity = Activity.findByPk(id);
//   res.status(200).json("Actividad borrada wey");
// });

module.exports = router;
