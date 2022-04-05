const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define(
    "activity",
    {
      // id: {
      //   type: DataTypes.UUID,
      //   defaultValue: DataTypes.UUIDV4,
      //   allowNull: false,
      //   primaryKey: true,
      // },
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
    },
    { timestamp: false }
  );
};
