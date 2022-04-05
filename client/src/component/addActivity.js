import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getActivity, addActivity } from "../redux/accion";

export function CreateActivity() {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    country: [],
  });

  //!va manejando los cambios del input(los guarda)
  function handleChange(e) {
    setInput(() => {
      return {
        ...input,
        [e.target.name]: e.target.value,
      };
    });
    console.log(input);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addActivity(input));
    alert("Activity successfully created!");
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      country: "",
    });
  }
  useEffect(() => {
    dispatch(addActivity(input));
  }, [dispatch]);

  return (
    <div>
      <Link to="/home">
        <button>volver</button>
      </Link>

      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>{" "}
          <div>
            <label>Difficulty</label>
            <input
              type="number"
              value={input.difficulty}
              name="difficulty"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>{" "}
          <div>
            <label>Duration</label>
            <input
              type="text"
              value={input.ñ}
              name="duration"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>{" "}
          <div>
            <label>Season</label>
            <input
              type="text"
              value={input.season}
              name="season"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>{" "}
          <div>
            <label>Country</label>
            <input
              type="text"
              value={input.country}
              name="country"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>{" "}
          <button type="submit">Crete Activity</button>
        </form>
      </div>
    </div>
  );
}

/* <form>
      <label>Imagen</label>
      <input type="img" value={input.imagen} onChange={handleChange}/>
    </form> */
