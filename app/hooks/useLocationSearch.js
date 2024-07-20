import { useState } from "react";

export default function useLocationSearch() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState({
    name: "Big Ben",
    latitude: 51.5007,
    longitude: -0.1246,
    imageUrl:
      "https://media.istockphoto.com/id/957174246/photo/the-big-ben-in-london-and-the-house-of-parliament.webp?s=2048x2048&w=is&k=20&c=LeWMCcCQgS9Gs7c7r1Tlo88t_Ml8KYxtDVYx7ScBjyM=",
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
