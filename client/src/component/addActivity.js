import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getActivity, addActivity } from "../redux/accion";

export function CreateActivity() {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state);

  const [text, setText] = useState({
    name: "",
    difficulty: "",
    duraction: "",
    season: "",
    country: "",
  });

  //!va manejando los cambios del input(los guarda)
  function handleChange(e) {
    setText( ()=>{
        return {
      ...text,
      [e.target.value]: e.target.value,
    }});
    console.log(text);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addActivity(text));
    alert("Activity successfully created!");
    setText({
      name: "",
      difficulty: "",
      duraction: "",
      season: "",
      country: "",
    });
  }
  useEffect(() => {
    dispatch(addActivity());
  }, []);

  return (
    <div>
      <Link to="/home">
        <button>volver</button>
      </Link>

      <div>
        <form>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={text.name}
              onChange={handleChange}
            ></input>
          </div>{" "}
          <div>
            <label>Difficulty</label>
            <input
              type="number"
              value={text.difficulty}
              onChange={handleChange}
            ></input>
          </div>{" "}
          <div>
            <label>Season</label>
            <input
              type="text"
              value={text.season}
              onChange={handleChange}
            ></input>
          </div>{" "}
          <div>
            <label>Country</label>
            <input
              type="text"
              value={text.country}
              onChange={handleChange}
            ></input>
          </div>
        </form>
      </div>

      {/* <form>
      <label>Imagen</label>
      <input type="img" value={input.imagen} onChange={handleChange}/>
    </form> */}
      <button
        type="submit"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Crete Activity
      </button>
    </div>
  );
}
