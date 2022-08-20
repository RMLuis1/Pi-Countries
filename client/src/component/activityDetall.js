import React from "react";
import {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import {  getActivity } from "../redux/accion";
import { ActivityCard } from "./activitysCard";
import styles from "./activityDetall.module.css";

export function ActivityDetall() {
  const dispatch = useDispatch();
  // const allCountry = useSelector((state) => state.countries);
  const { id } = useParams();
  let aa= id
  console.log("esto a aa",aa)
  console.log("esto a id",id)
  const activities = useSelector((state) => state.activity);
console.log(activities)


  useEffect(() => {
    dispatch(getActivity());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getCountry());
  // }, [dispatch]);

  // const [input, setInput] = useState({
  //   country: [],
  // });

  // function agregarCountry(e) {
  //   activities.countries?.filter((elem) => {
  //     if (elem.name !== e) {
  //       setInput({
  //         ...input,
  //         country: [...input.country, e.target.value],
  //       });
  //       return "Country added successfully!";
  //     } else {
  //       alert("the country you want to add already exists!");
  //     }
  //   });
  // }
  // function handleSubmit(e) {
  //   e.preventDefault();

  //   if (!input.country) {
  //     return alert("Todos los campos son obligatorios");
  //   } else {
  //     dispatch(AddCountryByActivity(e));
  //     alert("Activity successfully created!");
  //   }
  // } 



const fil=activities.filter((e)=> e.id === id)
console.log("esto es fil",fil)
  return (
    <div>
      <NavLink to="/activity">
        <button className={styles.buttonVolver}>Go back</button>{" "}
      </NavLink>
      <br />
      <div className={styles.divMayor}>
        {activities?.map((e) =>
          e.id === Number(id) ? (
            <div>
              <ActivityCard
                name={e.name}
                difficulty={e.difficulty}
                duration={e.duration}
                season={e.season}
                id={e.id}
                countries={e.countries.map((e) => {
                  return (
                    <div className={styles.countries}>
                      <ul key={e.name} className={styles.ul}>
                        <li className={styles.li}>
                          <Link to={"/home/" + e.id}>{e.id}</Link>
                          <br />
                          <img
                            width={50}
                            height={25}
                            src={e.flags}
                            alt="flag not found"
                          />{" "}
                        </li>
                      </ul>
                    </div>
                  );
                })}
              />
            </div>
          ) : (
            <div>
              <h1>Not Found</h1>{" "}
            </div>
          )
        )}
      </div>
    </div>
  );
}
