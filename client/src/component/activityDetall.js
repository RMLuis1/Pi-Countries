import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";
import { getActivityID, activityDelet } from "../redux/accion";
import { ActivityCard } from "./activitysCard";
import styles from "./activityDetall.module.css";
import Swal from "sweetalert2";

export function ActivityDetall() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const allCountry = useSelector((state) => state.countries);
  const { id } = useParams();
  const activities = useSelector((state) => state.activit);

  console.log("esto a id", id);

  useEffect(() => {
    dispatch(getActivityID(id));
  }, [id, dispatch]);
  console.log("Esto seria detall acti", activities);

  
  function handledelet(e) {
    e.preventDefault();
    console.log("Esto es e de button", e.target.value);
    dispatch(activityDelet(e.target.value));
    Swal.fire({
      title: "Success!",
      text: "Deleted activity!",
      icon: "success",
      confirmButtonText: "ok",
    });
    navigate("/activity");
  }

  return (
    <div className={styles.container}>
      <NavLink to="/activity">
        <button className={styles.buttonVolver}>Go back</button>{" "}
      </NavLink>
      <br />
      <div className={styles.div1}>
        {activities ? (
          <div>
            <ActivityCard
              name={activities.name}
              difficulty={activities.difficulty}
              duration={activities.duration}
              season={activities.season}
              id={activities.id}
              imagen={activities.imagen}
              countries={
                activities.countries ? (
                  <div className={styles.divCountri}>
                    {activities.countries.map((e) => (
                      <div className={styles.countries}>
                        {" "}
                        <ul key={e.name} className={styles.ul}>
                          <li className={styles.li} key={e.id}>
                            <Link className={styles.link} to={"/home/" + e.id}>{e.id}</Link>
                            <br />
                            <img
                              width={30}
                              height={15}
                              src={e.flags}
                              alt="flag not found"
                            />
                          </li>
                        </ul>{" "}
                      </div>
                    ))}
                  </div>
                ) : null
              }
            />
            <button
              key={activities.id}
              value={activities.id}
              className={styles.buttonDelete}
              onClick={(e) => handledelet(e)}
            >
              Remove
            </button>
          </div>
        ) : (
          <div>
            <h1>Not Found</h1>{" "}
          </div>
        )}
      </div>
    </div>
  );
}
