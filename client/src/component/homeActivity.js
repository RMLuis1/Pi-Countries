import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getActivity } from "../redux/accion";
import { Link, NavLink } from "react-router-dom";
import styles from "./homeActivity.module.css";

export function HomeActivity() {
  const dispach = useDispatch();
  const allActivity = useSelector((state) => state.activity);

  useEffect(() => {
    dispach(getActivity());
  }, [dispach]);

  return (
    <div className={styles.activityscard}>
      <NavLink className={styles.link} to="/activity/create">
        <button className={styles.buttonCreate}>Create Activity</button>
      </NavLink>
      <NavLink to="/home">
        <button>Volver</button>{" "}
      </NavLink>
      <h1>Activity</h1>

      <div>
        {allActivity?.map((e) => {
          return (
            <ul key={e.id}>
              <div>
                <h2>{e.name}</h2>
                <h4>
                  <strong>Difficulty: </strong> {e.difficulty}
                </h4>
                <h4>
                  <strong>Paises: </strong>
                  {e.countries.length}{" "}
                </h4>
                <Link to={"/activity/" + e.id}>
                  <button>Detall</button>
                </Link>
              </div>
            </ul>
          );
        })}
      </div>
    </div>
  );
}
