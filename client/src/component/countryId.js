import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesID, getCountry } from "../redux/accion";

import CountryCard from "./countriesCard";

export function Country() {
  const dispatch = useDispatch();
  const [countriPage] = useState();

  useEffect(() => {
    dispatch(getCountry);
  }, [dispatch]);

  return (
    <div>
      {countriPage?.map((e) => {
        useEffect(()=>{
          dispatch(getCountriesID(e.id))
        },[dispatch])

        return (
          <ul>
            <CountryCard
              name={e.name}
              flags={e.flags}
              continents={e.continents}
            />
          </ul>
        );
      })}
    </div>
  );
}
