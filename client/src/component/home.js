import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCountry,
  filterCountryByContinents,
  filterCountryByAfabeticamente,
  filterCountryByPopulation,
  getActivity,
  filterActivity,
} from "../redux/accion/index";
import { Link, NavLink } from "react-router-dom";
import styles from "./home.module.css";
import CountryCard from "./countriesCard.js";
import Paginado from "./paginadoCountries";
import { Search } from "./search";

export default function Home() {
  const dispatch = useDispatch();

  //se usa para despachar las acciones
  const allCountry = useSelector((state) => state.countries);
  //es un hoock para reemplazar el mapStateToProps
  //se conecta el estado
  //sirve para traer el estado de paises...y lo guarda en la constante
  //que por el momento esta vacio
  const allActivity = useSelector((state) => state.activity);

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

  useEffect(() => {
    dispatch(getActivity());
  }, [dispatch]);

  // function handleClick(e) {
  //   e.preventDefault();
  //   dispatch(getCountry());
  // }

  function handleSort(e) {
    e.preventDefault();
    dispatch(filterCountryByAfabeticamente(e.target.value));
    setCountryPage(1);
    serOrden(`Ordenado ${e.target.value}`);
  }

  function handlefilterContinents(e) {
    dispatch(filterCountryByContinents(e.target.value));
  }

  function handleActivity(e) {
    e.preventDefault();
    if (e.target.value === "Filter by Activity") {
      dispatch(getCountry());
    } else {
      dispatch(filterActivity(e.target.value));
    }
  }

  function handleSortPopulation(e) {
    e.preventDefault();
    dispatch(filterCountryByPopulation(e.target.value));
    setCountryPage(1);
    serOrden(`Ordenado ${e.target.value}`);
  }

  const norepeat = allActivity
    .map((e) => e.name)
    .reduce((acc, activityNoRepeat) => {
      if (!acc.includes(activityNoRepeat)) {
        acc.push(activityNoRepeat);
      }
      return acc;
    }, []);

  return (
    <div>
      <navbar>
        <NavLink to="/activity">
          <button className={styles.buttonHome}>Activity</button>
        </NavLink>{" "}
        <br />
        <NavLink to="/home">
          <h1 className={styles.title}>Countries</h1>
        </NavLink>
        <Search />
      </navbar>
      <div>
        <div className={styles.navbar}>
          <select onChange={(e) => handleSort(e)}>
            <option value="">Orden ALfabetico</option>
            <option value="ascendente">A-Z</option>
            <option value="descendente">Z-A</option>
          </select>
          <select onChange={(e) => handlefilterContinents(e)}>
            <option value="All">Continents</option>
            <option value="North America"> North America</option>
            <option value="South America"> South America</option>
            <option value="Asia">Asia</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Africa">Africa</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
          <select onChange={(e) => handleActivity(e)}>
            <option disabled>Filter by Activity</option>,
            <option value="All">All Activity</option>,
            {norepeat.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
          <select onClick={(e) => handleSortPopulation(e)}>
            <option value="Default">Population</option>
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
                  <CountryCard
                    name={
                      <Link className={styles.link} to={"/home/" + e.id}>
                        {e.name}
                      </Link>
                    }
                    flags={e.flags}
                    continents={e.continents}
                  />
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
