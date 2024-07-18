"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { LocationProvider, useLocation } from "../../context/LocationContext";
import styles from "./locationAI.module.css";

const Map = dynamic(() => import("./MapComponent"), { ssr: false });

function LocationSearch() {
  const [query, setQuery] = useState("");
  const { location, setLocation } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [displayLat, setDisplayLat] = useState(location?.latitude || 0);
  const [displayLon, setDisplayLon] = useState(location?.longitude || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setLocation({
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
        imageUrl: data.imageUrl, // Add this line
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (location) {
      const steps = 50;
      const latDiff = (location.latitude - displayLat) / steps;
      const lonDiff = (location.longitude - displayLon) / steps;

      let step = 0;
      const interval = setInterval(() => {
        if (step < steps) {
          setDisplayLat((prev) => prev + latDiff);
          setDisplayLon((prev) => prev + lonDiff);
          step++;
        } else {
          setDisplayLat(location.latitude);
          setDisplayLon(location.longitude);
          clearInterval(interval);
        }
      }, 20);

      return () => clearInterval(interval);
    }
  }, [location]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.searchContainer}>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isLoading ? "Searching..." : "Enter a location query"}
            className={styles.searchInput}
            disabled={isLoading}
          />
          <button
            type="submit"
            className={styles.searchButton}
            disabled={isLoading}
          >
            {isLoading ? "..." : "Search"}
          </button>
        </form>
      </div>
      {location && (
        <div className={styles.resultContainer}>
          <div className={styles.locationInfo}>
            <h2 className={styles.locationName}>{location.name}</h2>
            <p className={styles.coordinates}>
              Latitude:{" "}
              <span className={styles.coordinateValue}>
                {displayLat.toFixed(4)}
              </span>
            </p>
            <p className={styles.coordinates}>
              Longitude:{" "}
              <span className={styles.coordinateValue}>
                {displayLon.toFixed(4)}
              </span>
            </p>
          </div>
          <div className={styles.mapContainer}>
            <Map />
            {isLoading && (
              <div className={styles.loadingOverlay}>
                <div className={styles.loadingSpinner}></div>
                <span className={styles.thinkingText}>Alex is thinking...</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function LocationAI() {
  return (
    <LocationProvider>
      <LocationSearch />
    </LocationProvider>
  );
}
