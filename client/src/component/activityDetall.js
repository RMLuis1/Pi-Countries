import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import { AddCountryByActivity, getActivity, getCountry } from "../redux/accion";
import { ActivityCard } from "./activitysCard";
import styles from "./activityDetall.module.css";

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
    }
  }

  return (
    <div>
      <img
        className={styles.fondodeportada}
        src="https://st3.depositphotos.com/13349494/32464/i/1600/depositphotos_324644864-stock-photo-top-view-vintage-blank-notebook.jpg"
        alt="Not found"
      />
      <NavLink to="/activity">
        <button className={styles.buttonVolver}>Go back</button>{" "}
      </NavLink>
      <br />
      <div className={styles.divMayor}>
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
                      <div className={styles.countries}>
                        <ul key={e.name} className={styles.ul}>
                          <li className={styles.li}>
                            <Link to={"/home/" + e.id}>{e.id}</Link>
                            <br />
                            <img
                              width={50}
                              height={25}
                              src={e.flags}
                              alt="flag not found"
                            />{" "}
                          </li>
                        </ul>
                      </div>
                    );
                  })}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
