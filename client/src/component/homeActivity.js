import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getActivity} from "../redux/accion";
import { Link, NavLink } from "react-router-dom";
import styles from "./homeActivity.module.css";

export function HomeActivity() {
  const dispach = useDispatch();
  const allActivity = useSelector((state) => state.activity);

  useEffect(() => {
  
   dispach(getActivity());
    
  }, [dispach]);

  return (
    <div>
      <img
        className={styles.fondodeportada}
        src="https://st2.depositphotos.com/5970650/10248/i/950/depositphotos_102484512-stock-photo-vintage-compass-magnifying-glass-pocket.jpg"
        alt="Not found"
      />
      <NavLink className={styles.link} to="/activity/create">
        <button className={styles.buttonCreate}>Create Activity</button>
      </NavLink>
      <NavLink to="/home">
        <button className={styles.buttonVolver}>Volver</button>{" "}
      </NavLink>
      <br />
      <h1 className={styles.title}>Activity</h1>

      <div className={styles.activityscard}>
        {allActivity?.map((e) => {
          return (
            <ul key={e.id}>
              <div className={styles.activitis}>
                <h2 className={styles.h1A}>{e.name}</h2>
                <h4 className={styles.h41}>
                  <strong>Difficulty: </strong> {e.difficulty}
                </h4>
                <h4 className={styles.h41}>
                  <strong>Paises: </strong>
                  {e.countries.length}{" "}
                </h4>
                <Link to={"/activity/" + e.id}>
                  <button className={styles.buttonDe}>Detall</button>
                </Link>
              </div>
            </ul>
          );
        })}
      </div>
    </div>
  );
}
