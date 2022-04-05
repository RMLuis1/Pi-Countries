import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Landinpage.module.css";
export function Landinpage() {
  return (
    <div className={styles.portada}>
      <img
        className={styles.fondodeportada}
        src="https://elordenmundial.com/wp-content/uploads/2022/02/Que-es-una-zona-de-influencia-y-como-han-servido-para-moldear-el-mundo.jpg"
        alt="Not found"
      />

      <title className={styles.title}>Bienvenidos</title>
      <p className={styles.FrasePresentacion}>
        {" "}
        hola esta es una pagina web de algo..
      </p>
      <NavLink to="/home">
        <button className={styles.button}>Ingresar</button>
      </NavLink>
      <div className={styles.contenedor}>
      <p className={styles.p}>Hola profe</p>
      <ul className={styles.lista}>
        <li>Apruebeme</li>
        <li>Porfiss!</li>
        <li>Help me!!!</li>

      </ul>

      </div>


    </div>
  );
}
