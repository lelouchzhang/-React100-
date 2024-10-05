import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

export default function Map() {
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const navigator = useNavigate();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigator("form")}>
      Map
    </div>
  );
}
