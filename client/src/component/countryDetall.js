import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCountriesID } from "../redux/accion";
import styles from "./countryDetall.module.css"


export function Country() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCountriesID(id));
  }, [dispatch]);

  const countryDetall = useSelector((state) => state.country);
  console.log(countryDetall);
  return (
    <div>
      <img
        className={styles.fondodeportada}
        src="https://st2.depositphotos.com/1000423/7385/i/950/depositphotos_73854055-stock-photo-world-map.jpg"
        alt="Not found"
      />
      <Link to="/home">
        <button className={styles.buttonVolver}>Go back</button>
      </Link>
      <div className={styles.div1}>
        {countryDetall ? (
          <div className={styles.div2}>
            <h1 className={styles.title}>{countryDetall.name}</h1>
            <img
              width={150}
              height={100}
              src={countryDetall.flags}
              alt="flag not found"
            />
            <p>
              <strong>Id: </strong>
              {countryDetall.id}
            </p>
            <p>
              <strong>Continents: </strong>
              {countryDetall.continents}
            </p>
            <p>
              <strong>Capital: </strong>
              {countryDetall.capital}
            </p>
            <p>
              <strong>Subregion: </strong>
              {countryDetall.subregion}
            </p>
            <p>
              <strong>Area: </strong>
              {countryDetall.area}
            </p>
            <p>
              <strong>Population: </strong>
              {countryDetall.population}
            </p>

            <div>
              <strong>Activity: </strong>
              <br />
              {countryDetall.activities?.map((e) => {
                return (
                  <ul className={styles.ulAct}>
                    <Link
                      className={styles.link}
                      to={"/activity/" + e.id}
                      key={e.id}
                    >
                      <p>{e.name}</p>
                    </Link>
                  </ul>
                );
              })}
            </div>
          </div>
        ) : (
          "No found"
        )}
      </div>
    </div>
  );
}
