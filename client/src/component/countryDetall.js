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
              <select multiple>
                {countryDetall.activities?.map((e) => {
                  return <option  key={e.name}>{e.name} </option>;
                })}
              </select>
            </div>
          </div>
        ) : (
          "No found"
        )}
      </div>
    </div>
  );
}