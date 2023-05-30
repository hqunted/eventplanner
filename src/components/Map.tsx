import React, { useEffect, useRef, useState } from "react";
import L, { LeafletMouseEvent } from "leaflet";
import { addMarker } from "./addMarker";
import { readUrlParams } from "./readUrlParams";
import MainModal from "./MainModal";
import classNames from "classnames";

export const Map = () => {
  const [pickedEvents, setPickedEvents] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const formDataRef = useRef({
    title: "",
    description: "",
    date: "",
    time: "",
  });

  const latString = readUrlParams()?.lat;
  const lngString = readUrlParams()?.lng;
  const urlTitle = readUrlParams()?.title;
  const urlDescription = readUrlParams()?.description;
  const urlTime = readUrlParams()?.time;
  const urlLat = Number(latString);
  const urlLng = Number(lngString);
  const urlDate = readUrlParams()?.date;

  const generateGoogleMapsLink = (latitude: number, longitude: number) => {
    const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
    console.log(mapsLink);
    return mapsLink;
  };

  const handleFormSubmit = (data: {
    title: string;
    description: string;
    date: string;
    time: string;
  }) => {
    // Do something with the data
    console.log("Title:", data.title);
    console.log("Description:", data.description);
    console.log("Date:", data.date);
    console.log("Time:", data.time);

    // Update the formDataRef
    formDataRef.current = data;
  };

  useEffect(() => {
    const map = L.map("map").setView([0, 0], 12);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          map.setView([latitude, longitude], 12);

          L.marker([latitude, longitude], { icon: customIcon })
            .bindPopup(`YOU ARE HERE!`)
            .addTo(map);
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
      urlTime,
      urlDate
    );

    const onMapClick = (event: LeafletMouseEvent) => {
      const { lat, lng } = event.latlng;
      console.log(formDataRef.current.title === "");
      // Show the modal
      if (formDataRef.current.title === "") {
        setModalVisible(true);
      } else {
        setModalVisible(false);
      }
      const { title, description, date, time } = formDataRef.current; // Access the form data from the ref

      if (title && description && time && date) {
        const eventString = `${title}|${description}|${time}|${date}`;
        const updatedPickedEvents = [...pickedEvents, eventString];

        setPickedEvents(updatedPickedEvents);

        const queryParams = new URLSearchParams({
          events: updatedPickedEvents.join(","),
          lat: String(lat),
          lng: String(lng),
        }).toString();
        const url = `${window.location.origin}${window.location.pathname}?${queryParams}`;
        L.marker([lat, lng], { icon: customIcon })
          .bindPopup(
            `<b>Title:</b> ${title}<br><b>Description:</b> ${description}<br><br><b>Date:</b> ${date}<br><b>Time:</b> ${time}<br><b>Google Maps link:</b> <a href="${generateGoogleMapsLink(
              lat,
              lng
            )}" target="_blank" rel="noopener noreferrer">Open in Google Maps</a><br> <b>Url:</b> ${url}<br>`
          )
          .addTo(map);
      }
    };

    map.on("click", onMapClick);

    return () => {
      map.off("click", onMapClick);
      map.remove();
    };
  }, []);

  return (
    <div id="map" style={{ height: "100vh" }}>
      <div
        className={classNames(`${modalVisible ? "absolute" : ""} inset-0 `)}
        style={{ zIndex: 999 }}
      >
        <MainModal handleFormSubmit={handleFormSubmit} />
      </div>
    </div>
  );
};
