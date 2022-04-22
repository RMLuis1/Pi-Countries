// import { FaSpinner } from "react-icons/fa";
import styles from "./Spinner.module.css";
export function Spinner() {
  return (
    <div className={styles.spinner}>
      <img
      className={styles.Img}
        src="https://thumbs.gfycat.com/BlandHelplessImperatorangel-size_restricted.gif"
        alt="No Found"   
      />
      {/* <FaSpinner className={styles.spinnig} size={60} /> */}
    </div>
  );
}
