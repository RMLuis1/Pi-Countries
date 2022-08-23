import React from "react";
import styles from "./activitysCard.module.css";

export function ActivityCard({
  name,
  imagen,
  difficulty,
  duration,
  season,

  countries,
}) {
  return (
    <div className={styles.activitysCard}>
      <div>
        <img className={styles.Image} src={imagen} alt="Imagen" />
      </div>
      <div>
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
          
        </li>
      </div>
      <div >
        <h2>
          <strong>Countries: </strong> <br /> {countries}
        </h2>
      </div>
    </div>
  );
}
