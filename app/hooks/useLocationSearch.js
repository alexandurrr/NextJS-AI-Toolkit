import { useState } from "react";

export default function useLocationSearch() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState({
    name: "Big Ben",
    latitude: 51.5007,
    longitude: -0.1246,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setLocation(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return { query, setQuery, location, handleSubmit };
}
