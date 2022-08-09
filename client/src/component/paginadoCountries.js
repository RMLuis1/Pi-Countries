import React from "react";
import styles from "./paginadoCountries.module.css";
import { useState } from "react";

export default function Paginado({ countriPorPagina,pagina,indexUltimoCountri, setPagina, allCountry, paginado }) {
  // export default function Paginado({ countriPorPagina, allCountry, paginado }) {
  const pageNumber = [];
  const [pageNumberLimit, /*setPageNumberLimit*/] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  for (let i = 0; i < Math.ceil(allCountry / countriPorPagina); i++) {
    pageNumber.push(i + 1);
  }
  const handleClick = (e) => {
    e.preventDefault();
    setPagina(Number(e.target.id));
  };

  const handleLastPage = (e) => {
    e.preventDefault();
    const maxLimit = Math.ceil(pageNumber.length / 5);
    setMaxPageNumberLimit(maxLimit * 5);
    setMinPageNumberLimit(maxLimit * 5 - 5);
    setPagina(Number(e.target.id));
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setPagina(pagina - 1);
    if (pagina - 1 <= minPageNumberLimit && pagina - 1 > 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    setPagina(pagina + 1);
    if (pagina + 1 > maxPageNumberLimit && pagina + 1 <= pageNumber.length) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  //Condicional para que no se pierda el puntero del paginado
  if (maxPageNumberLimit > indexUltimoCountri) {
    setMaxPageNumberLimit(5);
    setMinPageNumberLimit(0);
  }

  const renderPageNumbers = pageNumber.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={pagina === number ? styles.active : styles.numb}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  let pageDecrementDots = null;
  if (pagina > pageNumberLimit) {
    pageDecrementDots = <li className={styles.dots}>...</li>;
  }

  let pageIncrementDots = null;
  if (pageNumber.length > maxPageNumberLimit) {
    pageIncrementDots = <li className={styles.dots}>...</li>;
  }

  let showFirstNumber = null;
  if (pagina > pageNumberLimit) {
    showFirstNumber = (
      <li
        id={pageNumber[0]}
        onClick={handleClick}
        className={pagina === 1 ? styles.active : styles.first}
      >
        {pageNumber[0]}
      </li>
    );
  }

  let showLastNumber = null;
  if (
    pageNumber.length > minPageNumberLimit &&
    pageNumber.length > maxPageNumberLimit
  ) {
    showLastNumber = (
      <li
        id={pageNumber[pageNumber.length - 1]}
        onClick={(e) => handleLastPage(e)}
        className={
          pagina === pageNumber.length ? styles.active : styles.last
        }
      >
        {pageNumber[pageNumber.length - 1]}
      </li>
    );
  }



  return (
    // <div>
    //   <ul className={styles.pagination}>
    //     {pageNumber?.map((number) => {
    //       return (
    //         <li className={styles.paginado} key={number}>
    //           <button
    //             className={styles.buttonpaginado}
    //             onClick={() => paginado(number)}
    //           >
    //             {number}
    //           </button>
    //         </li>
    //       );
    //     })}
    //   </ul>
    // </div>
    <>
      <div className={styles.container}>
        <ul className={styles.paginationUl}>
          <li>
            <button
              className={styles.buttonPrev}
              onClick={(e) => handlePrev(e)}
              disabled={pagina - 1 === 0 ? true : false}
            >
              prev
            </button>
          </li>
          {showFirstNumber}
          {pageDecrementDots}
          {renderPageNumbers}
          {pageIncrementDots}
          {showLastNumber}
          <li>
            <button
              className={styles.buttonNext}
              onClick={(e) => handleNext(e)}
              disabled={pagina >= pageNumber.length ? true : false}
            >
              next
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
