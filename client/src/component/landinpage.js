import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Landinpage.module.css";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export function Landinpage() {
  return (
    <div className={styles.portada}>
      
      <h1 className={styles.h1}>
        <em className={styles.em}>C</em>
        <em className={styles.planetleft}>O</em>
        <em className={styles.em}>U</em>
        <em className={styles.em}>N</em>
        <em className={styles.em}>T</em>
        <em className={styles.em}>R</em>
        <em className={styles.planetright}>I</em>
        <em className={styles.em}>E</em>
        <em className={styles.em}>S</em>
      </h1>
      <aside className={styles.FrasePresentacion}>
        This is a web application, in which you will find Countries with their
        descriptions and their tourist activities. You can create Activities and
        associate them to the countries you want...
      </aside>
      <br />
      <NavLink to="/home">
        <button className={styles.button}>Get in</button>
      </NavLink>

      <footer className={styles.title2}>
        <a
          className={styles.a}
          href="https://www.linkedin.com/in/ricardo-martin-luis07/"
        >
          <FaLinkedin />
        </a>
        <a className={styles.a2} href="https://github.com/RMLuis1">
          <FaGithub />
        </a>
        <p>Copyright © 2022 Ricardo-Martin-Luis.</p>
        <p>All rights reserved</p>
      </footer>
    </div>
  );
}
