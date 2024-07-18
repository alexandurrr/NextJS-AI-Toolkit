"use client";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useLocation } from "../../context/LocationContext";
import styles from "./Map.module.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

function MapUpdater({ location }) {
  const map = useMap();

  useEffect(() => {
    map.setView([location.latitude, location.longitude], 13);
  }, [location, map]);

  return null;
}

export default function Map() {
  const { location } = useLocation();
  const mapRef = useRef(null);

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <div className={styles.mapWrapper}>
      <MapContainer
        key={`${location.latitude}-${location.longitude}`}
        center={[location.latitude, location.longitude]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[location.latitude, location.longitude]}>
          <Popup>
            <div className={styles.popupContent}>
              <h3>{location.name}</h3>
              {location.imageUrl && (
                <img
                  src={location.imageUrl}
                  alt={location.name}
                  className={styles.locationImage}
                />
              )}
            </div>
          </Popup>
        </Marker>
        <MapUpdater location={location} />
      </MapContainer>
      {location.imageUrl && (
        <div className={styles.imageOverlay}>
          <img
            src={location.imageUrl}
            alt={location.name}
            className={styles.overlayImage}
          />
        </div>
      )}
    </div>
  );
}
