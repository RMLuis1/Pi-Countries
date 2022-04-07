import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCountry,
  filterCountryByContinents,
  filterCountryByAfabeticamente,
  filterCountryByPopulation,
} from "../redux/accion/index";
import { Link, NavLink } from "react-router-dom";
import styles from "./home.module.css";
import CountryCard from "./countriesCard.js";
import Paginado from "./paginadoCountries";
import { Search } from "./search";
import { Country } from "./countryDetall";

export default function Home() {
  const dispatch = useDispatch();

  //se usa para despachar las acciones
  const allCountry = useSelector((state) => state.countries);
  //es un hoock para reemplazar el mapStateToProps
  //se conecta el estado
  //sirve para traer el estado de paises...y lo guarda en la constante
  //que por el momento esta vacio

  const [countryPage, setCountryPage] = useState(1);
  const [countryPorPage, setCountryPorPage] = useState(10);
  const [orden, serOrden] = useState("");
  const indexOfLastCountry = countryPage * countryPorPage;
  const indexOfFirstCountry = indexOfLastCountry - countryPorPage;
  const currentCountry = allCountry.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const paginado = (pageNumber) => {
    setCountryPage(pageNumber);
  };

  //Effect sirve para actualizar el estado.
  useEffect(() => {
    dispatch(getCountry());
    //ejecuta la funcion getCountry
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getCountry());
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(filterCountryByAfabeticamente(e.target.value));
    setCountryPage(1);
    serOrden(`Ordenado ${e.target.value}`);
  }

  function handlefilterContinents(e) {
    dispatch(filterCountryByContinents(e.target.value));
  }

  function handleSortPopulation(e) {
    e.preventDefault();
    dispatch(filterCountryByPopulation(e.target.value));
    setCountryPage(1);
    serOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div>
      <NavLink to="/activity">
        <button className={styles.buttonHome}>Activity</button>
      </NavLink>{" "}
      <br />
      <h1 className={styles.title}>Countries</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Countries???
      </button>
      <Search />
      <div>
        <div className={styles.navbar}>
          <select onClick={(e) => handleSort(e)}>
            <option value="">Orden ALfabetico</option>
            <option value="ascendente">A-Z</option>
            <option value="descendente">Z-A</option>
          </select>
          <select onClick={(e) => handlefilterContinents(e)}>
            <option value="All">Continents</option>
            <option value="North America"> North America</option>
            <option value="South America"> South America</option>
            <option value="Asia">Asia</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Africa">Africa</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
          <select>
            <option value="Activity">Activity</option>
          </select>
          <select onClick={(e) => handleSortPopulation(e)}>
            <option value="population">Population</option>
            <option value="ascendente">Ascendente</option>
            <option value="descendente">Descendente</option>
          </select>
        </div>

        <Paginado
          countryPorPage={countryPorPage}
          allCountry={allCountry.length}
          paginado={paginado}
        />
        <div className={styles.countriescard}>
          {currentCountry?.map((e) => {
            return (
              <div key={e.id}>
                <ul>
                  <Link className={styles.link} to={"/home/" + e.id}>
                    <CountryCard
                      name={e.name}
                      flags={e.flags}
                      continents={e.continents}
                    />
                  </Link>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
