import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addActivity, getCountry } from "../redux/accion";
import styles from "./addActivity.module.css";

export function CreateActivity() {
  const dispatch = useDispatch();
  // const activities = useSelector((state) => state.activity);
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

  function handleSubmit(e) {
    e.preventDefault();

    if (!input.name || !input.duration || !input.difficulty || !input.season) {
      return alert("Todos los campos son obligatorios");
    } else {
      dispatch(addActivity(input));
      alert("Activity successfully created!");
      setInput({
        ...input,
        name: "",
        season: "",
        difficulty: "",
        duration: "",
        country: [],
      });
    }
  }
  useEffect(() => {
    dispatch(getCountry());
  }, [dispatch]);
  useEffect(() => {
    dispatch(addActivity(input));
  }, [input,dispatch]);

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
    <div className={styles.divM}>
      <Link to="/home">
        <button className={styles.volver}>Go back</button>
      </Link>
      <br />
      <h1 className={styles.h1t}>Create Activity</h1>
      <div className={styles.div2}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name </label>
            <input
              className={
                (inputError.name && styles.inputdanger) || styles.input
              }
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
              className={
                (inputError.difficulty && styles.inputdanger) || styles.input
              }
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
            <select
              className={styles.input}
              onClick={(e) => handleSelectDuration(e)}
            >
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
            <select
              className={styles.input}
              onClick={(e) => handleSelectSeason(e)}
            >
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

            <select className={styles.input} onChange={(e) => handleCountry(e)}>
              {allCountry?.map((e) => {
                return (
                  <option value={e.name} key={e.id} multiple="multiple">
                    {" "}
                    {e.name}{" "}
                  </option>
                );
              })}
            </select>
            <ul>
              <li className={styles.input}>
                {input.country.map((e) => e + " ,")}{" "}
              </li>{" "}
            </ul>
          </div>
          <button className={styles.submit} type="submit">
            Crete Activity
          </button>
        </form>
      </div>
    </div>
  );
}
