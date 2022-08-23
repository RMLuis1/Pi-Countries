// import { FaSpinner } from "react-icons/fa";
import styles from "./Spinner.module.css";
export function Spinner() {
  return (
    <div className={styles.spinner}>
      <img
        className={styles.Img}
        src="https://k40.kn3.net/taringa/1/4/0/4/9/1/25/3dm0nd84/A8A.gif?1338"
        // src="./imagen/A8A.gif"
        alt="No Found"
      />
      {/* <FaSpinner className={styles.spinnig} size={60} /> */}
    </div>
  );
}
