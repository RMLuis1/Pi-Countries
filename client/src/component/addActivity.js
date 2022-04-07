import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getActivity, addActivity } from "../redux/accion";
import styles from "./addActivity.module.css";

export function CreateActivity() {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activity);

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    country: "",
  });

  const [inputError, setInputError] = useState({});

  function handleSelectSeason(e) {
    setInput({
      ...input,
      season: e.target.value,
    });
  }
  function handleSelectDuration(e) {
    setInput({
      ...input,
      duration: e.target.value,
    });
  }

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

    if (!input.country) {
      error.country = "Country is required";
    } else if (!/^[A-Z]+$/i.test(input.country)) {
      error.country = "Country is invalid";
    }

    return error;
  }

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
            <select onChange={(e) => handleSelectDuration(e)}>
              <option value="1 Hours">1 Hours</option>
              <option value="2 Hours">2 Hours</option>
              <option value="3 Hours">3 Hours</option>
              <option value="4 Hours +">4 Hours +</option>
            </select>
          </div>{" "}
          <div>
            <label>Season</label>
            <select onChange={(e) => handleSelectSeason(e)}>
              <option value="default">Moment of the year</option>
              <option value="summer">Sumer</option>
              <option value="winter">Winter</option>
              <option value="fall">Fall</option>
              <option value="spring">Spring</option>
            </select>
          </div>{" "}
          <div>
            <label>Country</label>
            <input
              className={inputError.country && styles.inputdanger}
              type="text"
              value={input.country}
              name="country"
              onChange={(e) => handleChange(e)}
            ></input>
            {inputError.country && (
              <p className={styles.danger}>{inputError.country}</p>
            )}
          </div>{" "}
          <button type="submit">Crete Activity</button>
        </form>
      </div>
        {activities.map((e) => (
          <div>
            <p>{e}</p>
            <button onClick={() => handleDelet(e)}>X</button>
          </div>
        ))}
    </div>
  );
}

/* <form>
      <label>Imagen</label>
      <input type="img" value={input.imagen} onChange={handleChange}/>
    </form> */
