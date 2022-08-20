const { Router } = require("express");
const axios = require("axios");
const { Country, Activity, tablaInt } = require("../db");
const { Op } = require("sequelize");
const { allCountries } = require("../controllers/countries");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.post("/", async (req, res) => {
  const { name, difficulty, duration, season, image, countrys } = req.body;

  try {
    const activity = await Activity.create({
      name: name,
      difficulty: difficulty,
      duration: duration,
      season: season,
      imagen: image
        ? image
        : "https://media.istockphoto.com/vectors/friends-icons-vector-id1201095860?k=20&m=1201095860&s=170667a&w=0&h=f4gzE_NsKhSCKcO-iBSQ8xcTHfTEpcJ_tngCjvvld4w=",
    });
    console.log("esto es countries", countrys);
    const ActivityCountry = await Country.findAll({
      where: {
        name: countrys,
      },
    });

    activity.addCountry(ActivityCountry);
    console.log(activity);
    res.status(200).send("Actividad creada exitosamente");
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  const activity = await Activity.findAll({
    include: [Country],
  });
  res.send(activity);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Activity.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).send("Activity deleted");
  } catch (error) {
    console.log(error);
  }
});

router.get("/activityByCountry", async (req, res) => {
  const activityByCountry = await tablaInt.findAll();
  res.send(activityByCountry);
});

module.exports = router;
