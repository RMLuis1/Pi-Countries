import React from "react";
import styles from "./countryCard.module.css";

export default function CountryCard({ flags, name, continents }) {
  return (
    <div className={styles.countriesCard}>
      <li className={styles.li}>
        <h3>{name}</h3>
        <img
          width={150}
          height={100}
          className={styles.image}
          src={flags}
          alt="flag not found"
        />
        <p>{continents}</p>
      </li>
    </div>
  );
}
