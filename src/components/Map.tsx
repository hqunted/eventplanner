import React, { useEffect, useRef, useState } from "react";
import L, { LeafletMouseEvent, marker, Layer } from "leaflet";
import { addMarker } from "./addMarker";
import { readUrlParams } from "./readUrlParams";
import MainModal from "./MainModal";
import classNames from "classnames";
import { Marker } from "leaflet";

export const Map = () => {
  const [pickedEvents, setPickedEvents] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [markerData, setMarkerData] = useState<Marker<any> | undefined>();

  const formDataRef = useRef({
    title: "",
    description: "",
    date: "",
    time: "",
    publishClicked: false,
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
    publishClicked: boolean;
  }) => {
    console.log("Title:", data.title);
    console.log("Description:", data.description);
    console.log("Date:", data.date);
    console.log("Time:", data.time);

    formDataRef.current = data;
  };

  const customIcon = L.icon({
    iconUrl: require("../assets/icons8-marker.gif"),
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

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

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);

    const urlMarker = addMarker(
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
      let { lat, lng } = event.latlng;

      if (formDataRef.current.title === "") {
        setModalVisible(true);
      } else {
        setModalVisible(false);
      }

      let { title, description, date, time, publishClicked } =
        formDataRef.current;
      const eventString = `${title}|${description}|${time}|${date}`;
      const updatedPickedEvents = [...pickedEvents, eventString];

      setPickedEvents(updatedPickedEvents);

      if (publishClicked && !modalVisible) {
        const queryParams = new URLSearchParams({
          events: updatedPickedEvents.join(","),
          lat: String(lat),
          lng: String(lng),
        }).toString();
        const url = `${window.location.origin}${window.location.pathname}?${queryParams}`;

        const newMarker = L.marker([lat, lng], {
          icon: customIcon,
          draggable: true,
        })
          .addTo(map)

          .on("dragend", (event) => {
            const marker = event.target;
            const position = marker.getLatLng();
          })
          .bindPopup(
            `<b>Title:</b> ${title}<br><b>Description:</b> ${description}<br><br><b>Date:</b> ${date}<br><b>Time:</b> ${time}<br><b>Google Maps link:</b> <a href="${generateGoogleMapsLink(
              lat,
              lng
            )}" target="_blank" rel="noopener noreferrer">Open in Google Maps</a><br> <b>Url:</b> ${url}<br>`
          );

        if (urlTitle !== "" && urlMarker) {
          map.removeLayer(urlMarker);
        }
      }
    };

    map.on("click", onMapClick);
    return () => {
      map.on("click", onMapClick);
      map.remove();
    };
  }, []);

  return (
    <div id="map" style={{ height: "100vh" }}>
      <div
        className={classNames(
          `${modalVisible ? "visible" : "invisible"} absolute inset-0 `
        )}
        style={{ zIndex: 999 }}
      >
        <MainModal handleFormSubmit={handleFormSubmit} />
      </div>
    </div>
  );
};
