import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCountriesID } from "../redux/accion";

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
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <div>
        {countryDetall ? (
          <div>
            <h1>{countryDetall.name}</h1>
            <p>{countryDetall.id}</p>
            <p>{countryDetall.continents}</p>
            <p>{countryDetall.capital}</p>
            <p>{countryDetall.subregion}</p>
            <p>{countryDetall.area}</p>
            <p>{countryDetall.population}</p>
            <img
              width={150}
              height={100}
              
              src={countryDetall.flags}
              alt="flag not found"
            />
          </div>
        ) : (
          "No found"
        )}
      </div>
    </div>
  );
}
