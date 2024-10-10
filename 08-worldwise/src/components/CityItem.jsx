import { Link } from "react-router-dom";
import { useCities } from "../hooks/useCities";
import styles from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;
  const { currentCity, deleteCity } = useCities();

  const lat = position?.lat || 0;
  const lng = position?.lng || 0;

  return (
    //! 这里的跳转触发全局变化，如果在其他位置监听这些属性，那么他们都会变化
    <Link
      className={`${styles.cityItem} ${
        id === currentCity.id ? styles["cityItem--active"] : ""
      }`}
      to={`${id}?lat=${lat}&lng=${lng}`}
    >
      <li>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            e.preventDefault();
            deleteCity(id);
          }}
        >
          &times;
        </button>
      </li>
    </Link>
  );
}
