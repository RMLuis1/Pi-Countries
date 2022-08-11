const { Router } = require("express");
const axios = require("axios");
const { Country, Activity, tablaInt } = require("../db");
const { Op, where } = require("sequelize");
const { allCountries } = require("../controllers/countries");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.post("/", async (req, res) => {
  const { name, difficulty, duration, season, country,imagen } = req.body;

  try {
    const activity = await Activity.create({
      name: name,
      difficulty: difficulty,
      duration: duration,
      season: season,
      imagen:imagen,
    });

    const ActivityCountry = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${country}%`,
        },
      },
    });

    activity.addCountry(ActivityCountry);

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

router.get("/activityByCountry", async (req, res) => {
  const activityByCountry = await tablaInt.findAll();
  res.send(activityByCountry);
});

module.exports = router;
