import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addActivity, getCountry } from "../redux/accion";
import styles from "./addActivity.module.css";

export function CreateActivity() {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activity);
  const allCountry = useSelector((state) => state.countries);

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    country: [],
  });

  const [inputError, setInputError] = useState({});

  //!    SEASON
  function handleSelectSeason(e) {
    setInput({
      ...input,
      season: e.target.value,
    });
  }

  //!   DURATION
  function handleSelectDuration(e) {
    setInput({
      ...input,
      duration: e.target.value,
    });
  }
  //!  SELECT COUNTRY
  function handleCountry(e) {
    setInput({
      ...input,
      country: [...input.country, e.target.value],
    });
  }
  //!  DELETE
  function handleDelet(e) {
    setInput({
      ...input,
      activity: activities.filter((act) => act !== e),
    });
  }
  //!va manejando los cambios del input(los guarda)
  function handleChange(e) {
    setInput(() => {
      const newInput = {
        ...input,
        [e.target.name]: e.target.value,
      };
      const errors = validate(newInput);
      setInputError(errors);
      return newInput;
    });
    console.log(input);
  }
  //TODO: ESPERO QE FUNCIONE !!!!

  //  function agregar(e){
  //    setInput({
  //      ...input,
  //      country: [].push(e.target.value )
  //     } )
  //  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!input.name || !input.duration || !input.difficulty || !input.season) {
      return alert("Todos los campos son obligatorios");
    } else {
      dispatch(addActivity(input));
      alert("Activity successfully created!");
      setInput({
        ...input,
        [e.target.name]: "",
      });
    }
  }
  useEffect(() => {
    dispatch(getCountry());
  }, [dispatch]);
  useEffect(() => {
    dispatch(addActivity(input));
  }, [dispatch]);

  function validate(input) {
    let error = {};

    if (!input.name) {
      error.name = " Name is required";
    } else if (!/^[A-Z]+$/i.test(input.name)) {
      error.name = " Name is invalid";
    }
    if (!input.difficulty) {
      error.difficulty = "Difficulty is required";
    } else if (input.difficulty < 1 || input.difficulty > 5) {
      error.difficulty = "Difficulty is number 1 - 5";
    }

    // if (!input.country) {
    //   error.country = "Country is required";
    // } else if (!/^[A-Z]+$/i.test(input.country)) {
    //   error.country = "Country is invalid";
    // }

    return error;
  }

  const estaciones = [
    { name: "summer" },
    { name: "fall" },
    { name: "winter" },
    { name: "spring" },
  ];

  const duracion = [
    { duractio: "1 hora" },
    { duractio: "2 hora" },
    { duractio: "3 hora" },

    { duractio: "4 hora" },
    { duractio: "Tiempo indeterminado" },
  ];

  return (
    <div>
      <Link to="/home">
        <button>volver</button>
      </Link>

      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name </label>
            <input
              className={inputError.name && styles.inputdanger}
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => {
                handleChange(e);
              }}
            ></input>
            {inputError.name && (
              <p className={styles.danger}>{inputError.name}</p>
            )}
          </div>{" "}
          <div>
            <label>Difficulty</label>
            <input
              className={inputError.difficulty && styles.inputdanger}
              type="number"
              value={input.difficulty}
              name="difficulty"
              min="1"
              max="5"
              onChange={(e) => handleChange(e)}
            ></input>
            {inputError.difficulty && (
              <p className={styles.danger}>{inputError.difficulty}</p>
            )}
          </div>{" "}
          <div>
            <label>Duration</label>
            <select onClick={(e) => handleSelectDuration(e)}>
              {duracion.map((e) => {
                return (
                  <option
                    key={e.duractio}
                    onClick={(e) => handleChange(e)}
                    value={e.duractio}
                  >
                    {" "}
                    {e.duractio}
                  </option>
                );
              })}
            </select>
          </div>{" "}
          <div>
            <label>Season</label>
            <select onClick={(e) => handleSelectSeason(e)}>
              {estaciones.map((e) => {
                return (
                  <option
                    key={e.name}
                    onClick={(e) => handleChange(e)}
                    value={e.name}
                  >
                    {e.name}
                  </option>
                );
              })}
            </select>
          </div>{" "}
          <div>
            <label>Country</label>

            <select onChange={(e) => handleCountry(e)}>
              {allCountry?.map((e) => {
                return (
                  <option
                    // onClick={(e) => handleChange(e)}
                    value={e.name}
                    key={e.id}
                    multiple="multiple"
                  >
                    {" "}
                    {e.name}{" "}
                  </option>
                );
              })}
            </select>
            <ul>
              <li>{input.country.map((e) => e + " ,")} </li>{" "}
            </ul>
          </div>
          <button type="submit">Crete Activity</button>
        </form>
      </div>
      {/* {activities.map((e) => (
        <div>
          <p>{e}</p>
          <button onClick={() => handleDelet(e)}>X</button>
        </div> */}
      {/* ))} */}
    </div>
  );
}

/* <form>
      <label>Imagen</label>
      <input type="img" value={input.imagen} onChange={handleChange}/>
    </form> */

//!VER VALIDACION DE ACTIVIDADES!
//Validar que la actividad no exista ya
// const existentActivity = activities.find(
//   (a) => a.name === addActivity.name
// );
// if (existentActivity) {
//   return MySwal.fire({
//     title: `La actividad ya existe`,
//     icon: "warning",
//     confirmButtonText: "OK",
//     backdrop: `
//     rgba(0,0,123,0.4)
//     left top
//     no-repeat
//   `,
//   });
// }
//Todo: SEASON
//! con varias opciones
{
  /* <option onClick={(e) => handleChange(e)} value="default">
                Moment of the year
              </option>
              <option onClick={(e) => handleChange(e)} value="summer">
                Sumer
              </option>
              <option onClick={(e) => handleChange(e)} value="winter">
                Winter
              </option>
              <option onClick={(e) => handleChange(e)} value="fall">
                Fall
              </option>
              <option onClick={(e) => handleChange(e)} value="spring">
                Spring
              </option> */
}

//!DURATION
//TODO: con opciones
{
  /* <option onClick={(e) => handleChange(e)} value="1 Hours">
                1 Hours
              </option>
              <option onClick={(e) => handleChange(e)} value="2 Hours">
                2 Hours
              </option>
              <option onClick={(e) => handleChange(e)} value="3 Hours">
                3 Hours
              </option>
              <option onClick={(e) => handleChange(e)} value="4 Hours +">
                4 Hours +
              </option> */
}

//!COUNTRY
//TODO: CON INPUT
{
  /* <input
              className={inputError.country && styles.inputdanger}
              type="text"
              value={input.country}
              name="country"
              onChange={(e) => handleChange(e)}
            ></input>
            {inputError.country && (
              <p className={styles.danger}>{inputError.country}</p>
            )} */
}
{
  /* {allCountry?.map((e) => {
              return (
                <input type="checkbox" name="country" value={e.name} onChange={e=> e.handleChange(e)}/>, e.name
              
              );
            })} */
}
{
  /* onChange={(e) => handleChange(e)} */
}
{
  /* onClick={(e) => handleCountry(e) */
}
