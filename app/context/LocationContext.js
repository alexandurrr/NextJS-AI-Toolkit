"use client";
import React, { createContext, useState, useContext } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({
    name: "Big Ben",
    latitude: 51.5007,
    longitude: -0.1246,
    imageUrl:
      "https://media.istockphoto.com/id/957174246/photo/the-big-ben-in-london-and-the-house-of-parliament.webp?s=2048x2048&w=is&k=20&c=LeWMCcCQgS9Gs7c7r1Tlo88t_Ml8KYxtDVYx7ScBjyM=",
  });

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
