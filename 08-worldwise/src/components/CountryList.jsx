import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";

export default function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (cities.length === 0)
    return <Message message="Add your first city by clicking on the map" />;
  const countries = [...new Set(cities)];

  return (
    <ul className={styles.countryList}>
      {countries.map((country, i) => {
        return <CountryItem country={country} key={i} />;
      })}
    </ul>
  );
}
