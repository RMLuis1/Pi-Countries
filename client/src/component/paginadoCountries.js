import React from "react";
import styles from "./paginadoCountries.module.css";

export default function Paginado({ countryPorPage, allCountry, paginado }) {
  const pageNumber = [];

  for (let i = 0; i < Math.ceil(allCountry / countryPorPage); i++) {
    pageNumber.push(i + 1);
  }


  return (
    <div>
      <ul className={styles.pagination}>
        {pageNumber?.map((number) => {
          
          return (
            
              
            <li className={styles.paginado} key={number}>
              <button
                className={styles.buttonpaginado}
                onClick={() => paginado(number)}
              >
                {number}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
