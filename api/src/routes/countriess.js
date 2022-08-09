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

router.get("/", async (req, res) => {
  const countriesTotal = await allCountries();
  return res.status(200).send(countriesTotal);
});

router.get("/:id", async (req, res) => {
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

module.exports = router;
