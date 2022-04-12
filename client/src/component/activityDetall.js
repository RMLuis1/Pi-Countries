import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import { AddCountryByActivity, getActivity, getCountry } from "../redux/accion";
import { ActivityCard } from "./activitysCard";

export function ActivityDetall() {
  const dispatch = useDispatch();
  const allCountry = useSelector((state) => state.countries);
  const { id } = useParams();
  const act = id;
  const activities = useSelector((state) => state.activity);
  useEffect(() => {
    dispatch(getActivity());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getCountry());
  }, [dispatch]);

  const [input, setInput] = useState({
    country: [],
  });

  function agregarCountry(e) {
    activities.countries?.filter((elem) => {
      if (elem.name !== e) {
        setInput({
          ...input,
          country: [...input.country, e.target.value],
        });
        return "Country added successfully!";
      } else {
        alert("the country you want to add already exists!");
      }
    });
  }
  function handleSubmit(e) {
    e.preventDefault();

    if (!input.country) {
      return alert("Todos los campos son obligatorios");
    } else {
      dispatch(AddCountryByActivity(e));
      alert("Activity successfully created!");
      // setInput({
      //   ...input,
      //   [e.target.name]: "",
      // });
    }
  }

  return (
    <div>
      <NavLink to="/activity">
        <button>Volver</button>{" "}
      </NavLink>
      <br />
      <div>
        {activities.map((e) => {
          if (e.id == act) {
            return (
              <div>
                <ActivityCard
                  name={e.name}
                  difficulty={e.difficulty}
                  duration={e.duration}
                  season={e.season}
                  id={e.id}
                  countries={e.countries.map((e) => {
                    return (
                      <ul key={e.name}>
                       <Link to={"/home/" + e.id } >{e.id}</Link> 
                        <br />
                        <img
                          width={50}
                          height={25}
                          src={e.flags}
                          alt="flag not found"
                        />
                      </ul>
                    );
                  })}
                />

                <form onSubmit={(e) => handleSubmit(e)}>
                  <select onChange={() => agregarCountry(e)}>
                    {allCountry.map((e) => {
                      return (
                        <option key={e.id} value={e.name} id={e.name}>
                          {e.name}
                        </option>
                      );
                    })}
                  </select>

                  <button>Modify Country</button>
                </form>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
