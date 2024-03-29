const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define(
    "activity",
    {
      
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: (value) => {
          if (value === null || value > 5) {
            throw new Error("Difficulty cannot be zero or greater than 5");
          }
        },
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      season: {
        type: DataTypes.ENUM("spring", "fall", "summer", "winter"),
        allowNull: false,
      },
      imagen:{
        type: DataTypes.TEXT,
        allowNull: false,
      }
    },
    { timestamp: false }
  );
};
