import React from "react";
import styles from "./activitysCard.module.css"

export function ActivityCard({name, difficulty, duration, season, country}) {
  return (
    <div className={styles.activitysCard}>
      <li className={styles.li}>
        <h3>{name}</h3>
        <p>{difficulty}</p>
        <p>{duration}</p>
        <p>{season}</p>
        <p>{country}</p>
      </li>
    </div>
  );
}
