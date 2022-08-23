import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCountriesID } from "../redux/accion";
import styles from "./countryDetall.module.css";

export function Country() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCountriesID(id));
  }, [id, dispatch]);

  const countryDetall = useSelector((state) => state.country);
  console.log(countryDetall);
  return (
    <div className={styles.container}>
      <Link to="/home">
        <button className={styles.buttonVolver}>Go back</button>
      </Link>
      <div className={styles.divContainer}>
        <div className={styles.mastil}>
          <div className={styles.puntomastil}></div>
          <div className={styles.base}></div>
        </div>
        <div className={styles.div1}>
          {countryDetall ? (
            <div className={styles.div2}>
              <h2 className={styles.title}>{countryDetall.name}</h2>
              <img
                className={styles.flags}
                src={countryDetall.flags}
                alt="flag not found"
              />
              <div className={styles.contenido}>
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
                <p>
                  {" "}
                  <strong>Languages: </strong> {countryDetall.languages}{" "}
                </p>
              </div>
              <div className={styles.activity}>
                <strong  >Activity: </strong>
                <br />
                {countryDetall.activities?.map((e) => {
                  return (
                    <ul key={e.id} className={styles.ulAct}>
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
    </div>
  );
}
