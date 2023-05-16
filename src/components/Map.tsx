import React, { useEffect, useState } from "react";
import L, { LeafletMouseEvent } from "leaflet";
import { addMarker } from "./addMarker";
import { readUrlParams } from "./readUrlParams";

export const Map = () => {
  const [pickedEvents, setPickedEvents] = useState<string[]>([]);

  const latString = readUrlParams()?.lat;
  const lngString = readUrlParams()?.lng;
  const urlTitle = readUrlParams()?.title;
  const urlDescription = readUrlParams()?.description;
  const urlTime = readUrlParams()?.time;
  const urlLat = Number(latString);
  const urlLng = Number(lngString);

  useEffect(() => {
    const map = L.map("map").setView([0, 0], 12);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          map.setView([latitude, longitude], 12);

          addMarker(latitude, longitude, map, customIcon);
        },
        (error) => {
          console.error("Error getting the user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    const customIcon = L.icon({
      iconUrl: require("../assets/icons8-marker.gif"),
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);
    addMarker(
      urlLat,
      urlLng,
      map,
      customIcon,
      urlTitle,
      urlDescription,
      urlTime
    );

    const onMapClick = (pickedLocation: LeafletMouseEvent) => {
      const { lat, lng } = pickedLocation.latlng;

      const title = prompt("Enter Title:") || "";
      const description = prompt("Enter description:") || "";
      const time = prompt("Enter time:") || "";

      if (title && description && time) {
        const event = `${title}|${description}|${time}`;
        const updatedPickedEvents = [...pickedEvents, event];

        setPickedEvents(updatedPickedEvents);
        const queryParams = new URLSearchParams({
          events: updatedPickedEvents.join(","),
          lat: String(lat),
          lng: String(lng),
        }).toString();
        const url = `${window.location.origin}${window.location.pathname}?${queryParams}`;
        window.prompt("Copy the shareable URL:", url);
      }
      addMarker(lat, lng, map, customIcon, title, description, time);
    };

    map.on("click", onMapClick);
    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: "100vh" }} />;
};
