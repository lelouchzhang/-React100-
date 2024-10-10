import { useParams, useNavigate } from "react-router-dom";
import { useCities } from "../hooks/useCities";
import Button from "./Button";
import styles from "./City.module.css";
import Spinner from "./Spinner";
import { useEffect } from "react";

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading, deleteCity } = useCities();
  const navigate = useNavigate();

  useEffect(() => {
    getCity(id);
  }, [id, getCity]);

  if (isLoading) return <Spinner />;

  const { cityName, emoji, date, notes } = currentCity;

  async function handleDelete() {
    await deleteCity(id);
    navigate("/app/cities");
  }

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{date && new Date(date).toLocaleDateString()}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div className={styles.buttonContainer}>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </div>
  );
}

export default City;
