import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useCities } from "../hooks/useCities";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useGeolocation } from "../hooks/useGeoLocation";
import styles from "./Map.module.css";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

export default function Map() {
  const { cities } = useCities();
  const { position: GeoPosition, getPosition } = useGeolocation();
  const [lat, lng] = useUrlPosition();

  const [position, setPosition] = useState([51.505, -0.09]);
  useEffect(() => {
    if (lat && lng) setPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (GeoPosition) setPosition([GeoPosition.lat, GeoPosition.lng]);
  }, [GeoPosition]);

  return (
    <div className={styles.mapContainer}>
      {!GeoPosition && (
        <Button onClick={getPosition} type="position">
          Where am I?
        </Button>
      )}
      <MapContainer
        center={position}
        zoom={5}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position?.lat || 0, city.position?.lng || 0]}
            key={city.id}
          >
            <Popup className={styles.customPopup}>
              <span className={styles.cityEmoji}>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        {GeoPosition && (
          <Marker position={[GeoPosition.lat, GeoPosition.lng]}>
            <Popup>
              <span>You are here</span>
            </Popup>
          </Marker>
        )}
        <ChangePosition position={position} />
        <HandleClick />
      </MapContainer>
    </div>
  );
  // 通过传入坐标跳转
  function ChangePosition({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
  }
  // 鼠标点击地图跳转
  function HandleClick() {
    const navigate = useNavigate();
    useMapEvent({
      // 点击地图时，以编程式导航的方式传入querys，通过url传参
      click: (e) => {
        return navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      },
    });
  }
}
