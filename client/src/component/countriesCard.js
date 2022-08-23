import React from "react";
import styles from "./countryCard.module.css";

export default function CountryCard({ flags, name, continents,id }) {
  return (
    <div className={styles.countriesCard}>
      <li className={styles.li}>
        
        <img
          className={styles.image}
          src={flags}
          alt="flag not found"
        />
<h3 className={styles.figc}>{id} </h3>

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
