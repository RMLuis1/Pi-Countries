const { Router } = require("express");
const countrie= require('./countriess')
const activity= require('./activities')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/countries', countrie);
router.use('/activity', activity);



module.exports = router;
