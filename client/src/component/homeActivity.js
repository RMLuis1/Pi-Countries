import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ActivityCard } from "./activitysCard";
import { getActivity } from "../redux/accion";
import { NavLink } from "react-router-dom";
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

      <h1>Activity</h1>

      <div>
        {allActivity?.map((e) => {
          return (
            <div key={e.id}>
              <ul>
                <ActivityCard
                  name={e.name}
                  difficulty={e.difficulty}
                  duration={e.duration}
                  season={e.season}
                  id={e.id}
                  countries={e.countries.map((e) => {
                    return e.id;
                  })}
                />
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
