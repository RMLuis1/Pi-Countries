import React from "react";
import { useEffect} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {  getActivity} from "../redux/accion";
import { Link, NavLink } from "react-router-dom";
import styles from "./homeActivity.module.css";
// import Swal from "sweetalert2";

export function HomeActivity() {
  const dispatch = useDispatch();
  const allActivity = useSelector((state) => state.activity);
  // const navigate = useNavigate();
  
  useEffect(() => {
  
   dispatch(getActivity());
    
  }, [dispatch]);
console.log(allActivity)


  return (
    <div className={styles.container}>
      <NavLink className={styles.link} to="/activity/create">
        <button className={styles.buttonCreate}>Create Activity</button>
      </NavLink>
      <NavLink to="/home">
        <button className={styles.buttonVolver}>Go back</button>{" "}
      </NavLink>
      <br />
      <title className={styles.title}>Activity</title>

      <div className={styles.activityscard}>
        {allActivity?.map((e) => {
          return (
            <ul key={e.id}>
              <div className={styles.activitis}>
                <h2 className={styles.h1A}>{e.name}</h2>
                <img width={130} height={100} src={e.imagen} alt="no Found" />
                <h4 className={styles.h41}>
                  <strong>Difficulty: </strong> {e.difficulty}
                </h4>
                <h4 className={styles.h41}>
                  <strong>Countries: </strong>
                  {e.countries.length}{" "}
                </h4>
                <Link to={"/activity/" + e.id}>
                  <button className={styles.buttonDe}>Detall</button>
                </Link>
              </div>
            </ul>
          );
        })}
      </div>
    </div>
  );
}
