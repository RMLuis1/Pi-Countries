import React from "react";
import styles from "./countryCard.module.css";

export default function CountryCard({ flags, name, continents }) {
  return (
    <div className={styles.countriesCard}>
      <li className={styles.li}>
        <img
          className={styles.image}
          src={flags}
          alt="flag not found"
        />
        <span>
        <p className={styles.name} >{name}</p></span>
        <span>
        <p className={styles.conti} >{continents}</p></span>
        <span className={styles.lineTop}></span>
        <span className={styles.lineLeft}></span>
      </li>
    </div>
  );
}
