import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ActivityCard } from "./activitysCard";
import { getActivity } from "../redux/accion";
import { Link, NavLink } from "react-router-dom";
import styles from "./homeActivity.module.css";

export function HomeActivity() {
  const dispach = useDispatch();
  const allActivity = useSelector((state) => state.activity);

  useEffect(() => {
    dispach(getActivity());
  }, [dispach]);

  return (
    <div className={styles.activityscard}>
      <NavLink className={styles.link} to="/activity/create">
        <button className={styles.buttonCreate}>Create Activity</button>
      </NavLink>
      <NavLink to="/home" ><button>Volver</button> </NavLink>
      <h1>Activity</h1>

      <div>
        {allActivity?.map((e) => {
          return (
            <ul key={e.id}>
            
               
                <ActivityCard
                
                name= {<NavLink to={"/activity/"+ e.id} >{e.name}</NavLink>}
                  difficulty={e.difficulty}
                  duration={e.duration}
                  season={e.season}
                  id={e.id}
                  countries={e.countries.map((e) => {
                    return (
                     <ul key={e.name}>
                      {e.id}<br />
                        <img
                          width={50}
                          height={25}
                          src={e.flags}
                          alt="flag not found"
                        />
                    </ul>
                    );
                  })}
                />
              
             </ul> 
          );
        })}
      </div>
    </div>
  );
}
