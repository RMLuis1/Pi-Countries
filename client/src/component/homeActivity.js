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

  const [activityPorPage, setActivityPage] = useState("");

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
            <ul>
              <ActivityCard
                name={e.name}
                difficulty={e.difficulty}
                duration={e.duration}
                season={e.season}
                country= {e.country}
              />
            </ul>
          );
        })}
      </div>
    </div>
  );
}
