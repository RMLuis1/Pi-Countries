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
import {  NavLink } from "react-router-dom";
import styles from "./home.module.css";
import CountryCard from "./countriesCard.js";
import Paginado from "./paginadoCountries";
import { Search } from "./search";
import { Spinner } from "./Spinner";

export default function Home() {
  const dispatch = useDispatch();

  const allCountry = useSelector((state) => state.countries);
  const allActivity = useSelector((state) => state.activity);
  const [isLoading, setIsLoading] = useState(true);

  const [orden, setOrden] = useState("");

  console.log(orden);
  const [pagina, setPagina] = useState(1);
  const [countriPorPagina] = useState(8);

  const indexUltimoCountri = pagina * countriPorPagina;
  const indexPrimerCountri = indexUltimoCountri - countriPorPagina;
  const currentCountry = allCountry.slice(
    indexPrimerCountri,
    indexUltimoCountri
  );

  // const paginado = (pageNumber) => {
  //   setPagina(pageNumber);
  // };

  setTimeout(() => {
    // setIsLoading(true);

    setIsLoading(false);
  }, 3000);

  useEffect(() => {
    dispatch(getCountry());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getActivity());
  }, [dispatch]);

  function handleSort(e) {
    e.preventDefault();
    dispatch(filterCountryByAfabeticamente(e.target.value));
    setPagina(1);
    setOrden(`Ordenado ${e.target.value}`);
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
    setPagina(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  const norepeat = allActivity
    .map((e) => e.name)
    .reduce((acc, activityNoRepeat) => {
      if (!acc.includes(activityNoRepeat)) {
        acc.push(activityNoRepeat);
      }
      return acc;
    }, []);

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>
          <NavLink to="/home">
            <h2 className={styles.titulo}>Countries</h2>
          </NavLink>
        </div>
        <div className={styles.search}>
          <Search />
        </div>
        <div className={styles.activity}>
          <NavLink to="/activity">
            <button className={styles.buttonHome}>Activity</button>
          </NavLink>{" "}
        </div>
      </header>
      <div>
        <div className={styles.navBar}>
          <select className={styles.selection} label="sortAlphabetically" onChange={(e) => handleSort(e)}>
              <option value="ALL">Orden ALfabetico</option>
              <option value="ascendente">A-Z</option>
              <option value="descendente">Z-A</option>
          
          </select>
          <select
            className={styles.selection}
            label="Continents"
            onChange={(e) => handlefilterContinents(e)}
          >
            <option value="All">All Continents</option>
            <option value="North America"> North America</option>
            <option value="South America"> South America</option>
            <option value="Asia">Asia</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Africa">Africa</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
          <select
            className={styles.selection}
            label="Activity"
            onChange={(e) => handleActivity(e)}
          >
            <option disabled>Filter by Activity</option>,
            <option value="All">All Activity</option>,
            {norepeat.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
          <select
            className={styles.selection}
            label="SortPopulation"
            onClick={(e) => handleSortPopulation(e)}
          >
            <option value="All">Population</option>
            <option value="ascendente">Ascendente</option>
            <option value="descendente">Descendente</option>
          </select>

          <button className={styles.filterButton}>Filter</button>
        </div>

        <div className={styles.paginado}>
          <Paginado
            countriPorPagina={countriPorPagina}
            pagina={pagina}
            indexUltimoCountri={indexUltimoCountri}
            setPagina={setPagina}
            allCountry={allCountry.length}
          />
          {/* <Paginado
            countriPorPagina={countriPorPagina}
            allCountry={allCountry.length}
            paginado={paginado}
          /> */}
        </div>

        <div className={styles.countriescard}>
          {currentCountry?.map((e) => {
            return (
              <div key={e.id}>
                <a className={styles.link} href={"/home/" + e.id}>
                  <ul>
                    <CountryCard
                      name={e.name}
                      flags={e.flags}
                      continents={e.continents}
                    />
                  </ul>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
