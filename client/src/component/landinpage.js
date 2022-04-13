import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Landinpage.module.css";
export function Landinpage() {
  return (
    <div className={styles.portada}>
      <img
        className={styles.fondodeportada}
        src="https://static9.depositphotos.com/1000423/1203/i/950/depositphotos_12030228-stock-photo-technology-and-the-world.jpg"
        alt="Not found"
      />

      <title className={styles.title}>Welcome!</title>
      <p className={styles.FrasePresentacion}>
        This is a web application, in which you will find Countries with their
        descriptions and their tourist activities. You can create Activities and
        associate them to the countries you want...
      </p>
      <br />
      <NavLink to="/home">
        <button className={styles.button}>Get in</button>
      </NavLink>
    </div>
  );
}
