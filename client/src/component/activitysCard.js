import React from "react";
import styles from "./activitysCard.module.css";

export function ActivityCard({
  name,
  difficulty,
  duration,
  season,
  id,
  countries,
}) {
  return (
    <div className={styles.activitysCard}>
     
      <li className={styles.li}>
        <h3 className={styles.name}>{name}</h3>
        <p>
          <strong>Difficulty:</strong> {difficulty}
        </p>
        <p>
          <strong>Duration:</strong> {duration}
        </p>
        <p>
          <strong>Season:</strong> {season}
        </p>
        <p>
          <strong>ID: </strong> {id}
        </p>
        <p className={styles.country}>
          <strong>Countries: </strong> <br /> {countries}
        </p>
      </li>
    </div>
  );
}
